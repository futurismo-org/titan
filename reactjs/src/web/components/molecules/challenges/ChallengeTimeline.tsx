import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';

const ChallengeTimeline = (props: any) => {
  const {
    items,
    fetchTopics,
    topicsResourceId,
    fetchNotes,
    notesResourceId
  } = props;

  useEffect(() => {
    topicsResourceId && fetchTopics(topicsResourceId);
    notesResourceId && fetchNotes(notesResourceId);
  }, [fetchNotes, fetchTopics, notesResourceId, topicsResourceId]);

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
