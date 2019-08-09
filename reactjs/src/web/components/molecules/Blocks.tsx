import React, { useEffect } from 'react';
import Error from '../atoms/Error';
import SecurityList from '../atoms/SecurityList';

const Blocks = (props: any) => {
  const { blocks, loading, error, fetchBlocks, myUserId } = props;

  useEffect(() => {
    fetchBlocks(myUserId);
  }, [fetchBlocks, myUserId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && blocks && <SecurityList items={blocks} />}
    </React.Fragment>
  );
};

export default Blocks;
