import { Logger, TransactionBaseService } from "@medusajs/medusa";

type TSendOtp = {
    phone: string;
    code: string;
};

class SendOtpService extends TransactionBaseService {
    
    readonly options: Record<string, unknown>;
    readonly logger: Logger;

    constructor({logger}:any, options: Record<string, unknown>) {
        super(arguments[0]);
        this.logger = logger;
        this.options  = options;
    }

    async sendOtp({ phone, code }:TSendOtp): Promise<true> {

        this.logger.info("sendOtp: " + JSON.stringify({phone, code}));
        
        // TODO: send otp to phone        

        return true;
    }
};

export default SendOtpService;