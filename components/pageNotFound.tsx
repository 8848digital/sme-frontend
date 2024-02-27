import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/404page.module.css";
import { useSelector } from "react-redux";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";

const PageNotFound = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <>
      <div className={`container ${styles.page_wrapper}`}>
        <div className="row pt-3">
          <div className="col-12">
            <div className="text-center">
              <h3 className="notfound_heading text-capitalize fs-32 fw-500 lh-24">
                {/* Looking for something ?{" "} */}
                {translationDataFromStore?.data?.looking_for_something}
              </h3>
              <p className="notfound_p mt-4">
                {/* We&apos;re sorry. The Web address you entered is not a
                functioning page on our site. */}
                {translationDataFromStore?.data?.we_are_sorry}
              </p>
              <div className="d-flex justify-content-center pt-3">
                <div className="col-2">
                  <Link href="/" legacyBehavior>
                    <a className="btn btn_blue " type="button">
                      {/* Go Home */}
                      {translationDataFromStore?.data?.go_home}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
