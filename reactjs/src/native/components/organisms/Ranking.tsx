import * as React from 'react';

import { Text } from 'native-base';
import { fromNow } from '~/lib/moment';
import { getTwitterProfileURL } from '~/lib/url';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

// const ConditionalTableCell = (props: any) => (
//   <Hidden only="xs">
//     <TableCell>{props.children}</TableCell>
//   </Hidden>
// );

const Ranking = (props: any) => {
  const { users, error, loading, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // const LeaderBoardHead = () => (
  //   <TableHead>
  //     <TableRow>
  //       <TableCell>順位</TableCell>
  //       <TableCell />
  //       <TableCell>名前</TableCell>
  //       <ConditionalTableCell>最新</ConditionalTableCell>
  //       <ConditionalTableCell>登録</ConditionalTableCell>
  //     </TableRow>
  //   </TableHead>
  // );

  return (
    <React.Fragment>
      <Title text="ユーザランキング" />
      <Text>ランキング機能は準備中です...</Text>
      <Text>データが不十分なため、 アクティブユーザを順に表示しています。</Text>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {/* {users && (
        <Table>
          <LeaderBoardHead />
          <TableBody>
            {users.map((user: any, index: number) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {index + 1}位
                </TableCell>
                <TableCell>
                  <UserAvatar
                    photoURL={user.photoURL}
                    profileURL={getTwitterProfileURL(user.twitterUsername)}
                  />
                </TableCell>
                <TableCell>
                  <NoStyledExternalLink
                    href={getTwitterProfileURL(user.twitterUsername)}
                  >
                    {user.displayName || 'Annonymous'}
                  </NoStyledExternalLink>
                </TableCell>
                <ConditionalTableCell>
                  {fromNow(user.updatedAt.toDate())}
                </ConditionalTableCell>
                <ConditionalTableCell>
                  {fromNow(user.createdAt.toDate())}
                </ConditionalTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )} */}
    </React.Fragment>
  );
};

export default Ranking;
