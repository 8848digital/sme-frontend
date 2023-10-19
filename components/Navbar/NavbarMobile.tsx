"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// import {
//     ClearToken,
//     get_access_token,
// } from "@/store/slices/auth_slice/login_slice";
// import LogoutList from "@/services/api/auth_api/logout_api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoImg from "../../public/assets/SG_logo.svg"
const NavbarMobile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSticky, setIsSticky] = useState(false);
    // const login = useSelector(get_access_token);
    // const loginCheck = login.user;
    // console.log("token login", login);
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
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         // isLoggedIn = localStorage.getItem("LoggedIn");
    //         setLoggedIn(loginCheck);
    //     }
    // }, [login]);
    // const handleLogOut = () => {
    //     LogoutList();
    //     dispatch(ClearToken());
    //     localStorage.removeItem("LoggedIn");
    //     console.log("Logged out");
    //     toast.success("Logout successful", {
    //         autoClose: 3000,
    //         className: "custom-toast", // Close the notification after 3 seconds
    //     });
    //     setTimeout(() => {
    //         router.push("/");
    //     }, 1000);
    //     console.log("logout called");
    // };

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
                        <nav className="navbar row site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
                            <div className="col-5">
                                <div className="brand-logo">
                                    <Link href="/">
                                        <img
                                            src={logoImg.src}
                                            alt=""
                                            width={120}
                                            height={100}
                                        />
                                    </Link>
                                </div>

                            </div>
                            <div className="col-7 text-end">
                                
                            <div className="navbar-nav-wrapper">
                                <ul className="navbar-nav main-menu align-items-center">
                                    <li className="nav-item">
                                        <Link className="nav-link p-0" href="/jobs">
                                            Bio
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link p-0" href="/jobs">
                                            Job request
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link p-0" href="/jobs">
                                            Contract
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link p-0" href="/jobs">
                                            Account
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {LoggedIn === "LoggedIn" ? (
                                            null
                                        ) : (

                                            <Link href="/login-page" legacyBehavior>
                                                <a className="btn p-0 btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                                                    Log in
                                                </a>
                                            </Link>
                                        )}
                                    </li>
                                    <li className="nav-item">
                                        {LoggedIn === "LoggedIn" ? (

                                            <div>
                                                {/* <div className="circle-40">
        <i className="fas fa-user-circle icon-size"></i>
    </div> */}
                                                <div>

                                                    <Link href="/profile" legacyBehavior>
                                                        <a
                                                            className=" p-0 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                                                            href="dashboard-main.html"
                                                        >
                                                            View Profile
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href="" legacyBehavior>
                                                        <a
                                                            // onClick={handleLogOut}
                                                            className="p-0 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                                                            href="#"
                                                        >
                                                            Log Out
                                                        </a>
                                                    </Link>
                                                </div>

                                            </div>


                                        ) : (
                                            <Link href="/signup-start" legacyBehavior>
                                                <a className="btn btn-signup text-uppercase font-size-3">
                                                    Sign up
                                                </a>
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>
                            </div>


                            {/* <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6">
                                {LoggedIn === "LoggedIn" ? (
                                    ""
                                ) : (

                                    <Link href="/login" legacyBehavior>
                                        <a className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                                            Log in
                                        </a>
                                    </Link>
                                )}
                                {LoggedIn === "LoggedIn" ? (

                                    <div>
                                       
                                        <div>

                                            <Link href="/profile" legacyBehavior>
                                                <a
                                                    className=" py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                                                    href="dashboard-main.html"
                                                >
                                                    View Profile
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link href="" legacyBehavior>
                                                <a
                                                    onClick={handleLogOut}
                                                    className=" py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                                                    href="#"
                                                >
                                                    Log Out
                                                </a>
                                            </Link>
                                        </div>

                                    </div>


                                ) : (
                                    <Link href="/register" legacyBehavior>
                                        <a className="btn btn-primary text-uppercase font-size-3">
                                            Sign up
                                        </a>
                                    </Link>
                                )}
                            </div> */}

                        </nav>
                    </div>
                </header>
            </div>
        </>
    );
};

export default NavbarMobile;
