import {
    MiddlewaresConfig, 
    CustomerService, 
    MedusaNextFunction,
    MedusaRequest,
    MedusaResponse,
    Logger,
} from "@medusajs/medusa"

const authOtpCookie = (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    const customer_id = req.signedCookies.thesoul;
    if (customer_id) {
        const looger = req.scope.resolve<Logger>("logger");
        const customerService = req.scope.resolve<CustomerService>("customerService");

        customerService.retrieve(customer_id)
            .then((customer) => { req.user = customer })
            .catch((error) => looger.error(error))
            .finally(() => next())
    }
    else
        next();
}

export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: "/store/*",
            middlewares: [authOtpCookie],
        },
    ],
}