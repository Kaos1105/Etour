import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import AdminLayout from './layout';

export const Admin: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact={true}
        path={`${path}`}
        render={() => <Redirect to={`${path}/dashboard`} />}
      />
      <Route path={`${path}`} component={AdminLayout} history={history} />
    </Switch>
  );
};

export default Admin;
