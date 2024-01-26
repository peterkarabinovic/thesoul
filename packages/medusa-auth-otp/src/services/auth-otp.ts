import crypto from "node:crypto";
import { Logger, TransactionBaseService, generateEntityId } from "@medusajs/medusa";
import { Result } from "commons"
import SendOtpService from "./send-otp";
import * as T from "../types";


const SHORT_PERIOD = 1000 * 60 * 5; // 5 minutes
const LONG_PERIOD = 1000 * 60 * 60; // 1 hours

class AuthOtpService extends TransactionBaseService {

    sendOtpService: SendOtpService;
    logger: Logger;

    constructor({logger, sendOtpService}:any, options: Record<string, unknown>) {
        super(arguments[0]);
        this.sendOtpService = sendOtpService;
        this.logger = logger;
    }

    async customer(customerId: T.CustomerId): Promise<Result<T.Customer, T.UserNotFound | T.UnknownError>> {

        return await this.atomicPhase_(async manager => {
            return manager.query(`
                SELECT id, first_name, last_name, phone, telegram
                FROM customer 
                WHERE id = $1
            `, [customerId])
                .then(res => {
                    const rows = res || [];
                    if (rows.length === 0)
                        return Result.failure(new T.UserNotFound() );
                    else
                        return Result.of(rows[0]);
                })
                .catch(e => {
                    return Result.failure(new T.UnknownError(e) );
                });
        });
    }

    // SingUp customer
    async singUp(customer: T.Customer): Promise<Result<T.CustomerId, T.SignUpErrors>> {

        this.logger.info("Customer singup... :" + JSON.stringify(customer));

        return await this.atomicPhase_(async manager => {
            const { firstName, lastName, phone, telegram } = customer;
            return manager.query(`
                INSERT INTO customer (id, first_name, last_name, email, phone, telegram, has_account)
                VALUES ($1, $2, $3, $4, $5, true)
                RETURNING "id"
            `, [generateEntityId(undefined, "cus"), firstName, lastName, phone, phone, telegram])
                .then(res => {
                    const rows = res || [];
                    return Result.of( rows[0]?.id as T.CustomerId );
                })
                .catch(e => {
                    if (e.code === "23505" && e.constraint === "UQ_unique_email_for_guests_and_customer_accounts")
                        return Result.failure(new T.UserWithPhoneAlreadyExists(phone));
                    else
                        return Result.failure(new T.UnknownError(e));
                });
        });
    }

    async update(customerId: T.CustomerId, customer: T.Customer): Promise<Result<T.CustomerId, T.UpdateErrors>> {
        this.logger.info("Customer update... :" + JSON.stringify(customer));
        return await this.atomicPhase_(async manager => {
            const { firstName, lastName, phone, telegram } = customer;
            return manager.query(`
                UPDATE customer
                SET first_name = $1, last_name = $2, email = $3, phone = $4, telegram = $5
                WHERE id = $6
            `, [firstName, lastName, phone, phone, telegram, customerId])
                .then(res => {
                    const rows = res || [];
                    return rows.length > 0 
                        ? Result.of(customerId) 
                        : Result.failure(new T.UserNotFound() );
                })
                .catch(e => {
                    if (e.code === "23505" && e.constraint === "UQ_unique_email_for_guests_and_customer_accounts")
                        return Result.failure(new T.UserWithPhoneAlreadyExists(phone));
                    else
                        return Result.failure(new T.UnknownError(e));
                });
        });
    }

