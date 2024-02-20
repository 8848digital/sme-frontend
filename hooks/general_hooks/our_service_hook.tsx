import { landing_data_from_Store, fetchLandingPage } from "@/store/slices/general_slice/landing_page_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { fetchOurService, our_service_data_from_Store } from "@/store/slices/general_slice/our_service_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useOurService = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [serviceData, setServiceData] = useState<any>(null);
  const serviceFromStore = useSelector(our_service_data_from_Store);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  useEffect(() => {
    dispatch(fetchOurService({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);

  useEffect(() => {
    if (serviceFromStore.data && serviceFromStore.error === "") {
      setServiceData(serviceFromStore?.data);
    }
  }, [serviceFromStore]);

  return {serviceData , loadingService :serviceData?.loading};
};

export default useOurService;
