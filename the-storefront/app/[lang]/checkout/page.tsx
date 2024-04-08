
import { Breadcrumb } from 'components/breadcrumb';
import { HeaderOne } from 'components/header';
import { Metadata } from 'next';
import { i18nGeneral } from 'config-and-i18n';
import { CheckoutView } from 'modules/checkout/checkout-view';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart'
};

type Props = {
    params: { lang: string };
}

export default async function CheckoutPage( { params }: Props ) {
  const i18n = await i18nGeneral(params.lang);  
  
  return (
    <>
      <HeaderOne lang={params.lang} transparent={false}/>
      <Breadcrumb 
        lang={params.lang} 
        parents={[
            { path: '/', title: i18n.home },
            { path: '/cart', title: i18n.cart }
        ]} 
        lastTitle={i18n.shipping} 
      />
      <CheckoutView 
        lang={params.lang} 
      />
    </>
  );
}
