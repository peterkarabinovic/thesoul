import { Slide } from './swiper';
import { motion } from 'framer-motion';
import { Langs, getHeroConfig } from "config-and-i18n"

type Props = {
    lang?: string;
    activeIdx?: number;
};

export async function SwiperSlides({ lang, activeIdx = 0 }: Props) {

    const heroItems = await getHeroConfig(lang as Langs);

    return (
        <>
        {[heroItems]?.map((heroDefaultItem, idx) => (
                <Slide key={heroDefaultItem.id}>
                    <div
                        className={`${heroDefaultItem.heroBG
                            .split(' ')
                            .join(' ')} md:h-[800px] h-[540px]`}
                    >
                        <div className="container">
                            <div className="hero-content-2 pb-40">
                                <motion.span
                                    className="text-primary font-medium block mb-[5px]"
                                    dangerouslySetInnerHTML={{
                                        __html: heroDefaultItem.subtitle,
                                    }}
                                    initial="hidden"
                                    animate={
                                        idx === activeIdx
                                            ? 'visible'
                                            : 'exit'
                                    }
                                    exit="exit"
                                    variants={{
                                        hidden: {
                                            y: '100%',
                                            opacity: 0,
                                        },
                                        visible: {
                                            y: '0',
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 0.3,
                                            },
                                        },
                                        exit: {
                                            y: '100%',
                                            opacity: 0,
                                            transition: {
                                                duration: 1,
                                                delay: 0.3,
                                            },
                                        },
                                    }}
                                />
                                <motion.h2
                                    className="relative md:text-[60px] text-[34px] leading-[1.1] pb-[15px] mb-[30px] after:bg-primary after:absolute after:min-h-[4px] after:min-w-[70px] after:max-h-[4px] after:max-w-[70px] after:bottom-0 after:left-0"
                                    dangerouslySetInnerHTML={{
                                        __html: heroDefaultItem.title,
                                    }}
                                    initial="hidden"
                                    animate={
                                        idx === activeIdx
                                            ? 'visible'
                                            : 'exit'
                                    }
                                    exit="exit"
                                    variants={{
                                        hidden: {
                                            y: '100%',
                                            opacity: 0,
                                        },
                                        visible: {
                                            y: '0',
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 0.6,
                                            },
                                        },
                                        exit: {
                                            y: '100%',
                                            opacity: 0,
                                            transition: {
                                                duration: 1,
                                                delay: 0.6,
                                            },
                                        },
                                    }}
                                />
                                <motion.p
                                    dangerouslySetInnerHTML={{
                                        __html: heroDefaultItem.desc,
                                    }}
                                    initial="hidden"
                                    animate={
                                        idx === activeIdx
                                            ? 'visible'
                                            : 'exit'
                                    }
                                    exit="exit"
                                    variants={{
                                        hidden: {
                                            y: '100%',
                                            opacity: 0,
                                        },
                                        visible: {
                                            y: '0',
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 0.9,
                                            },
                                        },
                                        exit: {
                                            y: '100%',
                                            opacity: 0,
                                            transition: {
                                                duration: 1,
                                                delay: 0.9,
                                            },
                                        },
                                    }}
                                />
                                {/* <motion.div
                                    className="mt-[30px]"
                                    initial="hidden"
                                    animate={
                                        idx === activeIdx
                                            ? 'visible'
                                            : 'exit'
                                    }
                                    exit="exit"
                                    variants={{
                                        hidden: {
                                            y: '100%',
                                            opacity: 0,
                                        },
                                        visible: {
                                            y: '0',
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 1.2,
                                            },
                                        },
                                        exit: {
                                            y: '100%',
                                            opacity: 0,
                                            transition: {
                                                duration: 1,
                                                delay: 1.2,
                                            },
                                        },
                                    }}
                                >
                                    <Link
                                        href="/products/left-sidebar"
                                        className={secondaryButton}
                                    >
                                        Shop Now
                                        <IoArrowForwardOutline className="text-white ml-[5px]" />
                                    </Link>
                                </motion.div> */}
                            </div>
                        </div>
                    </div>
                </Slide>
            ))}

        </>
    );
}