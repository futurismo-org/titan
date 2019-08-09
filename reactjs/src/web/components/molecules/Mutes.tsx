import React, { useEffect } from 'react';
import Error from '../atoms/Error';
import SecurityList from '../atoms/SecurityList';

const Mutes = (props: any) => {
  const { mutes, loading, error, fetchMutes, myUserId } = props;

  useEffect(() => {
    fetchMutes(myUserId);
  }, [fetchMutes, myUserId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && mutes && <SecurityList items={mutes} />}
    </React.Fragment>
  );
};

export default Mutes;
