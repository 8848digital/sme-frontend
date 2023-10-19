import { useRouter } from "next/router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";



const Layout = ({ children }: any) => {
  return (
    <>
    <Navbar/>
      <div className="main">
        {children}
      </div>
      <Footer/>
    </>
  );
};
export default Layout;