import { i18n_home, i18n_cart } from 'i18n';
import { Breadcrumb } from 'components/breadcrumb';
import { HeaderOne } from 'components/header';
import { Metadata } from 'next';
import { CartView } from '@cart/components/cart-view';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart'
};

export default function CartPage() {
  return (
    <>
      <HeaderOne transparent={false} />
      <Breadcrumb parents={[{ path: '/', title: i18n_home }]} lastTitle={i18n_cart} />
      <CartView/>
      <p>Lorem ipsum dolor sit amet. Vel sunt voluptatem est dolorum molestiae sed libero itaque. Non galisum ratione sed optio sequi et vitae quisquam qui neque quaerat quo expedita placeat qui internos impedit. </p><p>In illo consequatur qui fugit earum ad laudantium delectus. Ea minima alias et velit maxime et internos dolorem hic illum ipsum in odio consequuntur. Eos animi libero ut voluptas nesciunt sed quia officiis ea perferendis saepe aut minus nisi est architecto voluptates qui amet ratione. Et autem voluptates est dolor sequi aut Quis laborum eum atque explicabo ad perspiciatis fuga eos error enim. </p><p>Ex sunt nobis et amet dolorum sit rerum harum. Et laudantium voluptatem qui Quis minus vel velit obcaecati qui architecto doloremque sit facilis dolorem! Est culpa natus est labore quos quo dolor dolores sit ipsum exercitationem. Aut dolore corporis aut sunt culpa et quae laborum aut quam voluptatum ut quod ipsa non praesentium fuga. </p>
            <p>Lorem ipsum dolor sit amet. Vel sunt voluptatem est dolorum molestiae sed libero itaque. Non galisum ratione sed optio sequi et vitae quisquam qui neque quaerat quo expedita placeat qui internos impedit. </p><p>In illo consequatur qui fugit earum ad laudantium delectus. Ea minima alias et velit maxime et internos dolorem hic illum ipsum in odio consequuntur. Eos animi libero ut voluptas nesciunt sed quia officiis ea perferendis saepe aut minus nisi est architecto voluptates qui amet ratione. Et autem voluptates est dolor sequi aut Quis laborum eum atque explicabo ad perspiciatis fuga eos error enim. </p><p>Ex sunt nobis et amet dolorum sit rerum harum. Et laudantium voluptatem qui Quis minus vel velit obcaecati qui architecto doloremque sit facilis dolorem! Est culpa natus est labore quos quo dolor dolores sit ipsum exercitationem. Aut dolore corporis aut sunt culpa et quae laborum aut quam voluptatum ut quod ipsa non praesentium fuga. </p>
            <p>Lorem ipsum dolor sit amet. Vel sunt voluptatem est dolorum molestiae sed libero itaque. Non galisum ratione sed optio sequi et vitae quisquam qui neque quaerat quo expedita placeat qui internos impedit. </p><p>In illo consequatur qui fugit earum ad laudantium delectus. Ea minima alias et velit maxime et internos dolorem hic illum ipsum in odio consequuntur. Eos animi libero ut voluptas nesciunt sed quia officiis ea perferendis saepe aut minus nisi est architecto voluptates qui amet ratione. Et autem voluptates est dolor sequi aut Quis laborum eum atque explicabo ad perspiciatis fuga eos error enim. </p><p>Ex sunt nobis et amet dolorum sit rerum harum. Et laudantium voluptatem qui Quis minus vel velit obcaecati qui architecto doloremque sit facilis dolorem! Est culpa natus est labore quos quo dolor dolores sit ipsum exercitationem. Aut dolore corporis aut sunt culpa et quae laborum aut quam voluptatum ut quod ipsa non praesentium fuga. </p>
            <p>Lorem ipsum dolor sit amet. Vel sunt voluptatem est dolorum molestiae sed libero itaque. Non galisum ratione sed optio sequi et vitae quisquam qui neque quaerat quo expedita placeat qui internos impedit. </p><p>In illo consequatur qui fugit earum ad laudantium delectus. Ea minima alias et velit maxime et internos dolorem hic illum ipsum in odio consequuntur. Eos animi libero ut voluptas nesciunt sed quia officiis ea perferendis saepe aut minus nisi est architecto voluptates qui amet ratione. Et autem voluptates est dolor sequi aut Quis laborum eum atque explicabo ad perspiciatis fuga eos error enim. </p><p>Ex sunt nobis et amet dolorum sit rerum harum. Et laudantium voluptatem qui Quis minus vel velit obcaecati qui architecto doloremque sit facilis dolorem! Est culpa natus est labore quos quo dolor dolores sit ipsum exercitationem. Aut dolore corporis aut sunt culpa et quae laborum aut quam voluptatum ut quod ipsa non praesentium fuga. </p>

    </>
  );
}
