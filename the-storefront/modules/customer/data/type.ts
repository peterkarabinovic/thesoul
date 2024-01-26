
export type TCustomer = {
    firstName: string
    lastName: string
    phone: string
    telegram: string | undefined,
}

export type TCustomerErrors = Partial<{
    [key in keyof TCustomer]: string
}>