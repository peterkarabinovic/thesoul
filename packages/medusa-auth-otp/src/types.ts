import * as z from "zod";
import { i18n_length_min_1, i18n_invalid_phone, i18n_invalid_username_telegram, i18n_invalid_otp } from "commons/src/i18n";

// ##################################################################
//
// Domain types
//
// ##################################################################
export const Customer = z.object({
    firstName: z.string().min(1, i18n_length_min_1),
    lastName: z.string().min(1, i18n_length_min_1),
    phone: z.string()
        .min(12, i18n_invalid_phone)
        .max(14, i18n_invalid_phone)
        .startsWith("+380", i18n_invalid_phone),  // +380XXXXXXXXX 
    telegram: z.string().startsWith("@", i18n_invalid_username_telegram).optional(),
});

export type Customer = z.infer<typeof Customer>;
export type CustomerId = string;
export const Otp = z.string().refine( v => /\d{4,}/.test(v), i18n_invalid_otp);
export type Otp = z.infer<typeof Otp>;

// ##################################################################
//
// Service Error types
//
// ##################################################################

export type SignUpErrors =
    | UserWithPhoneAlreadyExists
    | UnknownError;

export type UpdateErrors =
    | UserNotFound
    | UserWithPhoneAlreadyExists
    | UnknownError;

export type LoginErrors =
    | UserWithPhoneNotExists
    | WaitShortPeriodBeforeNextLogin
    | WaitLongPeriodBeforeNextLogin
    | UnknownError;

export type CheckOtpErrors =
    | InvalidInputError
    | UserWithPhoneNotExists
    | UnknownError;


// ##################################################################
//
//  Error types
//
// ##################################################################
export class InvalidInputError extends Error {
    readonly name = "invalidInput";
    readonly fieldErrors: Record<string, string>;

    constructor(fieldErrors: Record<string, string>) {
        super();
        this.fieldErrors = fieldErrors;
    }
    
    static fromZodError(error: z.ZodError) {
        const fe = error.formErrors.fieldErrors;
        const fieldErrors = Object.keys(fe).reduce((acc, key) => {
            acc[key] = String(fe[key]?.[0]);
            return acc;
        }, {} as Record<string, string>);
        return new InvalidInputError(fieldErrors);
    }
}

export class UserWithPhoneAlreadyExists extends Error {
    readonly name = "userWithPhoneAlreadyExists";
    readonly phone: string;
    constructor(phone: string) {
        super("User with this phone already exists");
        this.phone = phone;
    }
}

export class UserNotFound extends Error {
    readonly name = "userNotFound";
}

export class UnknownError extends Error {
    readonly name = "unknownError";
    constructor(er: Error) {
        super(er.message);
        this.stack = er.stack;
    }
}

export class UserWithPhoneNotExists extends Error {
    readonly name = "userWithPhoneNotExists";
    readonly phone: string;
    constructor(phone: string) {
        super("User with this phone not exists");
        this.phone = phone;
    }
}

export class WaitShortPeriodBeforeNextLogin extends Error {
    readonly name = "waitShortPeriodBeforeNextLogin";
}

export class WaitLongPeriodBeforeNextLogin extends Error {
    readonly name = "waitLongPeriodBeforeNextLogin";
}

export class UnauthorizedError extends Error {
    readonly name = "unauthorizedError";
}


