import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategory } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const categoryId = props.match.params.id;
  const resourceId = `/categories/${categoryId}`;

  const category = state.category.target;

  return {
    category,
    challenges: state.challenge.items,
    loading: state.category.loading || state.challenge.loading,
    error: state.category.error || state.challenge.error,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
