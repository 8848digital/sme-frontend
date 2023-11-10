import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";

const Footer = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p
                className="mb-0 text-white pt-2 pb-2"
                style={{ fontSize: "14px" }}
              >
                {translationDataFromStore?.data?.footer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
