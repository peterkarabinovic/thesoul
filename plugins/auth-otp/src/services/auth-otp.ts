import crypto from "node:crypto";
import { Logger, TransactionBaseService, generateEntityId } from "@medusajs/medusa";
import SendOtpService from "./send-otp";
import * as T from "../types";


type CreationErrors =
    | T.UserWithPhoneAlreadyExists
    | T.UnknownError;

type LoginErrors =
    | T.UserWithPhoneNotExists
    | T.WaitShortPeriodBeforeNextLogin
    | T.WaitLongPeriodBeforeNextLogin
    | T.UnknownError;

type CheckOtpErrors =
    | T.WrongOtp
    | T.UserWithPhoneNotExists
    | T.UnknownError;

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

    // SingUp customer
    async create(customer: T.Customer): Promise<T.Result<T.CustomerId, CreationErrors>> {

        this.logger.info("Customer singup... :" + JSON.stringify(customer));

        return await this.atomicPhase_(async manager => {
            const { fullName, phone, telegram } = customer;
            return manager.query(`
                INSERT INTO customer (id, first_name, email, phone, telegram, has_account)
                VALUES ($1, $2, $3, $4, $5, true)
                RETURNING "id"
            `, [generateEntityId(undefined, "cus"), fullName, phone, phone, telegram])
                .then(res => {
                    const rows = res || [];
                    return { value: rows[0]?.id as T.CustomerId };
                })
                .catch(e => {
                    if (e.code === "23505" && e.constraint === "UQ_unique_email_for_guests_and_customer_accounts")
                        return { error: new T.UserWithPhoneAlreadyExists(phone) };
                    else
                        return { error: new T.UnknownError(e) };
                });
        });
    }

    // SingIn customer
    async login(phone: string): Promise<T.Result<T.Otp, LoginErrors>> {

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
                        return { error: new T.UserWithPhoneNotExists(phone) };
                    else
                        return { value: rows[0] };
                })
                .catch(e => {
                    return { error: new T.UnknownError(e) } as T.Result<any, LoginErrors>;
                });
        });

        if ("error" in otp_data)
            return otp_data;

        // Check if attempts are not exceeded
        const newIndex = checkAttempts(otp_data.value);
        if ("error" in newIndex)
            return newIndex;

        const indx = newIndex.value;
        const newCode = crypto.randomInt(1000, 10000).toString();
        const attemp_timestamp = new Date();
        const code_1 = indx === 1 ? newCode : otp_data.value.code_1;
        const code_2 = indx === 2 ? newCode : indx === 1 ? null : otp_data.value.code_2;
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
                    return { value: rows[0]?.id as T.CustomerId };
                })
                .catch(e => {
                    return { error: new T.UnknownError(e) } as T.Result<any, LoginErrors>;
                });

            if ("error" in r)
                return r;

            return await this.sendOtpService.sendOtp({ phone, code: newCode })
                .then(() => ({ value: newCode }))
                .catch((er) => {
                    manager.queryRunner?.rollbackTransaction();
                    return { error: new T.UnknownError(er) } as T.Result<any, LoginErrors>;
                });
        });
    }

    // Check otp
    async checkOtp({phone, code}: {phone: string, code: string}): Promise<T.Result<T.CustomerId, CheckOtpErrors>> {

        this.logger.info("Customer singup... :" + JSON.stringify({phone, code}));
        // Check if customer exists
        const otp_data = await this.atomicPhase_(async manager => {
            return manager.query(`
                SELECT id, (otp_data).* FROM customer WHERE phone = $1
            `, [phone])
                .then(res => {
                    const rows = res || [];
                    if (rows.length === 0)
                        return { error: new T.UserWithPhoneNotExists(phone) };
                    else
                        return { value: rows[0] };
                })
                .catch(e => {
                    return { error: new T.UnknownError(e) } as T.Result<any, CheckOtpErrors>;
                });
        });

        if ("error" in otp_data)
            return otp_data;

        this.logger.debug("checkOtp: " + JSON.stringify(otp_data.value));

        // Check if attempts are not exceeded
        const { id, attemp_timestamp, code_1, code_2, code_3 } = otp_data.value;

        if (!attemp_timestamp)
            return { error: new T.WrongOtp() };

        if (![code_1, code_2, code_3].includes(code))
            return { error: new T.WrongOtp() };

        const diff = Date.now() - attemp_timestamp.getTime();
        if (diff > SHORT_PERIOD)
            return { error: new T.WrongOtp() };

        // Update customer
        return { value: id as T.CustomerId };
    }
}

function checkAttempts(
    { attemp_timestamp,
        code_1,
        code_2,
        code_3
    }: { attemp_timestamp: Date, code_1: string, code_2: string, code_3: string }
): T.Result<1 | 2 | 3, T.WaitShortPeriodBeforeNextLogin | T.WaitLongPeriodBeforeNextLogin> {

    const indexOfNotNull = [code_1, code_2, code_3].findIndex(code => code !== null);
    if (indexOfNotNull < 0)
        return { value: 1 };

    const now = Date.now();
    const diff = now - attemp_timestamp.getTime();
    if (diff < SHORT_PERIOD && indexOfNotNull < 2)
        return { error: new T.WaitShortPeriodBeforeNextLogin() };
    if (diff < LONG_PERIOD && indexOfNotNull === 2)
        return { error: new T.WaitLongPeriodBeforeNextLogin() };
    return { value: ((indexOfNotNull + 1) % 3 + 1) as 1 | 2 | 3 };
}

export default AuthOtpService;