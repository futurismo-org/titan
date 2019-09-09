import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const category = state.firestore.data.category;

  return {
    category,
    userShortId,
    loading: !isLoaded(category),
    ...props
  };
};

const queries = (props: any) => {
  const categoryId = props.match.params.categoryId;

  return [
    {
      collection: 'categories',
      doc: categoryId,
      storeAs: 'category'
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(queries)
) as any;
