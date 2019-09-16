import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const userReviews = state.firestore.ordered.userReviews;
  return {
    ...props
  };
};

const queries = (props: any) => {
  const userShortId = props.match.params.id;

  const query = [
    {
      collection: 'reviews',
      doc: userShortId,
      storeAs: 'userReviews',
      subcollections: [
        {
          collection: 'reviews'
        }
      ]
    }
  ];

  return query;
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;