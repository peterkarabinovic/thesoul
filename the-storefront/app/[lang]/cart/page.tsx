
import { Breadcrumb } from 'components/breadcrumb';
import { HeaderOne } from 'components/header';
import { Metadata } from 'next';
import { CartView } from '@cart/components/cart-view';
import { i18nGeneral } from 'config-and-i18n';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart'
};

type Props = {
    params: { lang: string };
}

export default async function CartPage( { params }: Props ) {
  const i18n = await i18nGeneral(params.lang);  
  return (
    <>
      <HeaderOne lang={params.lang} transparent={false}/>
      <Breadcrumb lang={params.lang} parents={[{ path: '/', title: i18n.home }]} lastTitle={i18n.cart} />
      <CartView lang={params.lang}/>
    </>
  );
}
