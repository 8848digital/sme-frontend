import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Image from "next/image";
import { useSelector } from "react-redux";
import logoWithWhiteText from "../../public/assets/sg_logo.webp";
import styles from "@/styles/footer.module.css"
const Footer = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={styles.footer_logo_wrapper}>
              <Image
                src={logoWithWhiteText.src}
                alt=""
                width={122}
                height={33}
                className=""
              />
              </div>
              
            </div>
            <div className="col-md-6">
              <div className={styles.footer_content_wrapper}>
              <p
                className="mb-0 white"
              >
                {translationDataFromStore?.data?.footer}
              </p>
              </div>
           
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
