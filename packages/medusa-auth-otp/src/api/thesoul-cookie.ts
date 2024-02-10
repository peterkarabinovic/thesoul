

import crypto from "node:crypto";
import { MedusaResponse, MedusaRequest } from "@medusajs/medusa";
import { getConfigFile } from "medusa-core-utils"

export function TheSoulCookie() {
    const { configModule: { projectConfig: { cookie_secret = "45 baba яготка опять" } } } = getConfigFile<any>(process.cwd(), "medusa-config")

    return {
        read: (req: MedusaRequest): { customerId?: string, cartId?: string } => {
            const cookie = req.cookies.thesoul;
            if (!cookie)
                return {};
            const [customerId, cartId, signature] = cookie.split(":");
            const hash = crypto
                .createHmac('sha256', cookie_secret)
                .update(`${customerId}:${cartId}`)
                .digest('base64')
                .replace(/\=+$/, '');
            if (signature !== hash)
                return {};
            return { customerId, cartId }
        },

        write: (res: MedusaResponse, { cartId = "", customerId = "" }) => {
            if (cartId || customerId) {
                const signature = crypto
                    .createHmac('sha256', cookie_secret)
                    .update(`${customerId}:${cartId}`)
                    .digest('base64')
                    .replace(/\=+$/, '');
                const cookie = `${customerId}:${cartId}:${signature}`;
                res.cookie("thesoul", cookie, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 days
            }
            else {
                res.clearCookie("thesoul");
            }
        }
    }
}