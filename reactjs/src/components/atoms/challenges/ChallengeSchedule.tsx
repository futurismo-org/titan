import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const ChallengeSchedule = (props: any) => {
  const { openedAt, closedAt } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [openedAt.toString(), '-', closedAt.toString()];

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ChallengeSchedule;
