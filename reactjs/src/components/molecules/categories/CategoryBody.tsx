import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CategoryDashBoard from './CategoryDashBoard';

const CategoryBody = (props: any) => {
  const { category } = props;

  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/categories/:id/dashboard"
          render={() => <CategoryDashBoard category={category} />}
        />
      </Switch>
    </React.Fragment>
  );
};

export default CategoryBody;
