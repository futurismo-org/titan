import * as React from 'react';

const Error = (props: any) => {
  const { error } = props;
  return <strong>Error: {error}</strong>;
};

export default Error;
