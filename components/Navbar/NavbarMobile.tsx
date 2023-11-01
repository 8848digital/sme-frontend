"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import logoImg from "../../public/assets/SG_logo.svg"
import LogoutList from "@/services/api/auth_api/logout_api";
import { ClearToken, get_access_token } from "@/store/slices/auth_slice/login_slice";
import LogoutIcon from '@mui/icons-material/Logout';
import { resetFormData } from "@/store/slices/form_slice";
import { setResetBuildBioData } from "@/store/slices/build_bio_slice";
import { clearBioData } from "@/store/slices/buildYourBio_slice/bio_slice";
import { persistor } from "@/store/store";
const NavbarMobile = () => {
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
        },5);
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
                                    {
                                        LoggedIn === "true" ? (
                                            <>
                                                <ul className="navbar-nav main-menu align-items-center">
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
                                                    <Link href='' legacyBehavior>
                                                        <a onClick={handleLogOut} className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                                                        <LogoutIcon style={{color:'#00578a' , fontSize:'18px'}}/> <span style={{color:'#00578a'}}>Log out</span> 
                                                        </a>
                                                    </Link>

                                                </ul>
                                            </>
                                        ) : (<>
                                            <ul className="navbar-nav main-menu align-items-center">
                                                <li className="nav-item">
                                                    <Link href="/login" legacyBehavior>
                                                        <a className="btn p-0 btn-transparent text-uppercase font-size-3 heading-default-color focus-reset">
                                                            Log in
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/signup-start" legacyBehavior>
                                                        <a className="btn btn-signup text-uppercase font-size-3">
                                                            Sign up
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </>)
                                    }

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
