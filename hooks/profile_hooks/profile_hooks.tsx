import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/root-reducer";
import {
  fetchProfile,
  profile_data_Store,
} from "@/store/slices/profile_slice/profile_slice"; // Adjust the import path as needed
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import GetProfileAPI from "@/services/api/profile_api/profile_api";

const useProfile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const profileFromStore = useSelector(profile_data_Store);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  const { languageToggle, language_abbr } = useSelector(language_selector);
  console.log("language_abbr", language_abbr);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProfile(token?.token) as any);
  }, [dispatch, token]);

  // useEffect(() => {
  //   if (profileFromStore.data) {
  //     setProfileData(profileFromStore?.data);
  //     setLoading(false);
  //   }
  // }, [profileFromStore]);

  useEffect(() => {
    if (profileFromStore.data) {
      // Set loading to false after 2000ms
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect re-runs
    }
  }, [profileFromStore]);

  const getProfileData = async () => {
    setLoading(true);
    const fetchProfileData: any = await GetProfileAPI(
      token?.token,
      language_abbr
    );

    // if (fetchProfileData?.msg === "success") {
    setProfileData(fetchProfileData);
    // } else {
    //   setProfileData([]);
    // }
  };

  useEffect(() => {
    getProfileData();
  }, [language_abbr]);

  useEffect(() => {
    getProfileData();
  }, []);

  return { profileData, loading };
};

export default useProfile;
