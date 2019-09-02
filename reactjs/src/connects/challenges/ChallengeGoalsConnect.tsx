import { connect } from 'react-redux';
import { getChallengeObjectives } from '~/lib/getstream';

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.challengeId;

  const generateGoals = (data: any) => {
    return data.map((data: any) => ({
      id: data.userId,
      displayName: data.userDisplayName,
      photoURL: data.userPhotoURL,
      createdAt: data.createdAt,
      what: data.what
    }));
  };

  const feedGoals = () =>
    getChallengeObjectives(challengeId).then((data: any) =>
      generateGoals(data)
    );

  return {
    feedGoals,
    ...props
  };
};

export default connect(mapStateToProps);
