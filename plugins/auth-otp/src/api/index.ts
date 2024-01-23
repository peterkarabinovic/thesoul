import { Router, json } from "express"
import * as z from "zod"
import { Logger, MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import AuthOtpService from "../services/auth-otp";
import * as T from "../types";

export default function (_:any, options: Record<string,string>): Router {

    const app = Router();

    app.use(json());

    app.post("/store/otp-customer", async (req: MedusaRequest, res: MedusaResponse) => {

        const customer = T.Customer.safeParse(req.body);
        if (!customer.success) {
            res.status(400).json(T.InvalidInputError.fromZodError(customer.error));
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");
        
        const d = await authOtpService.create(req.body);
        if("error" in d) {
            switch(d.error._tag){
                case "userWithPhoneAlreadyExists":
                    res.status(404).json(d.error);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(d.error);
                    res.status(500).json({ error: "Internal server error" });
                    break;
            } 
        }
        else  {
            res.json({customerId: d.value});
        }
    });

    app.post("/store/otp-login", async (req: MedusaRequest, res: MedusaResponse) => {

        const phone = T.Customer.pick({ phone: true }).safeParse(req.body);
        if (!phone.success){
            res.status(400).json(T.InvalidInputError.fromZodError(phone.error));
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");

        const d = await authOtpService.login(phone.data.phone);
        if("error" in d) {
            switch(d.error._tag){
                case "userWithPhoneNotExists":
                    res.status(404).json(d.error);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(d.error);
                    res.status(500).json({ error: "Internal server error" });
                    break;
            } 
        }
        else  {
            res.json({message: "OTP sent"});
        }
    });

    app.post("/store/otp-verify", async (req: MedusaRequest, res: MedusaResponse) => {
        const d = z.object({ code: T.Otp})
                    .merge(T.Customer.pick({ phone: true }))
                    .safeParse(req.body);
        if (!d.success){
            res.status(400).json(T.InvalidInputError.fromZodError(d.error));
            return;
        }

        const authOtpService = req.scope.resolve<AuthOtpService>("authOtpService");

        const r = await authOtpService.checkOtp(d.data);
        if("error" in r) {
            switch(r.error._tag){
                case "userWithPhoneNotExists":
                    res.status(404).json(r.error);
                    break;
                case "wrongOtp":
                    res.status(400).json(r.error);
                    break;
                case "unknownError":
                    req.scope.resolve<Logger>("logger").error(r.error);
                    res.status(500).json({ error: "Internal server error" });
                    break;
            } 
        }
        else  {
            res.cookie("thesoul", r.value, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 days
            res.json({cId: r.value});
        }
    });

    return app;
}


