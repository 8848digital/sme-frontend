import { landing_data_from_Store, fetchLandingPage } from "@/store/slices/landing_page_slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useLandingPage = () => {
  const dispatch = useDispatch();
  const [landingData, setLandingData] = useState<any>(null);
  const LandingFromStore = useSelector(landing_data_from_Store);

  useEffect(() => {
    dispatch(fetchLandingPage() as any);
  }, [dispatch]);

  useEffect(() => {
    if (LandingFromStore.data && LandingFromStore.error === "") {
        setLandingData(LandingFromStore?.data);
    }
  }, [LandingFromStore]);

  return {landingData , loading :LandingFromStore?.loading};
};

export default useLandingPage;
