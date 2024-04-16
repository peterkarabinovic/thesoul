import { Client, fetchExchange } from "urql/core" 

export const graphql = new Client({
    url: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_API || "http://localhost:3003/graphql",
    exchanges: [fetchExchange],
    fetchOptions: {
        cache: 'no-store',
        headers: {
            "authorization": "manager",
            
        }
    }
});




