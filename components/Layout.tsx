import { useRouter } from "next/router";



const Layout = ({ children }: any) => {
  return (
    <>
    {/* <Navbar/> */}
      <div className="main">
        {children}
      </div>
      {/* <Footer/> */}
    </>
  );
};
export default Layout;