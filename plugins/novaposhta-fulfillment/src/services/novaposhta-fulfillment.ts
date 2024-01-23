import { Lifetime } from "awilix"
import { AbstractFulfillmentService, Cart, Fulfillment, LineItem, Order, Logger } from "@medusajs/medusa"
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import { NpApi, NpApiStub } from "../np-api"


class NovaposhtaFulfillmentService extends AbstractFulfillmentService {
    static LIFE_TIME = Lifetime.SINGLETON;
    static identifier = "novaposhta-fulfillment"

    logger: Logger;
    apiKey: string;
    npApi = NpApiStub;

    constructor(container: any, options: Record<string, string>) {
        super(container);
        this.logger = container.logger;
        this.apiKey = options.apiKey;
        NpApi(this.apiKey, this.logger).then( api => this.npApi = api);
    }

    async getFulfillmentOptions(): Promise<any[]> {
        return [
            { id: "shipping-to-warehouse", name: "Shipping to Warehouse" },
            { id: "shipping-to-door", name: "Shipping to Door" },
        ] 
    }
    async validateFulfillmentData(option: Record<string, unknown>, data: Record<string, unknown>, cart: Cart): Promise<Record<string, unknown>> {
        if(option.id === "shipping-to-warehouse"){
            if(!data.cityRef || data.warehouseRef === undefined){
                throw new Error("CityRef and warehouseRef are required");
            }
        }
        else if(option.id === "shipping-to-door"){
            if(!data.cityRef || !data.streetRef || !data.buildingNumber){
                throw new Error("CityRef, streetRef and buildingNumber are required");
            }
        }
        return { ...option, ...data }; 
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


    async retrieveCities(q: string, limit: number): Promise<any> {

    }
}

export default NovaposhtaFulfillmentService;