import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CONSTANTS } from "@/services/config/api-config";

const settings = {
  dots: false,
  infinite: false,
  speed: 1000, // Adjust the speed (1 second = 1000ms)
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 1500,
};

const OurClients = ({ landingData }: any) => {
  return (
    <div className="container mb-3">
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
                      width="100px"
                    />
                  </a>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
