import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchTechnicalSkill,
  TechnicalSkill,
} from "@/store/slices/buildYourBio_slice/technical_skill_slice";
import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";

const useFetchOurTechnicalSkills = () => {
  const dispatch = useDispatch();
  const technical = useSelector(TechnicalSkill);
  // console.log("@our technical from store", technical);
  const router = useRouter();
  const [ourSkill, setOurSkill] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchTechnicalSkill() as any);
  }, [router , dispatch]);

  useEffect(() => {
  
      setOurSkill(technical?.data);
    
  }, [technical]);

  return { ourSkill, loading: technical?.loading };
};

export default useFetchOurTechnicalSkills;
