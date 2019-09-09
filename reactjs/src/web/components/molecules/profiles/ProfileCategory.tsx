import React from 'react';
import { CATEGORY_KIND_GOOD } from '~/lib/category';
// import ProfileCategoryGood from '~/web/containers/ProfileCategoryGoodContainer';
import ProfileCategoryBad from '~/web/containers/ProfileCategoryBadContainer';

const ProfileCategory = (props: any) => {
  const { category, userShortId, loading } = props;

  return (
    <React.Fragment>
      {loading && null}
      {!loading &&
        (category.kind === CATEGORY_KIND_GOOD ? null : ( // <ProfileCategoryGood category={category} userShortId={userShortId} />
          <ProfileCategoryBad category={category} userShortId={userShortId} />
        ))}
    </React.Fragment>
  );
};

export default ProfileCategory;
