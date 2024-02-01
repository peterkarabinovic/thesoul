import * as T from "../types"

export type MeResponse = {
    customerId: string
    firstName: string
    lastName: string
    phone: string
    telegram: string | undefined,
} | { error: T.UserNotFound | T.UnknownError }

export type SignUpResponse = 
    | { customerId: string }
    | { error: T.SignUpErrors | T.InvalidInputError }

export type UpdateResponse =
    | { customerId: string }
    | { error: T.UpdateErrors | T.InvalidInputError | T.UnauthorizedError }
    
export type LoginResponse =
    | { message: "OTP sent" }
    | { error: T.LoginErrors | T.InvalidInputError }

export type ConfirmOtpResponse =
    | { customerId: string }
    | { error: T.ConfirmOtpErrors | T.InvalidInputError }