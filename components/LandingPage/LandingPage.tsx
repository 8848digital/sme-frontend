import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import landingImg from "../../public/assets/landing-img.jpg";
import styles from "@/styles/landing_page.module.css";
import OurClients from "./Clients/OurClients";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useRouter } from "next/router";
import useLandingPage from "@/hooks/general_hooks/landingpage_hook";
import Loaders from "../Loaders";
import LoaderForSkills from "../LoaderForSkills";
import { CONSTANTS } from "@/services/config/api-config";
import twitterIcon from "../../public/assets/icons8-twitter-50.png";
import useFetchOurHtmlLanguage from "@/hooks/general_hooks/language_hook";
import { staticData } from "@/datasets/staticData"
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { useSelector } from "react-redux";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";

const LandingPage = () => {
  // const arabicData = {
  //   heading_name1:
  //     "نحن الشريك الاستشاري الموثوق به للشركات الصغيرة والمتوسطة التي ترغب في تحقيق أهداف النمو الخاصة بها",
  //   short_description:
  //     "بفضل سنوات خبرتنا العديدة، ساعدنا الشركات الصغيرة والمتوسطة على النمو وزيادة ربحيتها وتصبح أكثر قدرة على المنافسة",
  //   image: landingImg,
  //   social_links: [
  //     {
  //       twitter: "https://twitter.com/",
  //     },
  //     {
  //       "linked-in": "https://www.linkedin.com/",
  //     },
  //   ],
  //   Heading_name2: "فيما يلي بعض الفوائد في العمل معًا",
  //   total_projects: 100,
  //   total_clients: 50,
  //   total_smes: 25,
  //   link_label: "أعرف أكثر عن خدماتنا",
  //   url_for_link_label: "https://example.com/services",
  //   label_for_button: "هيا بنا نبدأ",
  // };
  //   const englishData = {
  //     "heading_name1": "We are the trusted consulting partner for SMEs who want to achieve their growth goals",
  //     "short_description": "With our many years of experience, we have helped SMEs to grow, increase their profitability, and become more competitive",
  //     "image": landingImg,
  //     "social_links": [
  //         {
  //             "twitter": "https://twitter.com/"
  //         }, {
  //             "linked-in": "https://www.linkedin.com/"
  //         }
  //     ],
  //     "Heading_name2": "Here are some benefits in working together",
  //     "total_projects": 100,
  //     "total_clients": 50,
  //     "total_smes": 25,
  //     "link_label": "Learn more about our services",
  //     "url_for_link_label": "https://example.com/services",
  //     "label_for_button": "Let's get started"
  // };

  const [LoggedIn, setLoggedIn] = useState<any>(false);
  const router = useRouter();
  const { landingData, loading } = useLandingPage();  
  const translationDataFromStore = useSelector(translation_text_from_Store)
console.log(translationDataFromStore)
  console.log(landingData);
  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);

  // const [landingData, setlandingData] = useState<any>({});
  // const { HandleLangToggle, language_selector_from_redux } =
  //   useFetchOurHtmlLanguage();

  // useEffect(() => {
  //   if (typeof document !== "undefined") {
  //     const htmlTag = document.querySelector("html");
  //     if (htmlTag) {
  //       const dirAttribute = htmlTag.getAttribute("dir");

  //       if (dirAttribute === "rtl") {
  //         setlandingData(arabicData);
  //       } else {
  //         setlandingData(landingData);
  //       }
  //     }
  //   }
  // }, [language_selector_from_redux, landingData]);


  return (
    <>
      <div className={`${styles.landing_wrapper}`}>
        <div className={` container ${styles.landing_content}`}>
          {!loading && landingData ? (
            <div className="row">
              <div className="col-md-12 mt-3">
                <div className={`${styles.image_section}`}>

                <div className={`${styles.landing_image_wrapper}`}>
                  <img
                    src={`${CONSTANTS.API_BASE_URL}${landingData?.image}`}
                    alt=""
                    width='450px'
                    // height='200px'
                    // style={{ objectFit: 'cover' }}
                  className="img-fluid"
                  />
                </div>
                </div>

              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12">
                    <div className={`${styles.landing_details} text-center`}>
                      <h1>{landingData.heading_name1}</h1>
                    </div>
                    <div className="short_desc text-center">
                      <h6 className="text-dark">
                        {landingData?.short_description}
                      </h6>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="benefits_wrapper text-center">
                      <h4 className="color">{landingData?.Heading_name2}</h4>
                      <h6 className="text-dark">{translationDataFromStore?.data?.landingPage_header}</h6>
                      <div className="count-circle mt-1">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="d-flex flex-column justify-content-center align-items-end">

                              <div className={`${styles.count_item_wrapper}`}>
                                <div className='d-flex justify-content-center align-items-center border-bottom' style={{borderColor:'darkgray'}}>
                                  <div className={`${styles.count_container}`}> {/* Wrap the count in a container */}
                                    <h3 className="d-flex">
                                      <CountUp
                                        start={0}
                                        end={landingData.total_projects}
                                        duration={4}
                                        separator=","
                                        useEasing={true}
                                        useGrouping={true}
                                      /> +
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <h5>{translationDataFromStore?.data?.landingPage_project}</h5>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={`${styles.count_item_wrapper}`}>
                              <div className='d-flex justify-content-center align-items-center border-bottom'>
                                <div className={`${styles.count_container}`}> {/* Wrap the count in a container */}
                                  <h3 className="d-flex">
                                    <CountUp
                                      start={0}
                                      end={landingData.total_clients}
                                      duration={4}
                                      separator=","
                                      useEasing={true}
                                      useGrouping={true}
                                    /> +
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <h5>{translationDataFromStore?.data?.landingPage_client}</h5>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex flex-column justify-content-center align-items-start">


                            <div className={`${styles.count_item_wrapper}`}>
                              <div className='d-flex justify-content-center align-items-center border-bottom'>
                                <div className={`${styles.count_container}`}> {/* Wrap the count in a container */}
                                  <h3 className="d-flex">
                                    <CountUp
                                      start={0}
                                      end={landingData.total_smes}
                                      duration={4}
                                      separator=","
                                      useEasing={true}
                                      useGrouping={true}
                                    /> +
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <h5>{translationDataFromStore?.data?.landingPage_sme}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <div className={`${styles.get_started_btn}`}>
                      {LoggedIn === "true" ? (
                        ""
                      ) : (
                        <button
                          className={`text-uppercase ${styles.btn}`}
                          type="button"
                          onClick={() => {
                            router.push("/signup-start");
                          }}
                        >
                          {landingData?.label_for_button}
                        </button>
                      )}
                      <div className="about_services" style={{ fontSize: '14px', marginTop: '10px' }}>
                        <Link
                          href="https://strategicgears.com/index.php/services/strategy-management"
                          className="color"
                          target="_blank"
                        >
                          {landingData?.link_label}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <OurClients landingData={landingData.clients_list} />
                  </div>
                </div>
              </div>
              <div className="">
                {/* <div className={`${styles.landing_image_wrapper}`}>
                  <img
                    src={`${CONSTANTS.API_BASE_URL}${landingData?.image}`}
                    alt=""
                    className="img-fluid"
                  />
                </div> */}
                <div className={`${styles.social_link}`}>
                  <Link href={`${landingData?.social_links[2]?.linkedin}`} target="_blank">
                    <LinkedInIcon
                      fontSize="large"
                      color="primary"
                      className="mx-1"
                    />
                  </Link>
                  <Link href={`${landingData?.social_links[0]?.twitter}`} target="_blank">
                    <img src={twitterIcon.src} alt="" style={{ width: '2.1875rem' }} />
                  </Link>
                  <Link href={`${landingData?.social_links[1]?.instagram}`} target="_blank">
                    <InstagramIcon
                      fontSize="large"
                      className="text-dark mx-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
              >
                <LoaderForSkills />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
