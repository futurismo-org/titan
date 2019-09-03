import React from 'react';
import Fab from '@material-ui/core/Fab';
import NoStyledLink from '../NoStyledLink';

const ChallengeCategoryButton = (props: any) => {
  const { category, loading } = props;
  return (
    <React.Fragment>
      {loading && null}
      {!loading && category && (
        <NoStyledLink to={`/cat/${category.id}/dashboard`}>
          <Fab
            variant="extended"
            style={{ fontWeight: 'bold' }}
            color="primary"
          >
            {category.title}
          </Fab>
        </NoStyledLink>
      )}
    </React.Fragment>
  );
};

export default ChallengeCategoryButton;
