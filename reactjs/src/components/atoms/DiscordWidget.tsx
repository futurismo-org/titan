import React from 'react';
import DiscordHistories from './DiscordHistories';

import Paper from '../templates/PaperWrapper';
import Title from './Title';

const DiscordWidget = () => {
  return (
    <Paper>
      <Title text="Discordチャット" />
      <iframe
        title="discord-widget"
        src="https://discordapp.com/widget?id=587935450463993866&theme=light"
        width="100%"
        height="300"
        frameBorder="0"
      />
      <DiscordHistories />
    </Paper>
  );
};

export default DiscordWidget;
