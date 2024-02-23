import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";

const HorizontalLinearAlternativeLabelStepper: any = ({ activeStep }: any) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const lable1 = [
    {
      id: 0,
      key1: translationDataFromStore?.data?.bio_stepper_1_heading_1,
      key2: translationDataFromStore?.data?.bio_stepper_1_heading_2,
    },
    {
      id: 1,
      key1: translationDataFromStore?.data?.bio_stepper_2_heading_1,
      key2: translationDataFromStore?.data?.bio_stepper_2_heading_2,
    },
    {
      id: 2,
      key1: translationDataFromStore?.data?.bio_stepper_3_heading_1,
      key2: translationDataFromStore?.data?.bio_stepper_3_heading_2,
    },
    {
      id: 3,
      key1: translationDataFromStore?.data?.bio_stepper_4_heading_1,
      key2: translationDataFromStore?.data?.bio_stepper_4_heading_1,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {lable1.map((label) => (
          <Step key={label.key1}>
            <StepLabel>
              {!isMobile && <span className="black">{label.key1}</span>}
              <div
                className={`${
                  label.id === activeStep ? "sg_blue" : "text-secondary"
                }`}
              >
                {!isMobile && label.key2}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default HorizontalLinearAlternativeLabelStepper;
