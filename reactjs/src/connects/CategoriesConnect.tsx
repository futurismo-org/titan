import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategories, resetCategoryInfo } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategories,
      resetCategoryInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  return {
    categories: state.category.items,
    loading: state.category.loading,
    error: state.category.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
