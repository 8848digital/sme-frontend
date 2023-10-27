import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchTechnicalSkill,
  TechnicalSkill,
} from "@/store/slices/buildYourBio_slice/technical_skill_slice";
import { RootState } from "@/store/root-reducer";

const useFetchOurTechnicalSkills = () => {
  const dispatch = useDispatch();
  const technical = useSelector(TechnicalSkill);
  // console.log("@our technical from store", technical);

  const [ourSkill, setOurSkill] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchTechnicalSkill() as any);
  }, [dispatch]);

  useEffect(() => {
    if (technical?.loading) {
      setOurSkill(technical?.data);
    }
  }, [technical]);

  return { ourSkill, loading: technical?.loading };
};

export default useFetchOurTechnicalSkills;
