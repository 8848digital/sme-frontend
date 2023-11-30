import { landing_data_from_Store, fetchLandingPage } from "@/store/slices/general_slice/landing_page_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useLandingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [landingData, setLandingData] = useState<any>(null);
  const LandingFromStore = useSelector(landing_data_from_Store);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  useEffect(() => {
    dispatch(fetchLandingPage({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);

  useEffect(() => {
    if (LandingFromStore.data && LandingFromStore.error === "") {
        setLandingData(LandingFromStore?.data);
    }
  }, [LandingFromStore]);

  return {landingData , loading :LandingFromStore?.loading};
};

export default useLandingPage;
