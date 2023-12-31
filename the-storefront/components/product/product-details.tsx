import { useState } from 'react';
import { Product } from 'lib/data/types';
import { Carousel } from "components/carousel";
import { AddToCartBtn } from './add-to-cart-btn';

type ProductDetailsProps = {
  product: Pick<Product, 'images'>;
};

const images = [
  { src:'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg', alt: "Kino" },
  { src:'https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg', alt: "Kino" },
];

export function ProductDetails({ product }: ProductDetailsProps) {


  return (
    <div className="container mx-auto grid grid-cols-1 gap-y-4 lg:max-w-6xl lg:grid-cols-2 lg:gap-x-8">
      <div className="w-full">
            <Carousel images={images} fullWidth={true} />
        </div>
      <div className="w-ful p-4 lg:p-8">
        <div>
          <h2 className="tracking-widest text-neutral-500 lg:text-base uppercase">Subtitile</h2>
          <h1 className="mb-1 text-3xl font-medium text-base-content">Product Name</h1>
        </div>
        <div className="border-secondary grid grid-cols-1 gap-y-4 border-b-2 py-4">
          <span className="text-info leading-relaxed">Sold Out</span>
          <p className="text-neutral-500 prose lg:prose-xl">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia
            microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn.
            Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center justify-between gap-8 py-8 lg:grid-cols-2 lg:py-8 ">
          <h1 className="text-3xl font-medium text-base-content">1000 UAH</h1>
          <AddToCartBtn
                addToCart={() => {}}
                removeFromCart={() => {}}
            />
        </div>
      </div>
    </div>
  );
}
