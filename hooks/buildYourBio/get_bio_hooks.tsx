import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import {
  bio_data_store,
  fetchBio,
} from "@/store/slices/buildYourBio_slice/bio_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchOurBio = () => {
  const dispatch = useDispatch();
  //getting data from bio store
  const bio = useSelector(bio_data_store);
  const [BioData, setBioData] = useState<any>([]);
  //getting token of login user
  const token = useSelector(get_access_token);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const bioData = {token , language_abbr}
  console.log('bio hooks',language_abbr)
  useEffect(() => {
    // fetching api of bio
    dispatch(fetchBio({token , language_abbr}) as any);
  }, [dispatch, token , language_selector_from_redux]);

  useEffect(() => {
    // storing data in state
    if (bio.data) {
      setBioData(bio?.data);
    }
  }, [bio]);

  return { bio: BioData, loading: bio?.loading };
};

export default useFetchOurBio;
