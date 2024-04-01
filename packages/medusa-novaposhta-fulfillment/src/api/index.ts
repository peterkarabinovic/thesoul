import { Router } from "express"
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import NovaposhtaFulfillmentService from "../services/novaposhta-fulfillment";

const cors = require('cors')

export default function (): Router {
    const app = Router();

    app.use(cors({  origin: true, credentials: true  }));

    app.get("/store/np/cities", async (req: MedusaRequest, res: MedusaResponse) => {

        const novaPoshtaService: NovaposhtaFulfillmentService = req.scope.resolve('novaposhtaFulfillmentService');
        const { q } = req.query;
        const _q = decodeURIComponent(String(q || ""));
        novaPoshtaService.npApi.cities(_q, 50)
            .then(d => res.json(d))
            .catch(_ => res.status(500).json({ error: "Сервер Нової Пошти наразі недоступний." }));
    });

    app.get("/store/np/warehouses", async (req: MedusaRequest, res: MedusaResponse) => {
        const novaPoshtaService: NovaposhtaFulfillmentService = req.scope.resolve('novaposhtaFulfillmentService');
        const { cityRef, q } = req.query;
        const _q = decodeURIComponent(String(q || ""));
        novaPoshtaService.npApi.warehouses(String(cityRef), _q)
            .then(d => res.json(d))
            .catch(_ => res.status(500).json({ error: "Сервер Нової Пошти наразі недоступний." }));
    });

    app.get("/store/np/streets", async (req: MedusaRequest, res: MedusaResponse) => {
        const novaPoshtaService: NovaposhtaFulfillmentService = req.scope.resolve('novaposhtaFulfillmentService');
        const { cityRef, street } = req.query;
        const _street = decodeURIComponent(String(street || ""));
        novaPoshtaService.npApi.streets(String(cityRef), _street)
            .then(d => res.json(d))
            .catch(_ => res.status(500).json({ error: "Сервер Нової Пошти наразі недоступний." }));
    });

    return app;
}