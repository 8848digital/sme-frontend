import React, { useState, useEffect } from 'react';
import landingImg from "../../public/assets/landing-img.jpg";
import styles from "@/styles/landing_page.module.css";

const LandingPage: React.FC = () => {
    const englishData = {
        "heading_name1": "We are the trusted consulting partner for SMEs who want to achieve their growth goals",
        "short_description": "With our many years of experience, we have helped SMEs to grow, increase their profitability, and become more competitive",
        "image": landingImg,
        "social_links": [
            {
                "twitter": "https://twitter.com/"
            }, {
                "linked-in": "https://www.linkedin.com/"
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

    const [countProjects, setCountProjects] = useState<number>(0);
    const [countClients, setCountClients] = useState<number>(0);
    const [countSMEs, setCountSMEs] = useState<number>(0);

    useEffect(() => {
        const incrementCounts = () => {
            const projectIncrement = Math.ceil(data.total_projects / 100); // Adjust the increment as needed
            const clientsIncrement = Math.ceil(data.total_clients / 100); // Adjust the increment as needed
            const smesIncrement = Math.ceil(data.total_smes / 100); // Adjust the increment as needed

            const projectInterval = setInterval(() => {
                if (countProjects < data.total_projects) {
                    setCountProjects((prevCount) => Math.min(prevCount + projectIncrement, data.total_projects));
                }
            }, 100); // Adjust the interval as needed

            const clientsInterval = setInterval(() => {
                if (countClients < data.total_clients) {
                    setCountClients((prevCount) => Math.min(prevCount + clientsIncrement, data.total_clients));
                }
            }, 100); // Adjust the interval as needed

            const smesInterval = setInterval(() => {
                if (countSMEs < data.total_smes) {
                    setCountSMEs((prevCount) => Math.min(prevCount + smesIncrement, data.total_smes));
                }
            }, 100); // Adjust the interval as needed

            return () => {
                clearInterval(projectInterval);
                clearInterval(clientsInterval);
                clearInterval(smesInterval);
            };
        };

        incrementCounts();
    }, [countProjects, countClients, countSMEs, data]);

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
                                                    <div className={`${styles.count_item}`}>
                                                        <h3>+{countProjects}</h3>
                                                        <h5>Projects</h5>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={`${styles.count_item}`}>
                                                        <h3>+{countClients}</h3>
                                                        <h5>Clients</h5>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={`${styles.count_item}`}>
                                                        <h3>+{countSMEs}</h3>
                                                        <h5>SMEs</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="landing_image_wrapper">
                                <img src={data?.image.src} alt="" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
