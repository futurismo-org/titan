import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';

const ChallengeTimeline = (props: any) => {
  const { items, fetchTopics, topicsResourceId } = props;

  useEffect(() => {
    fetchTopics(topicsResourceId);
  }, [fetchTopics, topicsResourceId]);

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
