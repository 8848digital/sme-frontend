import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchTechnicalSkill,
  TechnicalSkill,
} from "@/store/slices/account_slice/technical_skill_slice";
import { RootState } from "@/store/root-reducer";

const useFetchOurTechnicalSkills = () => {
  const dispatch = useDispatch();
  const technical = useSelector(TechnicalSkill);
  console.log("@our technical from store", technical);

  const [ourSkill, setOurSkill] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchTechnicalSkill() as any);
  }, [dispatch]);

  useEffect(() => {
    setOurSkill(technical?.data);
  }, [technical]);

  return { technical, ourSkill };
};

export default useFetchOurTechnicalSkills;
