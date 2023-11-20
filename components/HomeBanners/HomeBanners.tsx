import Image from 'next/image';


import { Home_banner } from '../../dataSets/Homebanner';
import WebHomeBanner from './WebHomeBanner';
import { useState, useEffect } from 'react';
import MobHomeBanner from './MobHomeBanner';
const HomeBanner = () => {



  // const myLoader = ({ src, width, quality }: any) => {
  //   return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  // };

  // console.log(Home_banner);
  // console.log('home banner loading', isLoading);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="margin_from_nav_l mt-5">
        {isMobile ? (
          <>
            <MobHomeBanner
            
              Home_banner={Home_banner}
            />
          </>
        ) : (
          <>
            <WebHomeBanner
           
              Home_banner={Home_banner}
            />
          </>
        )}
      </div>
    </>
  );
};
export default HomeBanner;
