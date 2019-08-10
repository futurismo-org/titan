import React, { useEffect } from 'react';
import Error from '../atoms/Error';
import MuteList from '../atoms/MuteList';

const Mutes = (props: any) => {
  const { mutes, loading, error, fetchMutes, myUserId } = props;

  useEffect(() => {
    fetchMutes(myUserId);
  }, [fetchMutes, myUserId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && mutes && <MuteList items={mutes} />}
    </React.Fragment>
  );
};

export default Mutes;
