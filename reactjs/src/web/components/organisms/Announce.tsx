import React from 'react';

import Title from '../atoms/Title';
import DiscordHistories from '~/web/components/atoms/DiscordHistories';
import Paper from '../templates/PaperWrapper';

const Announce = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="お知らせ" />
        <DiscordHistories channelId="591410583463526430" limit={30} />
      </Paper>
    </React.Fragment>
  );
};

export default Announce;
