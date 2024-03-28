// 'use server'

import HeroConf from "./en/hero.json"
import DI18nGeneral from "./en/i18n-general.json"
import TI18nCart from "./en/i18n-cart.json"
import TI18nCustomer from "./en/i18n-customer.json"
import { TShippingConfig } from "./en/i18n-shipping"

import * as T from "./types"

export type TI18nGeneral = typeof DI18nGeneral;

export type Langs = keyof typeof config;
 
const config = {
  en: (section: string) => import(`./en/${section}.json`, { assert: { type: 'json' } }),
  ua: (section: string) => import(`./ua/${section}.json`, { assert: { type: 'json' } }),
  gr: (section: string) => import(`./gr/${section}.json`, { assert: { type: 'json' } }),
} 
 
export const i18nGeneral = async (locale: string) => config[locale as Langs]('i18n-general').then( m => {
    console.log("i18nGeneral call")
    return m.default as typeof DI18nGeneral;
});

export const i18nCart = async (locale: string) => config[locale as Langs]('i18n-cart').then( m => {
    return m.default as typeof TI18nCart;
});

export const i18nCustomer = async (locale: string) => config[locale as Langs]('i18n-customer').then( m => {
    return m.default as typeof TI18nCustomer;
});


export const i18nShipping = async (locale: string) => {
    const m = await import(`./${locale}/i18n-shipping`);
    return m.config as TShippingConfig;
};

export const getHeroConfig = async (locale: Langs) => config[locale]('hero').then( m => {
    return m.default as typeof HeroConf;
}) ;


export const getHeaderConfig = async (locale: Langs) => config[locale]('header').then( m => {
    return m.default as T.HeaderItems;
});


