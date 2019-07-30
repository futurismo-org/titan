import React from 'react';

import Title from '../../../native/components/atoms/Title';
import DiscordHistories from '~/web/components/atoms/DiscordHistories';

const Announce = (props: any) => {
  return (
    <React.Fragment>
      <Title text="お知らせ" />
      <DiscordHistories channelId="591410583463526430" limit={30} />
    </React.Fragment>
  );
};

export default Announce;
