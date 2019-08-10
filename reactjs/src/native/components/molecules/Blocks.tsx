import React, { useEffect } from 'react';
import Error from '../atoms/Error';
import BlockList from '../atoms/BlockList';

const Blocks = (props: any) => {
  const { blocks, loading, error, fetchBlockedUsers, myUserId } = props;

  useEffect(() => {
    fetchBlockedUsers(myUserId);
  }, [fetchBlockedUsers, myUserId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && blocks && <BlockList items={blocks} />}
    </React.Fragment>
  );
};

export default Blocks;
