import useLandingPage from "@/hooks/general_hooks/landingpage_hook";
import { CONSTANTS } from "@/services/config/api-config";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/landing_page.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import LoaderForSkills from "../LoaderForSkills";
import landinImage from "../../public/assets/landing_image.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import tagLine from "../../public/assets/tag_line.png";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import Services from "./Services/Services";
import useOurService from "@/hooks/general_hooks/our_service_hook";
const LandingPage = () => {
  const [LoggedIn, setLoggedIn] = useState<any>(false);
  const router = useRouter();
  const { landingData, loading } = useLandingPage();
  const { serviceData, loadingService } = useOurService();
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

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className={`${styles.landing_wrapper}`}>
        <div className="d-block position-relative">
          <div className={`${styles.overlay}`}></div>
          <Image
            src={`${landingData?.image}`}
            alt="Banner Images"
            width={1920}
            height={isSmallScreen ? 595 : 840}
            objectFit="cover"
            quality={75} // Set the image quality to 75%
            loader={imageLoader} // Custom loader function
          />
        </div>
        <div className={` container `}>
          {!loading && landingData ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className={`row ${styles.landing_details_over_image}`}>
                    <div className="col-md-2">
                      {/* <h4 style={{ fontSize: "20px", fontWeight: "500" }}>
                        {landingData.sme_ascend}
                      </h4> */}
                    </div>
                    <div className="col-md-10">
                      <div data-aos="slide-up">
                        <div className={`${styles.landing_details} `}>
                          <h1>{landingData.heading_name1}</h1>
                        </div>
                      </div>
                      <div
                        className={` ${styles.get_started_btn_over_image}`}
                        data-aos="slide-up"
                      >
                        <div>
                          <button
                            className={`btn ${styles.explore_service_btn} `}
                            type="button"
                            onClick={() => {
                              window.open(
                                `${landingData?.url_for_link_label}`,
                                "_blank"
                              );
                            }}
                          >
                            {landingData.explore_services_label}
                          </button>
                        </div>
                        <div>
                          {LoggedIn === "true" ? (
                            ""
                          ) : (
                            <button
                              className={`btn ${styles.get_started_btn} `}
                              type="button"
                              onClick={() => {
                                router.push("/wizard-master");
                              }}
                            >
                              {landingData?.label_for_button}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className={`${styles.tag_line}`}>
                        <div>
                          <Image
                            src={tagLine.src}
                            alt="tag line logo"
                            width={isSmallScreen ? 48 : 72}
                            height={isSmallScreen ? 48 : 72}
                          />
                        </div>
                        <div className="ms-3">
                          <p className="mb-0">{landingData?.tag_line}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className={`${styles.featured_section}`}>
                    <div className="" data-aos="slide-up">
                      <div className="row">
                        {landingData.Benefits_in_working &&
                          landingData.Benefits_in_working.map(
                            (data: any, index: any) => {
                              return (
                                <>
                                  <div className="col-md-4 mt-2 d-flex align-items-center justify-content-center ">
                                    <div>
                                      <div className="featured_icon">
                                        <Image
                                          src={data.image}
                                          alt="Featured Image"
                                          width={48}
                                          height={48}
                                          loader={imageLoader}
                                        />
                                      </div>
                                      <div className={styles.featured_text}>
                                        <h1>
                                          <CountUp
                                            start={0}
                                            end={data.featured_total}
                                            duration={4}
                                            separator=","
                                            useEasing={true}
                                            useGrouping={true}
                                          />{" "}
                                          {/* + {
                                  translationDataFromStore?.data
                                    ?.landingPage_project
                                } */}
                                          + {data?.name1}
                                        </h1>
                                      </div>
                                      <div className="supporting_text">
                                        {/* <p>Strategic Gears: Elevating Your Vision, Transforming Challenges into Triumphs.</p> */}
                                        <p>{data?.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Services
                    serviceData={serviceData}
                    loadingService={loadingService}
                  />
                </div>
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
