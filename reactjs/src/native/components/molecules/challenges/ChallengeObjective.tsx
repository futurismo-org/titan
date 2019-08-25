import React, { useState, useEffect } from 'react';

const ChallengeObjective = (props: any) => {
  const {
    challenge,
    user,
    isMyProfile,
    handleSave,
    loading,
    objective,
    resourceId,
    fetchObjective
  } = props;

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [why, setWhy] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!objective || user.shortId !== objective.userShortId) {
      fetchObjective(resourceId);
    } else {
      setWhat(objective.what ? objective.what : initialWhat);
      setWhy(objective.why ? objective.why : '');
    }
  }, [fetchObjective, initialWhat, objective, resourceId, user.shortId]);

  const onWhatChange = (e: any) => {
    e.preventDefault();
    setWhat(e.target.value);
  };

  const onWhyChange = (e: any) => {
    e.preventDefault();
    setWhy(e.target.value);
  };

  return null;
};

export default ChallengeObjective;
