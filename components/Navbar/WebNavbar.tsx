import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClearToken,
  get_access_token,
} from "@/store/slices/auth_slice/login_slice";
import LogoutList from "@/services/api/auth_api/logout_api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoImg from "../../public/assets/SG_logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { resetFormData } from "@/store/slices/form_slice";
import { setResetBuildBioData } from "@/store/slices/build_bio_slice";
import { clearBioData } from "@/store/slices/buildYourBio_slice/bio_slice";
import { persistor } from "@/store/store";
import useFetchOurHtmlLanguage from "@/hooks/general_hooks/language_hook";
import { navbarData } from "@/datasets/navbar";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
const WebNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const login = useSelector(get_access_token);

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
    toast.success("Logout successful", {
      autoClose: 3000,
      className: "custom-toast", // Close the notification after 3 seconds
    });
    dispatch({ type: "Login/LogoutSuccess" });
    setTimeout(() => {
      router.push("/");
    }, 500);
    console.log("logout called");
  };

  const { HandleLangToggle, language_selector_from_redux } =
    useFetchOurHtmlLanguage();
  const { translationData, translationLoading } = useTranslationText();
  return (
    <>
      <div
        className={`site-wrapper overflow-hidden ${isSticky ? "sticky" : ""}`}
      >
        <header
          className={`site-header site-header--menu-right ${
            isSticky ? "sticky" : ""
          } py-7 py-lg-0 site-header--absolute site-header--sticky`}
        >
          <div className="container">
            <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
              <div className="brand-logo">
                <Link href="/">
                  <img src={logoImg.src} alt="" width={180} />
                </Link>
              </div>
              <div className="collapse navbar-collapse">
                {LoggedIn === "true" ? (
                  <div className="navbar-nav-wrapper">
                    <ul className="navbar-nav main-menu">
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/account-view">
                          {translationData?.bio}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/job-request">
                          {translationData?.job_request}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/contract">
                          {translationData?.contract}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/account">
                          {translationData?.account}
                        </Link>
                      </li>

                      {/* <li className="nav-item">
                        <Link className="nav-link p-0" href="/job-request">
                          Job request
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/contract">
                          Contract
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link p-0" href="/account">
                          Account
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Link href="/" legacyBehavior className="d-block ">
                <a
                  className="btn text-uppercase "
                  style={{ padding: "0px 10px", minWidth: "auto" }}
                >
                  <span style={{ color: "#00578a" }}>
                    {translationData?.home_btn}
                  </span>
                </a>
              </Link>
              <div
                className={` form-switch fs-6 rtl-toggle-section d-flex justify-content-center px-0 mx-2  `}
              >
                <input
                  className="form-check-input mx-2 language_cursor"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={!language_selector_from_redux?.languageToggle}
                  onChange={HandleLangToggle}
                />
              </div>
              <Link
                href=""
                className={`col-md-1 text-center header-btn-devider language_cursor`}
                onClick={HandleLangToggle}
              >
                <span style={{ color: "#00578a" }}>
                  {language_selector_from_redux?.languageToggle
                    ? "عربي"
                    : "English"}
                </span>
              </Link>
              <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6">
                {LoggedIn === "true" ? (
                  ""
                ) : (
                  // <Link href='' legacyBehavior>
                  // <a  onClick={handleLogOut} className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                  //   Log out
                  // </a>
                  // </Link>
                  <Link href="/login" legacyBehavior className="d-block">
                    <a
                      className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                      style={{ padding: "35px 0 33px 0" }}
                    >
                      <span style={{ color: "#00578a" }}>
                        {translationData?.login}
                      </span>
                    </a>
                  </Link>
                )}
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
                          {translationData?.log_out}
                        </span>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Link href="/signup-start" legacyBehavior>
                    <a className="btn btn-signup text-uppercase font-size-3">
                      {translationData?.signup}
                    </a>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default WebNavbar;
