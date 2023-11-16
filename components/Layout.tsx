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
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className=" flex-grow-1 flex-shrink-0 flex-basis-0">
              {children}
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};
export default Layout;
