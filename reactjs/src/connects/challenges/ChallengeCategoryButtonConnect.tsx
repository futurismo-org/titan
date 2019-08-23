import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { getCategoryId } from '~/lib/challenge';

const mapStateToProps = (state: any, props: any) => {
  const category = state.firestore.data.category;

  return {
    category,
    loading: !isLoaded(category),
    ...props
  };
};

const query = (props: any) => {
  const categoryId = getCategoryId(props.categoryRef);

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
  firestoreConnect(query)
) as any;
