import { EntityManager } from "typeorm"
import {
    ProductService,
    ScheduledJobArgs,
    ScheduledJobConfig,
} from "@medusajs/medusa";

export default async function cleanupOrphanCarts({ container }: ScheduledJobArgs) {
    const manager: EntityManager = container.resolve("manager");
    const logger = container.resolve("logger")

    manager.query(`
        WITH cartsToDelete AS (
            SELECT id, shipping_address_id
            FROM cart
            WHERE updated_at < NOW() - '12 hours'::interval
            AND customer_id IS NULL
        ),
        lineDeleting AS (
            DELETE FROM line_item
            WHERE cart_id IN (SELECT id FROM cartsToDelete)
        ),
        shippingAddressDeleting AS (
            DELETE FROM address
            WHERE id IN (SELECT shipping_address_id FROM cartsToDelete)  
        ) 
        DELETE FROM cart
        WHERE id IN (SELECT id FROM cartsToDelete)
        RETURNING id    
    `)
    .then((res) => {
        const rows = res.raw?.rows || [];
        const rowCount = res.raw?.rowCount || 0;
        if(rowCount > 0)
            logger.info(`cleanupOrphanCarts: deleted ${rowCount} orphaned carts: (${ rows.map((r) => r.id).join(",") }).`);
    })
    .catch((e) => {
        logger.error("cleanupOrphanCarts: ", e);
    });
}

export const config: ScheduledJobConfig = {
    name: "cleanup-orphan-carts",
    schedule: "0 0 * * *", // Every day at midnight
};