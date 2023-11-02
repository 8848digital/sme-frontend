import React from 'react';
import CountUp from 'react-countup';
import landingImg from "../../public/assets/landing-img.jpg";
import styles from "@/styles/landing_page.module.css";
import OurClients from './Clients/OurClients';
import Link from 'next/link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const LandingPage = () => {
    const data:any = {
        "heading_name1": "We are the trusted consulting partner for SMEs who want to achieve their growth goals",
        "short_description": "With our many years of experience, we have helped SMEs to grow, increase their profitability, and become more competitive",
        "image": landingImg,
        "social_links": [
            {
                "twitter": "https://twitter.com/"
            }, {
                "linked_in": "https://www.linkedin.com/"
            }
        ],
        "Heading_name2": "Here are some benefits in working together",
        "total_projects": 100,
        "total_clients": 50,
        "total_smes": 25,
        "link_label": "Learn more about our services",
        "url_for_link_label": "https://example.com/services",
        "label_for_button": "Let's get started"
    };


    return (
        <>
            <div className={`${styles.landing_wrapper}`}>
                <div className={` container ${styles.landing_content}`}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className='row'>
                                <div className="col-12">
                                    <div className='landing-details'>
                                        <h1>{data.heading_name1}</h1>
                                    </div>
                                    <div className="short_desc">
                                        <p>{data?.short_description}</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="benefits_wrapper text-center mt-5">
                                        <h2>{data?.Heading_name2}</h2>
                                        <h6 className='text-dark'>We Have</h6>
                                        <div className="count-circle mt-5">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={`${styles.count_item_wrapper}`}>

                                                        <div className={`${styles.count_item}`}>
                                                            <h3>+<CountUp start={0} end={data.total_projects} duration={4} separator="," useEasing={true} useGrouping={true} /></h3>
                                                            <h5>Projects</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={`${styles.count_item_wrapper}`}>
                                                        <div className={`${styles.count_item}`}>
                                                            <h3>+<CountUp start={0} end={data.total_clients} duration={4} separator="," useEasing={true} useGrouping={true} /></h3>
                                                            <h5>Clients</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={`${styles.count_item_wrapper}`}>

                                                        <div className={`${styles.count_item}`}>
                                                            <h3>+<CountUp start={0} end={data.total_smes} duration={4} separator="," useEasing={true} useGrouping={true} /></h3>
                                                            <h5>SMEs</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`${styles.get_started_btn}`}>
                                        <button className={`${styles.btn}`} type='button'>{data?.label_for_button}</button>
                                        <div className="about_services">
                                            <Link href='https://strategicgears.com/index.php/services/strategy-management' className='color' target='_blank'>{data?.link_label}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <OurClients />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${styles.landing_image_wrapper}`}>
                                <img src={data?.image.src} alt="" className='img-fluid' />
                            </div>
                            <div className={`${styles.social_link}`}>
                                <Link href='' target="_blank" >
                                    <LinkedInIcon fontSize="large" color="primary" className='mx-1'/>
                                </Link>
                                <Link href='' target="_blank">
                                <TwitterIcon fontSize="large" color="primary" className='mx-1'/>
                                </Link>
                                <Link href='' target="_blank">
                                <InstagramIcon fontSize="large" className='text-dark mx-1'/>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
