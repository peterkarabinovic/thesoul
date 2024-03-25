import { NextResponse, NextRequest } from "next/server";

import Conf from "config-and-i18n/common.json"




export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if( Conf.locales.some( locale => pathname == `/${locale}` || pathname.startsWith(`/${locale}/`) ) ) {
        return;
    }

    request.nextUrl.pathname = `/${Conf.defaultLocale}${request.nextUrl.pathname}`

    return NextResponse.rewrite(request.nextUrl);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|public|_next/image|images|favicon|sitemap|robot|apple-icon|opengraph).*)',
        '/',
        // Skip all internal paths (_next)
        // '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}