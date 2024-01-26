import { Result } from 'commons';
import { RequestError, medusaRequest } from 'commons/medusa-request';
import * as RT from "auth-otp-types"
import * as T from "./type"

export async function me(): Promise<Result<RT.MeResponse, RequestError>> {

    return await medusaRequest({
        method: 'GET',
        path: '/otp-customer/me'
    })
}

export async function singUp(cus: T.TCustomer): Promise<Result<RT.SignUpResponse, RequestError>> {

    return await medusaRequest<RT.SignUpResponse>({
        method: 'POST',
        path: '/otp-customer',
        payload: cus
    })
}


export async function update(cus: T.TCustomer): Promise<Result<{ customerId: string }, RequestError>> {

    return await medusaRequest<{ customerId: string }>({
        method: 'PUT',
        path: `/otp-customer`,
        payload: cus
    })
}

