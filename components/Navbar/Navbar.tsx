import { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import WebNavbar from "./WebNavbar";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import RespNavbar from "./RespNavbar";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { translationData, translationLoading } = useTranslationText();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* {isMobile ? <NavbarMobile /> : <WebNavbar />} */}
      <RespNavbar />
    </div>
  );
};

export default Navbar;
