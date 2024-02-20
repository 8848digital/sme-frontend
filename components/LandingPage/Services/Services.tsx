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
import { CONSTANTS } from '@/services/config/api-config';

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

const Services = ( {serviceData , loadingService} :any) => {
    const sliderRef = useRef(null);
     console.log('service',serviceData)
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
    const imageLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`
      }
    return (
        <div className={`${styles.our_services_wrapper}`} data-aos="slide-up">
            <div className="row">
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12 col-6">
                            <div className={`${styles.services_heading} `}>
                                <h1>{serviceData.heading}</h1>
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
                        {serviceData.service_details && serviceData.service_details.map((data:any , index:any) => (
                            <div key={index} className={` ${styles.sliderItem}`}>
                                <div className={`${styles.services_card}`}>
                                    <div className={`${styles.service_title}`}>
                                        <h1>{data?.heading}</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={`${styles.learn_more}`}>
                                                <Link href={data?.url} target='_blank' >
                                                   {data?.url_label}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${styles.services_image}`}>
                                                <img src={`${CONSTANTS.API_BASE_URL}${data?.image}`} className='img-fluid' alt="Services Image" 
                                                // loader={imageLoader}
                                                />
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