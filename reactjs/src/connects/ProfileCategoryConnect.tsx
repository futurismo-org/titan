import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileCategory } from '~/actions/profileAction';
import { fetchCategory } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory,
      fetchProfileCategory
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const categoryId = props.match.params.categoryId;

  const profileResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const categoryResourceId = `/categories/${categoryId}`;

  const profileCategory = state.profile.target;
  const category = state.category.target;

  const pageTitle = category
    ? `${profileCategory.userDisplayName}さんの記録`
    : '';

  const item =
    profileCategory &&
    category &&
    Object.assign(profileCategory, {
      title: category.title,
      description: category.description,
      pageTitle
    });

  return {
    category: item,
    loading: state.profile.loading || state.category.loading,
    error: state.profile.error || state.category.error,
    profileResourceId,
    categoryResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
