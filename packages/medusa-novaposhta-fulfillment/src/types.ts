

export type City = {
    name: string,
    id: string
}

export type CityResponse = 
    | { cities: City[] }
    | { error: string }


    