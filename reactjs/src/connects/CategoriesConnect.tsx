import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const items = state.firestore.data.categories;
  const categories =
    isLoaded(items) &&
    Object.values(items).filter((category: any) => !category.freezed);

  return {
    categories,
    ...props
  };
};

const mapFirestoreToState = (props: any) => [
  {
    collection: 'categories',
    orderBy: ['updatedAt', 'desc']
  }
];

export default compose(
  firestoreConnect(mapFirestoreToState),
  connect(mapStateToProps)
) as any;
