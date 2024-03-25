'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type CarouselProps = {
  images: {
    url: string;
    altText: string;
  }[];
  fullWidth: boolean;
};

export function Carousel({ images, fullWidth }: CarouselProps) {
  const [indx, setIndx] = useState(0);

  // Not for all Image Components we set the right src, only for visible + on both sides
  // see at 'handleScroll'
  const [srcs, setSrcs] = useState(images.map((img, i) => i === 0 || i === 1 ? img.url : '' ));

  const carouselRef = useRef(null);

  const full = fullWidth ? 'w-full' : 'h-full';
  const decoration = "rounded-xl bg-secondary text-white opacity-80 border-0"
  const arrowBtn = "w-10 h-10 rounded-full border-0";
  const isOne = images.length === 1;

  const handleScroll = () => {
    const element = carouselRef.current as unknown as HTMLDivElement;
    if (!element) return;
    const { width } = element.getBoundingClientRect();
    const _indx = Math.round(element.scrollLeft / width);
    setIndx(_indx);

    // load images for visible + on both sides
    srcs[_indx] || setSrcs((srcs) => {
      const _srcs = [...srcs];
      _srcs[_indx] = images[_indx]?.url || "";
      _indx - 1 >= 0 && (_srcs[_indx - 1] = images[_indx - 1]?.url || "");
      _indx + 1 < images.length && (_srcs[_indx + 1] = images[_indx + 1]?.url || "");
      return _srcs;
    })
  }

  const handleClick = (delta: 1 | -1) => {
    const element = carouselRef.current as unknown as HTMLDivElement;
    if (!element) return;
    const { width } = element.getBoundingClientRect();
    const index = Math.abs(indx + delta ) % images.length;
    element.scrollTo({ left: index * width, behavior: 'smooth' });
  }

  return (
    <div className={clsx(full, "relative")}>
      <div
        className={`carousel ${full} carousel-center aspect-3/4`}
        onScroll={handleScroll}
        ref={carouselRef}
      >
        {images.map((img, i) => (
          <div key={i} className="carousel-item relative aspect-3/4 w-full">
            <Image fill={true} 
                   className="object-cover object-center"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   src={String(srcs[i])} alt={img.altText} />
          </div>
        ))}
      </div>
      <div className={clsx({ "hidden": isOne })}>
        <div className={clsx("absolute top-3 right-3 py-1 px-2 text-xs font-bold", decoration)}>
            {indx+1}/{images.length}
        </div>

        <div className='hidden lg:flex absolute justify-between transform -translate-y-1/2 left-3 right-3 top-1/2'>
            <button className={clsx(arrowBtn, decoration, { "invisible": indx === 0 } )} 
                    onClick={() => handleClick(-1)}>❮</button> 
            <button className={clsx(arrowBtn, decoration, { "invisible": indx === images.length - 1 })} 
                    onClick={() => handleClick(1)} >❯</button> 
        </div>
    
        <div className="flex flex-wrap justify-center gap-1">
            {images.map((_, i) => (
            <div key={i} className={clsx("h-2 w-2 rounded-full", i === indx ? "bg-secondary" : "bg-gray-200")} />
            ))}
        </div>
      </div>
    </div>
  );
}
