import { Router } from "express"
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import NovaposhtaFulfillmentService from "../services/novaposhta-fulfillment";

export default function (): Router {
    const app = Router();

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
        const { cityRef, warehouseId } = req.query;
        const _warehouseId = parseInt(decodeURIComponent(String(warehouseId || ""))) || 0;
        novaPoshtaService.npApi.warehouses(String(cityRef), _warehouseId)
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