import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';

import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWOOPCard
} from './ChallengeObjectiveCard';
import Progress from '../../atoms/CircularProgress';
import NoStyledLink from '../../atoms/NoStyledLink';

const ChallengeObjective = (props: any) => {
  const { challenge, isMyProfile, objective, isLoaded, editPath } = props;

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [wish, setWish] = useState('');
  const [outcome, setOutcome] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (isLoaded && objective) {
      setWhat(objective.what ? objective.what : '');
      setWish(objective.wish ? objective.wish : '');
      setOutcome(objective.outcome ? objective.outcome : '');
      setObstacle(objective.obstacle ? objective.obstacle : '');
      setPlan(objective.plan ? objective.plan : '');
    } else {
      setWhat(initialWhat);
    }
  }, [initialWhat, isLoaded, objective]);

  const ChallengeObjectiveFormButton = (props: any) => {
    if (!isMyProfile) {
      return null;
    }

    return (
      <NoStyledLink to={editPath}>
        <Button variant="contained" style={{ fontWeight: 'bold' }}>
          編集
        </Button>
      </NoStyledLink>
    );
  };

  return (
    <React.Fragment>
      {!isLoaded && <Progress />}
      {isLoaded && (
        <React.Fragment>
          <div style={{ textAlign: 'right' }}>
            <ChallengeObjectiveFormButton />
          </div>
          <React.Fragment>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <ChallengeObjectiveWhatCard text={what} />
                  <ChallengeObjectiveWOOPCard
                    wish={wish}
                    outcome={outcome}
                    obstacle={obstacle}
                    plan={plan}
                  />
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;
