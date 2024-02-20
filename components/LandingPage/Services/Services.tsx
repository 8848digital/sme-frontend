import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "@/styles/services.module.css";
import Link from 'next/link';
import serviceImg from "@/public/assets/service.png";
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                arrows: false,
                adaptiveHeight: true,
            },
        },
    ],
};

const Services = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        AOS.init();
    }, []);

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className={`${styles.our_services_wrapper}`} data-aos="slide-up">
            <div className="row">
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12 col-6">
                            <div className={`${styles.services_heading} `}>
                                <h1>Our Service</h1>
                            </div>
                        </div>
                        <div className="col-md-12 col-6">
                            <div className={`${styles.arrowContainer}`}>
                                <div className={`${styles.arrow} ${styles.prev} me-5`} onClick={handlePrev}>
                                    <ArrowBackIcon style={{ color: 'gray', fontSize: '50px', border: '1px solid #d3d3d3', borderRadius: '50%', padding: '8px',cursor: "pointer" }} />
                                </div>
                                <div className={`${styles.arrow} ${styles.next}`} onClick={handleNext}>
                                    <ArrowForwardIcon style={{ color: 'gray', fontSize: '50px', border: '1px solid #d3d3d3', borderRadius: '50%', padding: '8px', cursor: "pointer" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-10">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className={` ${styles.sliderItem}`}>
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
        </div>
    );
};

export default Services;