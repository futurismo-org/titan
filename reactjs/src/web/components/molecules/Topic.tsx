import React, { useMemo, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fromNow } from '~/lib/moment';
import Progress from '../atoms/CircularProgress';

import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import MarkdownView from '../atoms/MarkdownView';

import NoStyledLink from '../atoms/NoStyledLink';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

import TwitterShareIcon from '../atoms/TwitterShareIcon';
import TopicFlag from '../atoms/TopicFlag';

import { deleteResource } from '~/lib/firebase';

const Topic = (props: any) => {
  const {
    topic,
    loading,
    error,
    resourceId,
    shareURL,
    editTopicPath,
    redirectPath,
    fetchTopic,
    setOgpInfo,
    resetOgpInfo,
    history,
    isCurrentUser
  } = props;

  const title = useMemo(() => {
    return topic ? topic.title : '';
  }, [topic]);
  const description = useMemo(() => {
    return topic ? topic.text : '';
  }, [topic]);
  const url = useMemo(() => {
    return shareURL;
  }, [shareURL]);

  useEffect(() => {
    fetchTopic(resourceId);

    setOgpInfo({
      title,
      description,
      url
    });

    return () => {
      resetOgpInfo();
    };
  }, [
    description,
    fetchTopic,
    resetOgpInfo,
    resourceId,
    setOgpInfo,
    title,
    url
  ]);

  const handleDelete = (redirectPath: string, resourceId: string) => {
    if (
      window.confirm('削除したデータは元に戻せません。本当に削除しますか？') // eslint-disable-line
    ) {
      deleteResource(resourceId).then(() => history.push(redirectPath));
    }
  };

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topic && (
        <React.Fragment>
          <Paper>
            <Typography component="span" variant="body2" color="textPrimary">
              Posted by {topic.userName || 'Anonymous'}
            </Typography>
            {'     '}
            {fromNow(topic.createdAt.toDate())}
            {topic.url ? (
              <NoStyledExternalLink href={topic.url} target="_blank">
                <Title text={topic.title} />
              </NoStyledExternalLink>
            ) : (
              <Title text={topic.title} />
            )}
            <TwitterShareIcon title={topic.title} url={shareURL} />
            {topic.url && (
              <a href={topic.url} rel="noopener noreferrer" target="_blank">
                {`${topic.url.substr(0, 30)}...`}
              </a>
            )}
            <p />
            <MarkdownView text={topic.text} />
            <div style={{ textAlign: 'right' }}>
              <TopicFlag />
            </div>
          </Paper>
          {isCurrentUser ? (
            <div style={{ textAlign: 'center' }}>
              <p />
              <NoStyledLink to={editTopicPath}>
                <Button type="button" color="default" variant="contained">
                  編集
                </Button>
              </NoStyledLink>
              <Button
                type="button"
                color="default"
                variant="contained"
                onClick={() => handleDelete(redirectPath, resourceId)}
              >
                削除
              </Button>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(Topic);
