import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

import useFetchOurHtmlLanguage from "@/hooks/general_hooks/language_hook";
import LogoutList from "@/services/api/auth_api/logout_api";
import { ClearToken } from "@/store/slices/auth_slice/login_slice";
import { clearBioData } from "@/store/slices/buildYourBio_slice/bio_slice";
import { setResetBuildBioData } from "@/store/slices/build_bio_slice";
import { resetFormData } from "@/store/slices/form_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoImg from "../../public/assets/SG_logo.svg";

const RespNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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

  return (
    <div className="">
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary py-0">
          <Container
            onClick={() => {
              showOffcanvas && setShowOffcanvas(false);
            }}
          >
            <div className="logo-img-div">
              <Navbar.Brand href="#" className="">
                <Link href="/">
                  <img src={logoImg.src} alt="" width='200px' className="" />
                </Link>
              </Navbar.Brand>
            </div>

            <Link
              href=""
              className={`text-center header-btn-devider language_cursor px-2 toggle-navbar`}
              onClick={HandleLangToggle}
            >
              <span style={{ color: "#00578a" }}>
                {!language_selector_from_redux?.languageToggle
                  ? "عربي"
                  : "English"}
              </span>
            </Link>
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
              placement={`${
                language_selector_from_redux?.language_abbr === "ar"
                  ? "end"
                  : "start"
              }`}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logoImg.src} alt="" className="w-75" />
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
                              className="nav-link px-3 py-md-4"
                              href="/account-view"
                            >
                              {translationDataFromStore?.data?.bio}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link px-3 py-md-4"
                              href="/job-request"
                            >
                              {translationDataFromStore?.data?.job_request}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link px-3 py-md-4"
                              href="/contract"
                            >
                              {translationDataFromStore?.data?.contract}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link px-3 py-md-4"
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
                    <Link href="/" legacyBehavior className="d-block ">
                      <a
                        className="btn text-uppercase "
                        style={{ padding: "0px 10px", minWidth: "auto" }}
                      >
                        <span style={{ color: "#00578a" }}>
                          {translationDataFromStore?.data?.home_btn}
                        </span>
                      </a>
                    </Link>
                    <div
                      className={` form-switch fs-6 rtl-toggle-section px-0 mx-2  `}
                    >
                      <input
                        className="form-check-input mx-2 language_cursor"
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
                    <Link
                      href=""
                      className={`text-center header-btn-devider language_cursor px-2`}
                      onClick={(e: any) => {
                        HandleLangToggle(e);
                        e.stopPropagation();
                      }}
                    >
                      <span style={{ color: "#00578a" }}>
                        {!language_selector_from_redux?.languageToggle
                          ? "عربي"
                          : "English"}
                      </span>
                    </Link>
                    <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6">
                      {LoggedIn === "true" ? (
                        ""
                      ) : (
                        <Link href="/login" legacyBehavior className="d-block">
                          <a className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                            <span style={{ color: "#00578a" }}>
                              {translationDataFromStore?.data?.login}
                            </span>
                          </a>
                        </Link>
                      )}
                    </div>

                    {LoggedIn === "true" ? (
                      <div>
                        <Link href="" legacyBehavior>
                          <a
                            onClick={handleLogOut}
                            className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                          >
                            <LogoutIcon
                              style={{ color: "#00578a", fontSize: "18px" }}
                            />{" "}
                            <span style={{ color: "#00578a" }}>
                              {translationDataFromStore?.data?.log_out}
                            </span>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <Link href="/signup-start" legacyBehavior>
                        <a
                          className="btn btn-signup text-uppercase "
                          style={{ fontSize: "13px" }}
                        >
                          {translationDataFromStore?.data?.signup}
                        </a>
                      </Link>
                    )}
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default RespNavbar;
