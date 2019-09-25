import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';

import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';
import Progress from '../../atoms/CircularProgress';
import NoStyledLink from '../../atoms/NoStyledLink';

const ChallengeObjective = (props: any) => {
  const { challenge, user, isMyProfile, objective, isLoaded, editPath } = props;

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [why, setWhy] = useState('');

  useEffect(() => {
    if (isLoaded) {
      setWhat(objective ? objective.what : initialWhat);
      setWhy(objective ? objective.why : '');
    } else {
      setWhat(initialWhat);
      setWhy('');
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
                  {!!why && (
                    <ChallengeObjectiveWhyCard text={why} user={user} />
                  )}
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
