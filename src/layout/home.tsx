import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import '../assets/css/slick-theme.css';
import '../assets/css/slick.css';
import Arrow from './../components/main/slideArrow';
import SliderSample from '../assets/image/main/slider_sample.png';
import BasicProfile from '../assets/image/common/basic_profile.png';

const slider_mock = [
    {
        image: SliderSample,
        title: 'An enchanting evening',
        price: '500',
        creator: BasicProfile
    },
    {
        image: SliderSample,
        title: 'An enchanting evening',
        price: '500',
        creator: BasicProfile
    },
    {
        image: SliderSample,
        title: 'An enchanting evening',
        price: '500',
        creator: BasicProfile
    },
    {
        image: SliderSample,
        title: 'An enchanting evening',
        price: '500',
        creator: BasicProfile
    }
];

const Home = () => {
    const [mainSlide, setMainSlide] = useState(null);
    const [subSlide, setSubSlide] = useState(null);
    const mainSlideRef = useRef(null);
    const subSlideRef = useRef(null);

    const mainSliderset = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow position='Next' />,
        prevArrow: <Arrow position='Prev' />
    };

    const subSliderset = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []); 
    const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);

    useEffect(() => {
        setMainSlide(mainSlideRef.current);
        setSubSlide(subSlideRef.current);
    }, [])

    return (
        <div className='home'>
            <section className='home-section'>
                <aside className='home-aside'>
                    <ul className="home-aside-title">
                        <li className='aside-title1'>We</li>
                        <li className='aside-title2'>need</li>
                        <li className='aside-title3'>your</li>
                        <li className='aside-title4'>artistic</li>
                        <li className='aside-title5'>mind</li>
                        <li className='aside-title6'>.</li>
                    </ul>


                    <div className="sub-slide">
                        <Slider
                            ref={subSlideRef}
                            // @ts-ignore
                            asNavFor={mainSlide}
                            {...subSliderset}
                        >
                            {slider_mock.map(list => {
                                return (
                                    <div>
                                        <img src={list.image} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </aside>

                <div className="home-main-slider">
                    <Slider 
                        ref={mainSlideRef} 
                        // @ts-ignore
                        asNavFor={subSlide}
                        {...mainSliderset}
                    >
                        {slider_mock.map(list => {
                            return (
                                <div>
                                    <img src={list.image} />
                                    <div className="main-slider">
                                        <div className="slider-nft-title">{list.title}</div>
                                        <div className="slider-nft-price">{list.price} Klaytn</div>
                                        <div className="slider-nft-Creator"><img src={list.creator} alt="Basic profile image" /> Creator</div>
                                    </div>
                                </div>
                            )    
                        })}
                    </Slider>
                </div>
            </section>
        </div>
    );
};

export default Home;