import * as React from 'react';
import Title from '../atoms/Title';
import Progress from '../atoms/CircularProgress';
import CollectionCard from '../atoms/CollectionCard';

const Challenges = (props: any) => {
  const {
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    error,
    loading,
    fetchChallenges
  } = props;

  React.useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <Title text="開催中のチャレンジ" />
      {openingChallenges.map((challenge: any) => (
        <CollectionCard
          collection={challenge}
          typs="challenges"
          key={challenge.id}
        />
      ))}

      <Title text="開催中のチャレンジ" />
      {preOpenChallenges.map((challenge: any) => (
        <CollectionCard
          collection={challenge}
          type="challenges"
          key={challenge.id}
        />
      ))}
      <Title text="開催終了のチャレンジ" />
      {closedChallenges.map((challenge: any) => (
        <CollectionCard
          collection={challenge}
          type="challenges"
          key={challenge.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Challenges;
