import React from "react";
import thankyouImg from "../../public/assets/thankyou-1.png";
import thankyouImg1 from "../../public/assets/tv1.png";
import Link from "next/link";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";

const ThankYou = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store)


  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className=" card thank_you_wrapper text-center" style={{ maxWidth: '800px', height: '300px' }}>
            <div className="mb-5 pt-5">
              <img src={thankyouImg.src} alt="" width="120px" />
            </div>
            <div className="">
              <h2>
               {translationDataFromStore?.data?.thankyou_description}
              </h2>
            </div>
            <div>
              <Link href="/" className="btn btn-signup ">
                {translationDataFromStore?.data?.go_to_home_btn}
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
