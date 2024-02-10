/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => result[key] = obj[key]);
    return result;
}

export function omitProps<T extends object, K extends keyof T>(obj: T, ...keys: K[]): T {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

export function debounce( fn: (...args: any[]) => void, delay: number ) {
    let debounceTimer: NodeJS.Timeout;
    return function(...args: any[] ) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn(...args), delay);
    };
  }