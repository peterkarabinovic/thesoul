import { Money } from 'data/data-types';

export function formatPrice(price: Money) {

    const locale = price.currencyCode?.toLowerCase() === "uah" ? "uk-UA" : "gr-GR";
    const amount = price.amount / 100;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: price.currencyCode,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 0
    }).format(amount);
}