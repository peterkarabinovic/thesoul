import { AbstractFulfillmentService, Cart, Fulfillment, LineItem, Order, Logger, MedusaContainer } from "@medusajs/medusa"
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";


class NovaposhtaFulfillmentService extends AbstractFulfillmentService {

    static identifier = "novaposhta-fulfillment"

    logger: Logger;
    apiKey: string;

    constructor(container: any, options: Record<string, string>) {
        super(container);
        this.logger = container.logger;
        this.apiKey = options.apiKey;
    }

    async getFulfillmentOptions(): Promise<any[]> {
        return [
            { id: "shipping-to-warehouse", name: "Shipping to Warehouse" },
            { id: "shipping-to-door", name: "Shipping to Door" },
        ] 
    }
    validateFulfillmentData(optionData: Record<string, unknown>, data: Record<string, unknown>, cart: Cart): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented validateFulfillmentData: " + JSON.stringify({optionData, data, cart}));
    }
    
    async validateOption(data: Record<string, unknown>): Promise<boolean> {
        return this.getFulfillmentOptions()
            .then( options => !!options.find( op => op.id === data.id) )
    }
    
    async canCalculate(data: Record<string, unknown>): Promise<boolean> {
        return true
    }

    async calculatePrice(optionData: Record<string, unknown>, data: Record<string, unknown>, cart: Cart): Promise<number> {
        return 432;
    }

    createFulfillment(data: Record<string, unknown>, items: LineItem[], order: Order, fulfillment: Fulfillment): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented. createFulfillment");
    }
    
    async cancelFulfillment(fulfillment: Record<string, unknown>): Promise<any> {
        return {};
    }

    createReturn(returnOrder: CreateReturnType): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented. createReturn");
    }
    getFulfillmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented. getFulfillmentDocuments");
    }
    getReturnDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented. getReturnDocuments");
    }
    getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented. getShipmentDocuments");
    }
    retrieveDocuments(fulfillmentData: Record<string, unknown>, documentType: "invoice" | "label"): Promise<any> {
        throw new Error("Method not implemented. retrieveDocuments");
    }

}

export default NovaposhtaFulfillmentService;