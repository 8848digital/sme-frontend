import React, { useEffect, useState } from 'react';
import WebNavbar from './WebNavbar'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 992);
      };
  
      // Initial check
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div>
        {isMobile ? <NavbarMobile /> : <WebNavbar />}
      </div>
    );
}

export default Navbar
