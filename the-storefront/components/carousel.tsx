import { useState, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type CarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  fullWidth: boolean;
};

export function Carousel({ images, fullWidth }: CarouselProps) {
  const [indx, setIndx] = useState(0);

  // Not  for all Image Components we set the right src, only for visible + on both sides
  // see at 'handleScroll'
  const [srcs, setSrcs] = useState(images.map((img, i) => i === 0 || i === 1 ? img.src : '' ));

  const carouselRef = useRef(null);

  const full = fullWidth ? 'w-full' : 'h-full';
  const decoration = "rounded-xl bg-secondary text-secondary-content opacity-80 border-0"
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
      _srcs[_indx] = images[_indx]?.src || "";
      _indx - 1 >= 0 && (_srcs[_indx - 1] = images[_indx - 1]?.src || "");
      _indx + 1 < images.length && (_srcs[_indx + 1] = images[_indx + 1]?.src || "");
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
        className={`carousel ${full} carousel-center rounded-box aspect-3/4`}
        onScroll={handleScroll}
        ref={carouselRef}
      >
        {images.map((img, i) => (
          <div key={i} className="carousel-item relative aspect-3/4">
            <Image fill={true} 
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   src={String(srcs[i])} alt={img.alt} />
          </div>
        ))}
      </div>
      <div className={clsx({ "hidden": isOne })}>
        <div className={clsx("absolute top-3 right-3 py-1 px-2 text-xs font-bold", decoration)}>
            {indx+1}/{images.length}
        </div>

        <div className='hidden lg:flex absolute justify-between transform -translate-y-1/2 left-3 right-3 top-1/2'>
            <button className={clsx("btn", decoration, { "invisible": indx === 0 } )} 
                    onClick={() => handleClick(-1)}>❮</button> 
            <button className={clsx("btn", decoration, { "invisible": indx === images.length - 1 })} 
                    onClick={() => handleClick(1)} >❯</button> 
        </div>
    
        <div className="flex flex-wrap justify-center gap-1">
            {images.map((_, i) => (
            <div key={i} className={clsx("h-2 w-2 rounded-full", i === indx ? "bg-secondary" : "bg-base-200")} />
            ))}
        </div>
      </div>
    </div>
  );
}
