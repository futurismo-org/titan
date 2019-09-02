import React, { useState, useEffect } from 'react';
import { StreamApp, FlatFeed } from 'expo-activity-feed';
import { getToken, GETSTREAM_KEY, GETSTREAM_APP_ID } from '~/lib/getstream';
import Progress from '~/native/components/atoms/CircularProgress';
import ChallengeTimelineItem from '~/native/components/molecules/challenges/ChallengeTimelineItem';

const ChallengeTimeline = (props: any) => {
  const { challengeId } = props;
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken(challengeId).then((res: any) => setToken(res));
  }, [challengeId]);

  return (
    <React.Fragment>
      {token === '' && <Progress />}
      {token !== '' && (
        <StreamApp
          apiKey={GETSTREAM_KEY}
          appId={GETSTREAM_APP_ID}
          token={token}
          userId={challengeId}
          options={{ browser: true }} /* hack */
        >
          <FlatFeed Activity={ChallengeTimelineItem} options={{ limit: 100 }} />
        </StreamApp>
      )}
    </React.Fragment>
  );
};

export default ChallengeTimeline;
