import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const lable1 = [
  { id: 0, key1: "Upload photo", key2: "Your profile picture" },
  { id: 1, key1: "Your bio", key2: "Website and location" },
  { id: 2, key1: "Technical skills and language", key2: "Start collaborating" },
  { id: 3, key1: "certifications", key2: "Certifications" },
];

const HorizontalLinearAlternativeLabelStepper: any = ({ activeStep }: any) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {lable1.map((label) => (
          <Step key={label.key1}>
            <StepLabel>
              <span className="black">{label.key1}</span>
              <div
                className={`${
                  label.id === activeStep ? "sg_blue" : "text-secondary"
                }`}
              >
                {label.key2}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default HorizontalLinearAlternativeLabelStepper;
