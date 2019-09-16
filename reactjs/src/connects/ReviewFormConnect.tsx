import { connect } from 'react-redux';
import shortid from 'shortid';

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const redirectPath = `/u/${userShortId}/reviews`;

  return {
    redirectPath,
    ...props
  };
};

export default connect(mapStateToProps);
