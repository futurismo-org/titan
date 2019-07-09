import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import moment from 'moment';

const formatDate = (date: string): string => {
  return moment(date).format('MM月DD日 HH:mm');
};

const ChallengeSchedule = (props: any) => {
  const { openedAt, closedAt } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    formatDate(openedAt.toString()),
    '',
    formatDate(closedAt.toString())
  ];

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
