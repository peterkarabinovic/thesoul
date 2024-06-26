import { Result } from 'commons';

const ENDPOINT = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_API ?? 'http://localhost:9000';
const INTERNAL_ENDPOINT = process.env.NEXT_INTERNAL_MEDUSA_BACKEND_API ?? 'http://localhost:9000';

export type RequestError = {
    status: number;
    message: string;
};

type MedusaRequestParams = {
    method: string;
    path: string;
    payload?: Record<string, unknown> | undefined;
    serverSide?: boolean
    revalidateSec?: number,
    tags?: string[]
};

export async function medusaRequest<R>({ serverSide = true, ...params}: MedusaRequestParams): Promise<Result<R, RequestError>> {

    const endpoint = serverSide ? INTERNAL_ENDPOINT : ENDPOINT;
    const req = requestExec( `${endpoint}/store`);
    return req<R>(params);
}


export function requestExec(endpoint: string) {

    return async <R>({ method, path, payload, revalidateSec = 60, tags }: MedusaRequestParams): Promise<Result<R, RequestError>> => {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            next: {
                ...(tags && { tags }),
                ...(!isNaN(revalidateSec) && { revalidate: revalidateSec } )
            }
        };
    
        if (path.includes('/carts') || method === 'POST') {
            options.cache = 'no-cache';
            delete options.next;
        }
    
        if (payload) {
            options.body = JSON.stringify(payload);
        }
    
        try {
            const result = await fetch(`${endpoint}${path}`, options);
    
            const body = await result.json();
    
            if (body.errors) {
                throw body.errors[0];
            }
    
            return Result.of(body);
        } catch (e) {
            const error = e as RequestError;
            return Result.failure({
                status: error?.status || 500,
                message: error.message || 'Something went wrong'
            });
        }    
    }
}