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
import useLandingPage from "@/hooks/landingpage_hook";
import Loaders from "../Loaders";
import LoaderForSkills from "../LoaderForSkills";
import {CONSTANTS} from "@/services/config/api-config"
import twitterIcon from "../../public/assets/icons8-twitter-50.png"


const LandingPage = () => {
  const [LoggedIn, setLoggedIn] = useState<any>(false);
  const router = useRouter();
  const { landingData, loading } = useLandingPage();
  console.log(landingData);
  console.log(loading);
  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);

  return (
    <>
      <div className={`${styles.landing_wrapper}`}>
        <div className={` container ${styles.landing_content}`}>
          {!loading && landingData ? (
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-12">
                    <div className={`${styles.landing_details} text-center`}>
                      <h1>{landingData.heading_name1}</h1>
                    </div>
                    <div className="short_desc text-center mt-4">
                      <h6 className="text-dark">{landingData?.short_description}</h6>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="benefits_wrapper text-center mt-3">
                      <h1>{landingData?.Heading_name2}</h1>
                      <h6 className="text-dark">We have</h6>
                      <div className="count-circle mt-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className={`${styles.count_item_wrapper}`}>
                              <div className={`${styles.count_item}`}>
                                <h3>
                                  +
                                  <CountUp
                                    start={0}
                                    end={landingData.total_projects}
                                    duration={4}
                                    separator=","
                                    useEasing={true}
                                    useGrouping={true}
                                  />
                                </h3>
                                <h5>Projects</h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={`${styles.count_item_wrapper}`}>
                              <div className={`${styles.count_item}`}>
                                <h3>
                                  +
                                  <CountUp
                                    start={0}
                                    end={landingData.total_clients}
                                    duration={4}
                                    separator=","
                                    useEasing={true}
                                    useGrouping={true}
                                  />
                                </h3>
                                <h5>Clients</h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={`${styles.count_item_wrapper}`}>
                              <div className={`${styles.count_item}`}>
                                <h3>
                                  +
                                  <CountUp
                                    start={0}
                                    end={landingData.total_smes}
                                    duration={4}
                                    separator=","
                                    useEasing={true}
                                    useGrouping={true}
                                  />
                                </h3>
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
                      {LoggedIn === "true" ? (
                        ""
                      ) : (
                        <button
                          className={`${styles.btn}`}
                          type="button"
                          onClick={() => {
                            router.push("/signup-start");
                          }}
                        >
                          {landingData?.label_for_button}
                        </button>
                      )}
                      <div className="about_services">
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
                  <div className="col-12">
                    <OurClients landingData={landingData.clients}/>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.landing_image_wrapper}`}>
                  <img
                    src={`${CONSTANTS.API_BASE_URL}${landingData?.image}`}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className={`${styles.social_link}`}>
                  <Link href={`${landingData?.social_links[2]?.linkedin}`} target="_blank">
                    <LinkedInIcon
                      fontSize="large"
                      color="primary"
                      className="mx-1"
                    />
                  </Link>
                  <Link href={`${landingData?.social_links[0]?.twitter}`} target="_blank">
                    <img src={twitterIcon.src} alt="" style={{width: '2.1875rem'}}/>
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
              <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
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
