import * as path from "node:path"
import {
    MiddlewaresConfig, 
    CustomerService, 
    MedusaNextFunction,
    MedusaRequest,
    MedusaResponse,
    Logger,
} from "@medusajs/medusa"

import { TheSoulCookie } from "./thesoul-cookie";

const theSoulCookie = TheSoulCookie();
declare module "@medusajs/medusa" {
    interface MedusaRequest {
        cart_id?: string
    }
}

const authCookie = (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    const thesoul = theSoulCookie.read(req);
    req.cart_id = thesoul?.cartId;
    if (thesoul.customerId) {
        const looger = req.scope.resolve<Logger>("logger");
        const customerService = req.scope.resolve<CustomerService>("customerService");

        customerService.retrieve(thesoul.customerId)
            .then( customer => { req.user = { ...customer, customer_id: thesoul?.customerId } as any })
            .catch((error) => looger.error(error))
            .finally(() => next())
    }
    else
        next();
}

const cartCreationCookie = (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    if(req.method == "POST"){
        const originalJson = res.json;
        res.json = (body) => {
            theSoulCookie.write(res, { cartId: body?.cart?.id, customerId: req.user?.customer_id });
            return originalJson.call(res, body);
        }       
    }
    next();
}

export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: "/store/*",
            middlewares: [authCookie],
        },
        {
            matcher: "/store/carts",
            middlewares: [cartCreationCookie]
        }
    ],
}