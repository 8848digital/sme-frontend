import { eudcation_level_from_store, fetchEducationLevel } from "@/store/slices/auth_slice/education_level_slice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEducationLevel = () => {
  const dispatch = useDispatch();
  const educationLevelStore = useSelector(eudcation_level_from_store);
  //   console.log("@our technical from store", language);

  const [educationLevel, setEducationLevel] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchEducationLevel() as any);
  }, [dispatch]);

  useEffect(() => {
    if (educationLevelStore.data) {
      setEducationLevel(educationLevelStore?.data);
    }
  }, [educationLevel]);

  return { educationLevel, loading:educationLevelStore?.loading };
};

export default useEducationLevel;
