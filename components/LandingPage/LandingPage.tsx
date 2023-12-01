import useLandingPage from "@/hooks/general_hooks/landingpage_hook";
import { CONSTANTS } from "@/services/config/api-config";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/landing_page.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import twitterIcon from "../../public/assets/icons8-twitter-50.png";
import LoaderForSkills from "../LoaderForSkills";
import OurClients from "./Clients/OurClients";
import landinImage from '../../public/assets/landing_image.jpg'
import AOS from "aos";
import "aos/dist/aos.css";
const LandingPage = () => {
  const [LoggedIn, setLoggedIn] = useState<any>(false);
  const router = useRouter();
  const { landingData, loading } = useLandingPage();
  const translationDataFromStore = useSelector(translation_text_from_Store);
  console.log(translationDataFromStore);
  console.log(landingData);
  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <>
      <div className={`${styles.landing_wrapper}`}>
        <div className="d-block" style={{ position: 'relative' }}>
          <img
            // className="d-block w-100 img-fluid"
            src={`${CONSTANTS.API_BASE_URL}${landingData?.image}`}
            alt="Banner Images"
            // className="img-fluid"
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
          />

        </div>
        <div className={` container `}>

          {!loading && landingData ? (
            <>
              <div className="row">
                {/* <div className="col-md-12 mt-3">
                <div className={`${styles.image_section}`}>
                  <div className={`${styles.landing_image_wrapper}`}>
                    <img
                      src={landinImage.src}
                      alt=""
                      style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                      // className="img-fluid"
                    />
                  </div>
                </div>
              </div> */}
                <div className="col-md-12">
                  <div className="row">
                    <div className={`col-md-5 ${styles.landing_details_over_image}`}>
                      <div data-aos="slide-up">

                        <div className={`${styles.landing_details} `}>
                          <h1 className="text-white" style={{ fontSize: '36px', fontWeight: '500' }}>{landingData.heading_name1}</h1>
                        </div>
                        <div className={`${styles.short_desc}`}>
                          <h6 className="color">
                            {landingData?.short_description}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="benefits_wrapper text-center">
                        <h4 className="color text-uppercase" style={{ fontSize: '24px', fontWeight: '600' }}>{landingData?.Heading_name2}</h4>
                        <h6 className="text-dark">
                          {translationDataFromStore?.data?.landingPage_header}
                        </h6>
                        <div className="count-circle mt-2" data-aos="slide-up">
                          <div className="row">
                            <div className="col-md-4 mt-2 d-flex align-items-center justify-content-center " >
                              <div
                                className={`${styles.count_item}`}
                              >
                                <div className={`${styles.count_item_wrapper} `}>
                                  <div
                                    className="d-flex justify-content-center align-items-center border-bottom"
                                    style={{ borderColor: "darkgray" }}
                                  >
                                    <div className={`${styles.count_container}`}>
                                      {" "}
                                      {/* Wrap the count in a container */}
                                      <h3 className={`d-flex`}>
                                        <CountUp
                                          start={0}
                                          end={landingData.total_projects}
                                          duration={4}
                                          separator=","
                                          useEasing={true}
                                          useGrouping={true}
                                        />{" "}
                                        +
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <h5>
                                  {
                                    translationDataFromStore?.data
                                      ?.landingPage_project
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className="col-md-4 mt-2 d-flex align-items-center justify-content-center ">
                              <div className={`${styles.count_item}`}>
                                <div className={`${styles.count_item_wrapper}`}>
                                  <div className="d-flex justify-content-center align-items-center border-bottom">
                                    <div className={`${styles.count_container}`}>
                                      {" "}
                                      {/* Wrap the count in a container */}
                                      <h3 className="d-flex">
                                        <CountUp
                                          start={0}
                                          end={landingData.total_clients}
                                          duration={4}
                                          separator=","
                                          useEasing={true}
                                          useGrouping={true}
                                        />{" "}
                                        +
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <h5>
                                  {
                                    translationDataFromStore?.data
                                      ?.landingPage_client
                                  }
                                </h5>
                              </div>
                            </div>
                            <div className="col-md-4 mt-2 d-flex align-items-center justify-content-center ">
                              <div className={`${styles.count_item}`}>
                                <div className={`${styles.count_item_wrapper}`}>
                                  <div className="d-flex justify-content-center align-items-center border-bottom">
                                    <div className={`${styles.count_container}`}>
                                      {" "}
                                      {/* Wrap the count in a container */}
                                      <h3 className="d-flex">
                                        <CountUp
                                          start={0}
                                          end={landingData.total_smes}
                                          duration={4}
                                          separator=","
                                          useEasing={true}
                                          useGrouping={true}
                                        />{" "}
                                        +
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <h5>
                                  {
                                    translationDataFromStore?.data
                                      ?.landingPage_sme
                                  }
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={` col-md-6 mt-5  ${styles.get_started_btn_over_image}`}>
                      <div data-aos="slide-up">

                        <div className={`${styles.get_started_btn} `}>
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
                          <div
                            className="about_services"
                            style={{ fontSize: "14px", marginTop: "10px" }}
                          >
                            <Link
                              href="https://strategicgears.com/services/strategy-management"
                              className="color"
                              target="_blank"
                            >
                              {landingData?.link_label}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <OurClients landingData={landingData.clients_list} />
                    </div>
                  </div>
                </div>
                {/* <div className="">
                  <div className={`${styles.social_link}`}>
                    <Link
                      href={`${landingData?.social_links?.[2]?.linkedin}`}
                      target="_blank"
                    >
                      <LinkedInIcon
                        fontSize="large"
                        color="primary"
                        className="mx-1"
                      />
                    </Link>
                    <Link
                      href={`${landingData?.social_links?.[0]?.twitter}`}
                      target="_blank"
                    >
                      <img
                        src={twitterIcon.src}
                        alt=""
                        style={{ width: "2.1875rem" }}
                      />
                    </Link>
                    <Link
                      href={`${landingData?.social_links?.[1]?.instagram}`}
                      target="_blank"
                    >
                      <InstagramIcon
                        fontSize="large"
                        className="text-dark mx-1"
                      />
                    </Link>
                  </div>
                </div> */}
              </div>
            </>
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
