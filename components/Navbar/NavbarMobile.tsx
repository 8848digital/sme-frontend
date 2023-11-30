"use client";

import useFetchOurHtmlLanguage from "@/hooks/general_hooks/language_hook";
import LogoutList from "@/services/api/auth_api/logout_api";
import {
  ClearToken,
  get_access_token,
} from "@/store/slices/auth_slice/login_slice";
import { clearBioData } from "@/store/slices/buildYourBio_slice/bio_slice";
import { setResetBuildBioData } from "@/store/slices/buildYourBio_slice/build_bio_slice";
import { resetFormData } from "@/store/slices/auth_slice/form_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoImg from "../../public/assets/SG_logo.svg";
const NavbarMobile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const login = useSelector(get_access_token);
  const translationDataFromStore = useSelector(translation_text_from_Store);

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
    }, 5);
    console.log("logout called");
  };
  const { HandleLangToggle, language_selector_from_redux } =
    useFetchOurHtmlLanguage();

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
            <nav className="navbar row site-navbar offcanvas-active navbar-expand-lg p-0">
              <div className="col-5">
                <div className="brand-logo">
                  <Link href="/">
                    <img src={logoImg.src} alt="" width={120} height={100} />
                  </Link>
                </div>
              </div>
              <div className="col-7 text-end">
                <div className="text-center">
                  <div className="navbar-nav-wrapper">
                    <div
                      className={` form-switch fs-6 rtl-toggle-section  px-0 mx-2  `}
                    >
                      <input
                        className="form-check-input mx-2 language_cursor"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={language_selector_from_redux?.languageToggle}
                        onChange={HandleLangToggle}
                      />
                    </div>
                    <div className="text-center mb-1">
                      <Link
                        href=""
                        className={`col-md-1 text-center header-btn-devider language_cursor`}
                        onClick={HandleLangToggle}
                      >
                        <span style={{ color: "#00578a" }}>
                          {language_selector_from_redux?.languageToggle
                            ? "English"
                            : "عربي"}
                        </span>
                      </Link>
                    </div>
                  </div>
                  {LoggedIn === "true" ? (
                    <>
                      <ul className="navbar-nav main-menu align-items-center p-0 py-1">
                        <li className="nav-item">
                          <Link className="nav-link p-0" href="/account-view">
                            {translationDataFromStore?.data?.bio}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link p-0" href="/job-request">
                            {translationDataFromStore?.data?.job_request}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link p-0" href="/contract">
                            {translationDataFromStore?.data?.contract}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link p-0" href="/account">
                            {translationDataFromStore?.data?.account}
                          </Link>
                        </li>
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
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul className="navbar-nav main-menu align-items-center p-0 py-1">
                        <li className="nav-item">
                          <Link href="/login" legacyBehavior>
                            <a className="btn p-0 btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                              {translationDataFromStore?.data?.login}
                            </a>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/signup-start" legacyBehavior>
                            <a className="btn btn-signup text-uppercase font-size-3">
                              {translationDataFromStore?.data?.signup}
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavbarMobile;
