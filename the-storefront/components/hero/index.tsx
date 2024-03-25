/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import SwiperComps from './swiper';
import { SwiperSlides } from './swiper-slides';


type HeroOneProps = {
    lang?: string;
};

export function HeroOne({ lang = 'en' }: HeroOneProps) {
    const [activeIdx, setActiveId] = useState(0);

    
    const onSlideChange = (SwiperComps: any) => {
        const { activeIndex } = SwiperComps;
        setActiveId(activeIndex);
    };
    const onSlideChangeTransitionStart = () => {
        setActiveId(-1);
    };

    const onSlideChangeTransitionEnd = (SwiperComps: any) => {
        const { activeIndex } = SwiperComps;
        setActiveId(activeIndex);
    };

    const settings = {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: { clickable: true, type: 'bullets' },
        navigation: false,
        slidesPerView: 1,
        spaceBetween: 0,
        onSlideChange,
        onSlideChangeTransitionStart,
        onSlideChangeTransitionEnd,
    };

    // Tailwind Related Stuff
    // const secondaryButton =
    //     'inline-flex items-center bg-secondary text-white leading-[38px] text-[15px] h-[38px] px-5';

    return (
        <div className="hero-area">
            <div className="container-fluid">
                <SwiperComps
                    sliderCName="pagination-bg-primary"
                    settings={settings}
                >
                    <SwiperSlides 
                        lang={lang} 
                        activeIdx={activeIdx} 
                    />
                </SwiperComps>
            </div>
        </div>
    );
}


