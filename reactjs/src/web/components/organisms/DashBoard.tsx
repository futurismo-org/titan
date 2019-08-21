import * as React from 'react';
import DashBoardPaper from 'web/components/molecules/DashBoardPaper';
import Progress from 'web/components/atoms/CircularProgress';

import { Typography, Switch } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import DiscordHistories from '../atoms/DiscordHistories';
import { primaryColor } from '~/lib/theme';
import Title from '../atoms/Title';
import MoreLink from '~/web/components/atoms/MoreLink';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    loading,
    error,
    fetchChallenges,
    fetchCategories,
    debugSensitive,
    showSensitive,
    hideSensitive,
    isLogin
  } = props;

  React.useEffect(() => {
    fetchChallenges(4);
    fetchCategories(4);
  }, [fetchCategories, fetchChallenges]);

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
      {challenges && (
        <DashBoardPaper
          title="オススメのチャレンジ"
          items={challenges}
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
      <Paper>
        <Title text="運営からのお知らせ" />
        <DiscordHistories channelId="591410583463526430" limit={6} />
        <MoreLink to="/info/announce" />
      </Paper>
    </React.Fragment>
  );
};

export default DashBoard;
