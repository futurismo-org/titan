import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import shortId from 'shortid';
import { postSubmission } from '~/lib/formcarry';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const reportUser = state.user.profile;

  const isLogin = !reportUser.isEmpty && reportUser.isLoaded;

  const handler = (data: any) => {
    const params = {
      id: shortId.generate(),
      reportUserName: reportUser.displayName,
      reportUserId: reportUser.id,
      reportUserShortId: reportUser.shortId,
      reportUserTwitterName: reportUser.twitterUserName,
      reportedAt: new Date(),
      ...data
    };
    return postSubmission(params);
  };

  return {
    handler,
    isLogin,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
