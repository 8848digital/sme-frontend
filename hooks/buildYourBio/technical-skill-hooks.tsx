import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchTechnicalSkill,
  TechnicalSkill,
} from "@/store/slices/buildYourBio_slice/technical_skill_slice";
import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/language_slice";

const useFetchOurTechnicalSkills = () => {
  const dispatch = useDispatch();
  const technical = useSelector(TechnicalSkill);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [ourSkill, setOurSkill] = useState<any>([]);
  const [cLoading , setCustomLoading] = useState<boolean>(true)

  useEffect(() => {
    dispatch(fetchTechnicalSkill({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (technical?.loading === false ) 
    {
   
      setOurSkill(technical?.data);
    }
    
  }, [technical]);

  return { ourSkill, loading: technical?.loading , cLoading };
};

export default useFetchOurTechnicalSkills;
