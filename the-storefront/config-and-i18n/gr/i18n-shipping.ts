
export type TShippingConfig = typeof config;

export const config = {
    "optional": "optional",
    "shipping_options": "Shipping",
    "nv_shipping_to_warehouse": "Shipping to the warehouse of Nova Poshta",
    "nv_shipping_to_door": "Shipping Nova Poshta to the door",
    "courier_shipping": "Courier delivery",
    "city": "City",
    "input_city": "Enter the city",
    "address": "Address",
    "input_address": "Enter the address",
    "house": "House",
    "novaposhta_weahouse": "Nova Poshta warehouse",
    "comment": "Comment",
    "desirable_time": {
        "title":"Desired delivery time",
        "time_options": [
            "Morning (8:00 - 11:00)",
            "Afternoon (14:00 - 18:00)"
        ],
        "descriptionHtml": `
            <p>Delivery is carried out from 14:00 to 18:00 every day except Sunday.</p>
            <p>Orders placed before 13:30 can be delivered on the same day.</p>
        `
    }
} as const;