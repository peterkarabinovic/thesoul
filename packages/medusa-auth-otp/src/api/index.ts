import { Router, json } from "express"
const cors = require('cors')
import * as z from "zod"
import { Response } from "express"
import { Logger, MedusaRequest } from "@medusajs/medusa"
import AuthOtpService from "../services/auth-otp";
import { Customer, Otp } from "../types";
import * as T from "../types";
import * as RT from "./response-types"
import { TheSoulCookie } from "./thesoul-cookie"

export default function (_:any, options: Record<string,string>): Router {

    const app = Router();
    const theSoulCookie = TheSoulCookie();

    app.use(json());
    app.use(cors({  origin: true, credentials: true  }));

    app.get("/store/otp-customer/me", async (req: MedusaRequest, res: Response) => {
        if (!req.user) {
            theSoulCookie.write(res, { cartId: req.cart_id });
            res.status(404).json({ error: new T.UserNotFound() });
            return;
        }
        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");
        const d = await authOtpService.customer(req.user.id);
        if(d.success)
            res.json({...d.data, customerId: req.user.id});
        else {
            theSoulCookie.write(res, { cartId: req.cart_id, customerId: ""});
            res.status(404).json(d);
        }
    });

    app.post("/store/otp-customer", async (req: MedusaRequest, res: Response<RT.SignUpResponse>) => {

        const customer = Customer.safeParse(req.body);
        if (!customer.success) {
            res.status(400).json({ error: T.InvalidInputError.fromZodError(customer.error) });
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");
        
        const d = await authOtpService.singUp(customer.data, req.cart_id);
        if(!d.success) {
            switch(d.error.name){
                case "userWithPhoneAlreadyExists":
                    res.status(404).json(d);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(d.error);
                    res.status(500).json(d);
                    break;
            } 
        }
        else  {
            theSoulCookie.write(res, { cartId: req.cart_id, customerId: d.data});
            res.json({customerId: d.data});
        }
    });

    app.put("/store/otp-customer", async (req: MedusaRequest, res: Response<RT.UpdateResponse>) => {
        
        const logger:Logger = req.scope.resolve<Logger>("logger");

        if(!req.user) {
            logger.error("PUT /store/otp-customer - Unauthorized");
            res.status(401).json({error: new T.UnauthorizedError()});
            return;
        }

        const customer_id = req.user.id;

        const customer = Customer.safeParse(req.body);
        if (!customer.success) {
            res.status(400).json({ error: T.InvalidInputError.fromZodError(customer.error) });
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");

        const d = await authOtpService.update(customer_id, customer.data);
        if(!d.success) {
            switch(d.error.name){
                case "userNotFound":
                case "userWithPhoneAlreadyExists":
                    res.status(404).json(d);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(d.error);
                    res.status(500).json(d);
                    break;
            } 
        }
        else  {
            res.json({customerId: d.data});
        }
    });

    app.post("/store/otp-login", async (req: MedusaRequest, res: Response<RT.LoginResponse>) => {

        const phone = Customer.pick({ phone: true }).safeParse(req.body);
        if (!phone.success){
            res.status(400).json({ error: T.InvalidInputError.fromZodError(phone.error) });
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");

        const d = await authOtpService.login(phone.data.phone);
        if(!d.success) {
            switch(d.error.name){
                case "userWithPhoneNotExists":
                    res.status(404).json(d);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(d);
                    res.status(500).json(d);
                    break;
            } 
        }
        else  {
            res.json({message: "OTP sent"});
        }
    });

    app.post("/store/otp-confirm", async (req: MedusaRequest, res: Response<RT.ConfirmOtpResponse>) => {
        const d = z.object({ code: Otp})
                    .merge(Customer.pick({ phone: true }))
                    .safeParse(req.body);
        if (!d.success){
            res.status(400).json({ error: T.InvalidInputError.fromZodError(d.error) });
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");

        const r = await authOtpService.confirmOtp(d.data.phone, d.data.code, req.cart_id);
        if("error" in r) {
            req.scope.resolve<Logger>("logger").error(JSON.stringify(r))
            switch(r.error.name){
                case "userWithPhoneNotExists":
                    res.status(404).json(r);
                    break;
                case "invalidInput":
                    res.status(400).json(r);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(r);
                    res.status(500).json(r);
                    break;
            } 
        }
        else  {
console.log("authOtpService.confirmOtp RESULT", r.data)            
            theSoulCookie.write(res, r.data);
            res.json(r.data);
        }
    });

    return app;
}


