import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "@/styles/services.module.css";
import Link from 'next/link';
import serviceImg from "@/public/assets/service.png";
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";
const Services = () => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className={`${styles.our_services_wrapper}`} data-aos="slide-up">
            <div className="row">
                <div className="col-12">
                    <div className={`${styles.services_heading}`}>
                        <h1>Our Services</h1>
                    </div>

                </div>
                <Slider {...sliderSettings}>
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className={`col-md-6 ${styles.sliderItem}`}>
                            <div className={`${styles.services_card}`}>
                                <div className={`${styles.service_title}`}>
                                    <h1>STRATEGY DEVELOPMENT</h1>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className={`${styles.learn_more}`}>
                                            <Link href="/" legacyBehavior>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className={`${styles.services_image}`}>
                                            <Image src={serviceImg.src} width={260} height={220} alt="Services Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Services;
