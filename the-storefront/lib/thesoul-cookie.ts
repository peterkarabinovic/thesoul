

export function readThesoulCookie(): { cartId?: string, customerId?: string } {
    
    if( "document" in global ){
        const cookie = document.cookie || '';
        const m = cookie.match(/thesoul=([^;]+)/v);
        if(m && m[1]) {
            const [customerId, cartId] = m[1].split(":");
            return {customerId, cartId};
        }
    }
    return {};
}
