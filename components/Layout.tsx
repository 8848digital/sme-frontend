import { useRouter } from "next/router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { language_selector } from "@/store/slices/language_slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children }: any) => {
  const language_selector_from_redux: any = useSelector(language_selector);
  useEffect(() => {
    
  }, [language_selector_from_redux]);
  return (
    <>
      {/* <div className="d-flex flex-column min-vh-100">
    
    </div> */}
      <Navbar />
      <div className="main">{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