    // SingIn customer
    async login(phone: string): Promise<Result<T.Otp, T.LoginErrors>> {

        // Check if customer exists
        const otp_data = await this.atomicPhase_(async manager => {
            return manager.query(`
                SELECT (otp_data).*
                FROM customer 
                WHERE phone = $1
            `, [phone])
                .then(res => {
                    const rows = res || [];
                    if (rows.length === 0)
                        return Result.failure(new T.UserWithPhoneNotExists(phone));
                    else
                        return Result.of(rows[0] );
                })
                .catch(e => {
                    return Result.failure(new T.UnknownError(e));
                });
        });

        if ("error" in otp_data)
            return otp_data;

        // Check if attempts are not exceeded
        const newIndex = checkAttempts(otp_data.data);
        if ("error" in newIndex)
            return newIndex;

        const indx = newIndex.data;
        const newCode = crypto.randomInt(1000, 10000).toString();
        const attemp_timestamp = new Date();
        const code_1 = indx === 1 ? newCode : otp_data.data.code_1;
        const code_2 = indx === 2 ? newCode : indx === 1 ? null : otp_data.data.code_2;
        const code_3 = indx === 3 ? newCode : null;

        // Update customer
        return await this.atomicPhase_(async manager => {

            const r = await manager.query(`
                UPDATE customer
                SET otp_data = ROW($1, $2, $3, $4)
                WHERE phone = $5
                RETURNING id
            `, [attemp_timestamp, code_1, code_2, code_3, phone])
                .then(res => {
                    const rows = res || [];
                    return Result.of(rows[0]?.id as T.CustomerId );
                })
                .catch(e => {
                    return Result.failure(new T.UnknownError(e));
                });

            if (!r.success)
                return r;

            return await this.sendOtpService.sendOtp({ phone, code: newCode })
                .then(() => Result.of(newCode))
                .catch((er) => {
                    manager.queryRunner?.rollbackTransaction();
                    return Result.failure( new T.UnknownError(er) );
                });
        });
    }

    // Check otp
    async checkOtp({phone, code}: {phone: string, code: string}): Promise<Result<T.CustomerId, T.CheckOtpErrors>> {

        this.logger.info("Customer singup... :" + JSON.stringify({phone, code}));
        // Check if customer exists
        const otp_data = await this.atomicPhase_(async manager => {
            return manager.query(`
                SELECT id, (otp_data).* FROM customer WHERE phone = $1
            `, [phone])
                .then(res => {
                    const rows = res || [];
                    if (rows.length === 0)
                        return Result.failure( new T.UserWithPhoneNotExists(phone) );
                    else
                        return Result.of(rows[0] );
                })
                .catch(e => {
                    return Result.failure( new T.UnknownError(e) );
                });
        });

        if (!otp_data.success)
            return otp_data;

        this.logger.debug("checkOtp: " + JSON.stringify(otp_data.data));

        // Check if attempts are not exceeded
        const { id, attemp_timestamp, code_1, code_2, code_3 } = otp_data.data;

        if (!attemp_timestamp)
            return Result.failure( new T.InvalidInputError({ code: "wrongOtp"}) );

        if (![code_1, code_2, code_3].includes(code))
            return Result.failure( new T.InvalidInputError({ code: "wrongOtp"}) );

        const diff = Date.now() - attemp_timestamp.getTime();
        if (diff > SHORT_PERIOD)
            return Result.failure( new T.InvalidInputError({ code: "wrongOtp"}) );

        // Update customer
        return Result.of(id);
    }
}

function checkAttempts(
    { attemp_timestamp,
        code_1,
        code_2,
        code_3
    }: { attemp_timestamp: Date, code_1: string, code_2: string, code_3: string }
): Result<1 | 2 | 3, T.WaitShortPeriodBeforeNextLogin | T.WaitLongPeriodBeforeNextLogin> {

    const indexOfNotNull = [code_1, code_2, code_3].findIndex(code => code !== null);
    if (indexOfNotNull < 0)
        return Result.of(1);

    const now = Date.now();
    const diff = now - attemp_timestamp.getTime();
    if (diff < SHORT_PERIOD && indexOfNotNull < 2)
        return Result.failure( new T.WaitShortPeriodBeforeNextLogin() );
    if (diff < LONG_PERIOD && indexOfNotNull === 2)
        return Result.failure( new T.WaitLongPeriodBeforeNextLogin() );
    return Result.of( ((indexOfNotNull + 1) % 3 + 1) as 1 | 2 | 3 );
}

export default AuthOtpService;