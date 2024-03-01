

export type City = { name: string, id: string }
export type CityResponse = 
    | { cities: City[] }
    | { error: string }


export type Warehouse = { name: string, id: string };
export type WarehouseResponse = 
    | { warehouses: Warehouse[] }
    | { error: string }


export type Street = { name: string, id: string };
export type StreetResponse = 
    | { streets: Street[] }
    | { error: string }
