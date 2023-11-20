import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CONSTANTS } from "@/services/config/api-config";
import AOS from "aos";
import "aos/dist/aos.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 1000, // Adjust the speed (1 second = 1000ms)
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 1300,
};

const OurClients = ({ landingData }: any) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container mb-3">
      <div data-aos="slide-up">

        <div className="row">
          <div className="text-center">
            {/* <h2>Our Clients</h2> */}
            <Slider {...settings}>
              {landingData &&
                landingData.map((client: any, index: any) => (
                  <div key={index}>
                    <a
                      href={client.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${CONSTANTS.API_BASE_URL}${client.image}`}
                        alt={client.name}
                        className="img-fluid"
                        width="120px"
                      />
                    </a>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
