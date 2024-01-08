import { ReadonlyURLSearchParams } from 'next/navigation';
import { MedusaProductOption } from './medusa/types';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};

export const mapOptionIds = (productOptions: MedusaProductOption[]) => {
    // Maps the option titles to their respective ids
    const map: Record<string, string> = {};
    productOptions.forEach((option) => {
        map[option.id] = option.title;
    });
    return map;
};

export const isObject = (input: any) => input instanceof Object;
export const isArray = (input: any) => Array.isArray(input);

export const isEmpty = (input: any) => {
    return (
        input === null ||
        input === undefined ||
        (isObject(input) && Object.keys(input).length === 0) ||
        (isArray(input) && (input as any[]).length === 0) ||
        (typeof input === 'string' && input.trim().length === 0)
    );
};


// eslint-disable-next-line no-unused-vars
export function groupBy<T>(xs: T[], fn: (x: T) => string) {
    return xs.reduce((rv, x) => {
        const groupName = fn(x);
        (rv[groupName] = rv[groupName] || []).push(x);
        return rv;
    }, {} as Record<string, T[]>);
}

export function idGenerator(prefix: string) {
    let id = 1;
    return () => `${prefix}_${id++}`;
}