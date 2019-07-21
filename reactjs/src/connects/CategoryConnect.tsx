import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategory } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory: fetchCategory
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  return {
    category: state.category.target,
    loading: state.category.loading,
    error: state.category.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
