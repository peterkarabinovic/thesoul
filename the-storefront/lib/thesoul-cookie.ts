

export function readThesoulCookie(): { cartId?: string, customerId?: string } {
    if( "document" in global ){
        const cookie = document.cookie || '';
        const m = cookie.match(/thesoul=([^;]+)/);
        if(m && m[1]) {
            const [customerId, cartId] = decodeURIComponent(m[1]).split(":");
            return {customerId, cartId};
        }
    }
    return {};
}
