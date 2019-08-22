import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';

const ChallengeTimeline = (props: any) => {
  const {
    items,
    fetchTopics,
    topicsResourceId,
    fetchNotes,
    notesResourceId,
    participantsResourceId,
    fetchParticipants
  } = props;

  useEffect(() => {
    topicsResourceId && fetchTopics(topicsResourceId);
    notesResourceId && fetchNotes(notesResourceId);
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
    <Timeline lineColor="#ddd">
      {items &&
        items.map((item: any) => (
          <ChallengeTimelineItem
            key={item.id}
            type={item.type}
            data={item.data}
          />
        ))}
    </Timeline>
  );
};

export default ChallengeTimeline;
