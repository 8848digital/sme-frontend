import React from 'react';

const MultiStep = ({ currentStep, children }:any) => {
  const steps = React.Children.toArray(children);

  return (
    <div>
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div key={index} className={index === currentStep ? 'active' : ''} />
        ))}
      </div>
      {steps[currentStep]}
    </div>
  );
};

export default MultiStep;
