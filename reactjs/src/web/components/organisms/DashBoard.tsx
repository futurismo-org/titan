import * as React from 'react';
import DashBoardPaper from 'web/components/molecules/DashBoardPaper';
import Progress from 'web/components/atoms/CircularProgress';

import { Typography, Switch } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import DiscordHistories from '../atoms/DiscordHistories';
import { primaryColor } from '~/lib/theme';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    pinned,
    loading,
    error,
    fetchChallenges,
    fetchCategories,
    fetchPinnedChallenges,
    debugSensitive,
    showSensitive,
    hideSensitive,
    isLogin
  } = props;

  React.useEffect(() => {
    fetchChallenges(4);
    fetchCategories(4);
    fetchPinnedChallenges();
  }, [fetchCategories, fetchChallenges, fetchPinnedChallenges]);

  const onSensitiveChange = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      /* eslint-disable no-undef*/
      if (
        window.confirm(
          '未ログインのまま一時的にセンシティブなコンテンツを表示します。設定はブウウザを閉じるかリロードするまで有効です。'
        )
      ) {
        showSensitive();
      }
      /* eslint-enable */
    } else {
      hideSensitive();
    }
  };

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {!isLogin && (
        <Paper>
          <Typography component="h3" variant="subtitle1">
            センシティブなコンテンツをログインせずに表示する
          </Typography>
          <Switch
            checked={debugSensitive}
            onChange={onSensitiveChange}
            style={{ color: primaryColor }}
          />
        </Paper>
      )}
      {pinned && (
        <DashBoardPaper
          title="オススメのチャレンジ"
          items={pinned}
          type="challenge"
        />
      )}
      {categories && (
        <DashBoardPaper
          title="人気のカテゴリ"
          items={categories}
          type="category"
        />
      )}
      {challenges && (
        <DashBoardPaper
          title="人気のチャレンジ"
          items={challenges}
          type="challenge"
        />
      )}
      <DiscordHistories channelId="591410583463526430" limit={4} />
    </React.Fragment>
  );
};

export default DashBoard;
