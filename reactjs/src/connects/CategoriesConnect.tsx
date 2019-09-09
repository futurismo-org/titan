import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const items = state.firestore.ordered.categories;
  const categories =
    isLoaded(items) && items.filter((category: any) => !category.freezed);

  return {
    categories,
    ...props
  };
};

const queries = (props: any) => [
  {
    collection: 'categories',
    orderByKey: ['updatedAt', 'desc']
  }
];

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
