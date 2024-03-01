// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Autoplay,
    Navigation,
    Pagination,
    Thumbs,
    EffectFade,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// eslint-disable-next-line @typescript-eslint/no-var-requires

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Thumbs, EffectFade]);

function SwiperComps({ children, sliderCName, settings }) {
    const sliderOptions = {
        ...settings,
    };
    return (
        <Swiper className={`${sliderCName}`} {...sliderOptions}>
            {children}
        </Swiper>
    );
}

export { SwiperSlide as Slide };


export default SwiperComps;
