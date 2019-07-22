import * as React from 'react';
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
  const steps = [formatDate(openedAt), '', formatDate(closedAt)];
  const status = ['開催前', '開催中', '開催終了'];

  const now = moment(new Date());

  React.useEffect(() => {
    if (now.isBefore(moment(openedAt))) {
      setActiveStep(0);
    } else if (now.isBefore(moment(closedAt))) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  }, [closedAt, now, openedAt]);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {[0, 1, 2].map(n => {
        return (
          <Step key={n}>
            <StepLabel>
              {status[n]}
              <br />
              {steps[n]}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default ChallengeSchedule;
