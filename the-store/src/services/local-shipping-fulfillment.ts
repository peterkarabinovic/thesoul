import { Lifetime } from "awilix"
import { AbstractFulfillmentService, Cart, Fulfillment, LineItem, Order } from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";


class LocalShippingFulfillmentService extends AbstractFulfillmentService {

    static LIFE_TIME = Lifetime.SINGLETON;
    static identifier = "local-fulfillment"


    async getFulfillmentOptions(): Promise<any[]> {
        return [
            { id: "сourier-delivery", name: "Courier delivery" },
        ]
    }
    
    async validateFulfillmentData(option: Record<string, unknown>, data: Record<string, unknown>, cart: Cart): Promise<Record<string, unknown>> {
        if(option.id !== "сourier-delivery") {
            throw new Error("Unknown shipping option")
        }
        return { ...option, ...data }; 
    }

    async validateOption(data: Record<string, unknown>): Promise<boolean> {
        return this.getFulfillmentOptions()
            .then( options => !!options.find( op => op.id === data.id) )
    }

    async canCalculate(data: Record<string, unknown>): Promise<boolean> {
        return false;
    }

    calculatePrice(optionData: { [x: string]: unknown; }, data: { [x: string]: unknown; }, cart: Cart): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async createFulfillment(data: { [x: string]: unknown; }, items: LineItem[], order: Order, fulfillment: Fulfillment): Promise<{ [x: string]: unknown; }> {
        return {};
    }

    async cancelFulfillment(fulfillment: { [x: string]: unknown; }): Promise<any> {
        return {};
    }

    createReturn(returnOrder: CreateReturnType): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    getFulfillmentDocuments(data: { [x: string]: unknown; }): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getReturnDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    retrieveDocuments(fulfillmentData: Record<string, unknown>, documentType: "invoice" | "label"): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}

export default LocalShippingFulfillmentService;
