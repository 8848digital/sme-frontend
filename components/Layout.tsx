import { useRouter } from "next/router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";

const Layout = ({ children }: any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    typeof window !== "undefined" && setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <Navbar />
          <div className="main">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Layout;
