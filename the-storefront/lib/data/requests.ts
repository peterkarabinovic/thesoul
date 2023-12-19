import { Result } from 'lib/result';

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
    revalidateSec?: number
};

export async function medusaRequest<R>({
    method,
    path,
    payload,
    revalidateSec,
    serverSide = true
}: MedusaRequestParams): Promise<Result<R, RequestError>> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(revalidateSec && { next: { revalidate: revalidateSec } })
    };

    if (path.includes('/carts')) {
        options.cache = 'no-cache';
    }

    if (payload) {
        options.body = JSON.stringify(payload);
    }

    try {
        const endpoint = serverSide ? INTERNAL_ENDPOINT : ENDPOINT;
        const result = await fetch(`${endpoint}/store${path}`, options);

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return Result.of(body);
    } catch (e: any) {

        return Result.failure({
            status: e?.status || 500,
            message: e.message || 'Something went wrong'
        });
    }
}
