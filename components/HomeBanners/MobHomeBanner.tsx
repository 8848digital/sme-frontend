import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import BannerLoaderComponent from './BannerLoaderComponent';
const MobHomeBanner = ({ isLoading, homeBannerData, Home_banner }: any) => {
  return (
    <div>
     
        <>
          <Carousel interval={100000}>
            {Home_banner[1].mob_banner?.map((banner: any, index: number) => {
              console.log(banner.img);
              return (
                <CarouselItem key={index} className="carousel-cont mt-md-5">
                  <Link href={``} className="">
                    <img
                      className="d-block w-100"
                      src={`${banner?.img}`}
                      alt="Banner Images"
                      width={1000}
                      height={700}
                    />

                    {/* <div className="details-cont align-top">
                      <h3 className="p-0">{banner.description}</h3>

                      <button className="btn testimonial-slide-primary-button">
                        Show Now
                      </button>
                    </div> */}
                  </Link>
                </CarouselItem>
              );
            })}
          </Carousel>
        </>
     
    </div>
  );
};

export default MobHomeBanner;
