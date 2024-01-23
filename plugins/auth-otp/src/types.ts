import * as z from "zod";


export const Customer = z.object({
    fullName: z.string().min(2, "lengthMin2"),
    phone: z.string()
        .min(12, "invalidPhone")
        .max(14, "invalidPhone")
        .startsWith("+380", "onlyUA"),  // +380XXXXXXXXX 
    telegram: z.string().startsWith("@", "mustStartWith@").optional(),
});

export type Customer = z.infer<typeof Customer>;

export type CustomerId = string;

export const Otp = z.string().refine( v => /\d{4,}/.test(v), "wrongOtp");
export type Otp = z.infer<typeof Otp>;


export type Result<T,Error> = 
    | { value: T }
    | { error: Error };

// ##################################################################
//
//  Errors
//
// ##################################################################
export class InvalidInputError extends Error {
    readonly _tag = "invalidInput";
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
    readonly _tag = "userWithPhoneAlreadyExists";
    readonly phone: string;
    constructor(phone: string) {
        super("User with this phone already exists");
        this.phone = phone;
    }
}

export class UnknownError extends Error {
    readonly _tag = "unknownError";
    constructor(er: Error) {
        super(er.message);
        this.stack = er.stack;
    }
}

export class UserWithPhoneNotExists extends Error {
    readonly _tag = "userWithPhoneNotExists";
    readonly phone: string;
    constructor(phone: string) {
        super("User with this phone not exists");
        this.phone = phone;
    }
}

export class WaitShortPeriodBeforeNextLogin extends Error {
    readonly _tag = "waitShortPeriodBeforeNextLogin";
}

export class WaitLongPeriodBeforeNextLogin extends Error {
    readonly _tag = "waitLongPeriodBeforeNextLogin";
}

export class WrongOtp extends Error {
    readonly _tag = "wrongOtp";
}

