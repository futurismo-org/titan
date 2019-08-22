import * as React from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';

const ChallengeTimeline = (props: any) => {
  const { items } = props;

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
