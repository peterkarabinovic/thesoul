import crypto from "node:crypto";

const secret = "kino-i-nimci";
const val = "private:buffet";

const kk = val + ":" + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');


    console.log({kk});