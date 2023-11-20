import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import BannerLoaderComponent from './BannerLoaderComponent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/landing_page.module.css";
const WebHomeBanner = ({ isLoading, homeBannerData, Home_banner }: any) => {
  const [LoggedIn, setLoggedIn] = useState<any>(false);
  const router = useRouter();
  // const { landingData, loading } = useLandingPage();
  const translationDataFromStore = useSelector(translation_text_from_Store);
  console.log(translationDataFromStore);
  // console.log(landingData);
  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);
  const landingData = {
      "heading_name1": "We are the trusted consulting partner for SMEs who want to achieve their growth goals",
      "short_description": "With our many years of experience, we have helped SMEs to grow, increase their profitability, and become more competitive",
      // "image": landingImg,
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
  return (
    <div>
      <>
        <Carousel interval={100000}>
          {Home_banner[0].web_banner?.map((banner: any, index: number) => {
            console.log(banner.img);
            return (
              <CarouselItem key={index} className="carousel-cont mt-2" style={{ position: 'relative' }}>
                <Link href={``} className="" style={{ display: 'block' }}>
                  <img
                    // className="d-block w-100 img-fluid"
                    src={`${banner?.img}`}
                    alt="Banner Images"
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="details-cont align-left" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'left', padding: '20px', color: 'white' }}>
                <div className="col-12">
                    <div className={`${styles.landing_details} text-center`}>
                      <h1 className='text-white'>{landingData.heading_name1}</h1>
                    </div>
                    <div className="short_desc text-center">
                      <h6 className="color">
                        {landingData?.short_description}
                      </h6>
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
                      <div
                        className="about_services"
                        style={{ fontSize: "16px", marginTop: "10px" }}
                      >
                        <Link
                          href="https://strategicgears.com/services/strategy-management"
                          className="text-white"
                          target="_blank"
                        >
                          {landingData?.link_label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </Carousel>
      </>
    </div>
  );
};

export default WebHomeBanner;
