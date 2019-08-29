import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';

import ChallengeTimelineItem from './ChallengeTimelineItem';
import { timelineBorderColor } from '~/lib/theme';
import Progress from '../../atoms/CircularProgress';

const ChallengeTimeline = (props: any) => {
  const { feedNotes } = props;

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      setLoading(true);
      feedNotes().then((notes: any) => {
        setItems(notes);
        setLoading(false);
      });
    }
  }, [feedNotes, items.length, loading]);

  return (
    <React.Fragment>
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
