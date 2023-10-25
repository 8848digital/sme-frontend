"use client";

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
import logoImg from "../../public/assets/SG_logo.svg"
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
  }, [router])
  const handleLogOut = () => {
    LogoutList();
    dispatch(ClearToken());
    localStorage.removeItem("LoggedIn");
    console.log("Logged out");
    toast.success("Logout successful", {
      autoClose: 3000,
      className: "custom-toast", // Close the notification after 3 seconds
    });
    setTimeout(() => {
      router.push("/");
    }, 1000);
    console.log("logout called");
  };

  return (
    <>
      <div
        className={`site-wrapper overflow-hidden ${isSticky ? "sticky" : ""}`}
      >
        <header
          className={`site-header site-header--menu-right ${isSticky ? "sticky" : ""
            } py-7 py-lg-0 site-header--absolute site-header--sticky`}
        >
          <div className="container">
            <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
              <div className="brand-logo">
                <Link href="/">
                  <img
                    src={logoImg.src}
                    alt=""
                    width={180}

                  />
                </Link>
              </div>
              <div className="collapse navbar-collapse">
                {
                  LoggedIn === "true" ? (
                    <div className="navbar-nav-wrapper">
                      <ul className="navbar-nav main-menu">
                        <li className="nav-item">
                          <Link className="nav-link p-0" href="/account-view">
                            Bio
                          </Link>
                        </li>
                        <li className="nav-item">
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
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ''
                  )
                }

              </div>
              <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6">
                {LoggedIn === "true" ? (
                  ''
                  // <Link href='' legacyBehavior>
                  // <a  onClick={handleLogOut} className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                  //   Log out
                  // </a>
                  // </Link>
                ) : (

                  <Link href="/login" legacyBehavior>
                    <a className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                      Log in
                    </a>
                  </Link>
                )}
                {LoggedIn === "true" ? (
                  <div>
                    <Link href='' legacyBehavior>
                      <a onClick={handleLogOut} className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                        Log out
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Link href='/signup-start' legacyBehavior>
                    <a className="btn btn-signup text-uppercase font-size-3">
                      Sign up
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
