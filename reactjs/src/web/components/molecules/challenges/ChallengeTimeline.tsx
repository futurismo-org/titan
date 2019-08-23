import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';
import Error from '../../atoms/Error';
import { timelineBorderColor } from '~/lib/theme';
import Progress from '../../atoms/CircularProgress';
import { getBeforeDateFromNow } from '~/lib/moment';

const ChallengeTimeline = (props: any) => {
  const {
    items,
    fetchTopics,
    topicsResourceId,
    fetchNotes,
    notesResourceId,
    participantsResourceId,
    fetchParticipants,
    loading,
    error
  } = props;

  useEffect(() => {
    topicsResourceId && fetchTopics(topicsResourceId, getBeforeDateFromNow(7));
    notesResourceId && fetchNotes(notesResourceId, getBeforeDateFromNow(7));
    participantsResourceId && fetchParticipants(participantsResourceId);
  }, [
    fetchNotes,
    fetchParticipants,
    fetchTopics,
    notesResourceId,
    participantsResourceId,
    topicsResourceId
  ]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && items && (
        <React.Fragment>
          <p>過去１週間のデータを表示します。</p>
          <Timeline lineColor={timelineBorderColor}>
            {items &&
              items.map((item: any) => (
                <ChallengeTimelineItem
                  key={item.id}
                  type={item.type}
                  data={item.data}
                />
              ))}
          </Timeline>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeTimeline;
