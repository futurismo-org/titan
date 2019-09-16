import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Progress from '../atoms/CircularProgress';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import MarkdownView from '../atoms/MarkdownView';
import NoStyledLink from '../atoms/NoStyledLink';

import { remove } from '~/lib/firebase';

const Review = (props: any) => {
  const { userReview, loading, isCurrentUser, editReviewPath, history } = props;

  const handleDelete = (redirectPath: string, resourceId: string) => {
    if (
      window.confirm('削除したデータは元に戻せません。本当に削除しますか？') // eslint-disable-line
    ) {
      remove(resourceId).then(() => history.push(redirectPath));
    }
  };

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && userReview && (
        <React.Fragment>
          <Paper>
            <Title text={userReview.title} />
            <br />
            <MarkdownView text={userReview.text} />
          </Paper>
        </React.Fragment>
      )}
      {isCurrentUser ? (
        <div style={{ textAlign: 'center' }}>
          <p />
          <NoStyledLink to={editReviewPath}>
            <Button type="button" color="default" variant="contained">
              編集
            </Button>
          </NoStyledLink>
          <Button
            type="button"
            color="default"
            variant="contained"
            // onClick={() => handleDelete(redirectPath, resourceId)}
          >
            削除
          </Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(Review);
