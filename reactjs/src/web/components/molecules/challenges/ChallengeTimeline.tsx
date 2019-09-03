import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';
import { timelineBorderColor } from '~/lib/theme';
import Progress from '../../atoms/CircularProgress';

const ChallengeTimeline = (props: any) => {
  const { feedItems } = props;

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      setLoading(true);
      feedItems().then((res: any) => {
        setItems(res);
        setLoading(false);
      });
    }
  }, [feedItems, items.length, loading]);

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && items && (
        <React.Fragment>
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
