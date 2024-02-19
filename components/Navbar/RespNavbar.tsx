import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

import useFetchOurHtmlLanguage from "@/hooks/general_hooks/language_hook";
import LogoutList from "@/services/api/auth_api/logout_api";
import { ClearToken } from "@/store/slices/auth_slice/login_slice";
import { clearBioData } from "@/store/slices/buildYourBio_slice/bio_slice";
import { setResetBuildBioData } from "@/store/slices/buildYourBio_slice/build_bio_slice";
import { resetFormData } from "@/store/slices/auth_slice/form_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoWithWhiteText from "../../public/assets/sg_logo.webp";
import logoWithBlackText from "../../public/assets/SG_logo.svg";
import styles from "@/styles/navbar.module.css";
import Image from "next/image";
import SignUpStartModal from "../SignUpModals/SignUpStartModal";
const RespNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false); 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])
  const [LoggedIn, setLoggedIn] = useState<any>(false);

  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);
  const handleLogOut = () => {
    LogoutList();
    dispatch(ClearToken());
    dispatch(resetFormData());
    dispatch(setResetBuildBioData());
    dispatch(clearBioData());
    localStorage.removeItem("LoggedIn");

    console.log("Logged out");
    toast.success(translationDataFromStore?.data?.toast_logout_success, {
      autoClose: 3000,
      className: "custom-toast", // Close the notification after 3 seconds
    });
    dispatch({ type: "Login/LogoutSuccess" });
    setTimeout(() => {
      router.push("/");
    }, 500);
    console.log("logout called");
  };

  // const { translationData, translationLoading } = useTranslationText();
  const { HandleLangToggle, language_selector_from_redux } =
    useFetchOurHtmlLanguage();
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  useEffect(() => {
    // Reset showOffcanvas when responsive view is exited
    const handleResize = () => {
      if (window.innerWidth >= 768 && showOffcanvas) {
        setShowOffcanvas(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showOffcanvas]);
  return (
    <div className="">
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className={`${styles.navbar_web} py-0 ${router.pathname !== '/' ? `${styles.nav_border_bottom}` : 'white'} ${scrolled ? styles.scrolled : ''}`}>
          <Container
            onClick={() => {
              if (showOffcanvas) {
                setShowOffcanvas(false);
              }
            }}
          >
            <div className="logo-img-div">
              <Navbar.Brand href="" className="cursor">
                <Link href='/' legacyBehavior>
                <Image
                  src={router.pathname === '/' ? (scrolled ? logoWithBlackText.src : logoWithWhiteText.src) : logoWithBlackText.src}
                  alt=""
                  width={122}
                  height={32}
                  className="img-fluid"
                />
                </Link>
              </Navbar.Brand>
            </div>
            <div>

            <Link
              href=""
              className={`text-center header-btn-devider language_cursor px-2 toggle-navbar`}
              onClick={HandleLangToggle}
            >
              <span className={` ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}>
                {!language_selector_from_redux?.languageToggle
                  ? "عربي"
                  : "English"}
              </span>
            </Link>
            </div>
            <div className="header-btns header-btn-devider d-md-none d-block">
              {LoggedIn === "true" ? (
                ""
              ) : (
                <div className="px-3 cursor">
                  <Link href="/login" legacyBehavior>
                    <span className={`${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}>
                      {translationDataFromStore?.data?.login}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {LoggedIn === "true" ? (
              <div className="d-md-none d-block">
                <Link href="" legacyBehavior>
                  <a
                    onClick={handleLogOut}
                    className={`btn ${styles.btn_signup} text-uppercase `}
                  >
                    {/* <LogoutIcon
                              style={{ color: "#00578a", fontSize: "18px" }}
                            />{" "} */}
                    <span className="text-white">
                      {translationDataFromStore?.data?.log_out}
                    </span>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="d-md-none d-block">

              <Link href="" legacyBehavior>
                <a
                  className={`btn ${styles.btn_signup} text-uppercase `}
                  onClick={() => setShowSignUpModal(true)}
                >
                  {translationDataFromStore?.data?.signup}
                </a>
              </Link>
              </div>
            )}
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(!showOffcanvas)}
              style={{ border: "none", fontSize: "15px" }}
              className="p-0"
            />
            <Navbar.Offcanvas
              show={showOffcanvas}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              onClick={() => setShowOffcanvas(false)}
              placement={`${language_selector_from_redux?.language_abbr === "ar"
                ? "end"
                : "start"
                }`}

                className={`${styles.offcanvas_dialog_bg}`}
            >
              <Offcanvas.Header closeButton className={`${styles.offcanvas_header}`}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Image
                    src={logoWithBlackText.src}
                    alt=""
                    width={122}
                    height={32}
                    className=""
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 align-items-center">
                  <div className="text-center ">
                    {LoggedIn === "true" ? (
                      <div className="navbar-nav-wrapper">
                        <ul className="navbar-nav main-menu p-0 d-flex align-items-center">
                          <li className="nav-item">
                            <Link
                              className={`nav-link px-3 white ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}
                              href="/account-view"
                            >
                              {translationDataFromStore?.data?.bio}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={`nav-link px-3 white ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}
                              href="/job-request"
                            >
                              {translationDataFromStore?.data?.job_request}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={`nav-link px-3 white ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}
                              href="/contract"
                            >
                              {translationDataFromStore?.data?.contract}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={`nav-link px-3 white ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}
                              href="/account"
                            >
                              {translationDataFromStore?.data?.account}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="d-sm-inline-flex align-items-center text-center">
                    <div className="px-3 cursor">
                      <Link href="/" legacyBehavior className="d-block ">
                        <span className={` ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}>
                          {translationDataFromStore?.data?.home_btn}
                        </span>
                      </Link>
                    </div>
                    <div className="px-3">
                      <div
                        className="form-switch fs-6 rtl-toggle-section"
                      >
                        <input
                          className="form-check-input cursor"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={language_selector_from_redux?.languageToggle}
                          onChange={(e: any) => {
                            HandleLangToggle(e);
                            showOffcanvas && setShowOffcanvas(true);
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    </div>
                    <div className="px-3">
                      <Link
                        href=""
                        className={`text-center header-btn-devider `}
                        onClick={(e: any) => {
                          HandleLangToggle(e);
                          e.stopPropagation();
                        }}
                      >
                        <span className={`${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}>
                          {!language_selector_from_redux?.languageToggle
                            ? "عربي"
                            : "English"}
                        </span>
                      </Link>
                    </div>
                    <div className="header-btns header-btn-devider">
                      {LoggedIn === "true" ? (
                        ""
                      ) : (
                        <div className="px-3 cursor">
                          <Link href="/login" legacyBehavior>
                            <span className={` ${router.pathname !== '/' ? 'black' : 'white'} ${scrolled ? 'black' : 'white'}`}>
                              {translationDataFromStore?.data?.login}
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {LoggedIn === "true" ? (
                      <div>
                        <Link href="" legacyBehavior>
                          <a
                            onClick={handleLogOut}
                            className={`btn ${styles.btn_signup} text-uppercase `}
                          >
                            {/* <LogoutIcon
                              style={{ color: "#00578a", fontSize: "18px" }}
                            />{" "} */}
                            <span className="text-white">
                              {translationDataFromStore?.data?.log_out}
                            </span>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <Link href="" legacyBehavior>
                        <a
                          className={`btn ${styles.btn_signup} text-uppercase `}
                          onClick={() => setShowSignUpModal(true)}
                        >
                          {translationDataFromStore?.data?.signup}
                        </a>
                      </Link>
                    )}
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <SignUpStartModal show={showSignUpModal} onHide={() => setShowSignUpModal(false)} /> 
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default RespNavbar;
