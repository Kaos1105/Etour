import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import store from './app/store';
import Admin from './app/admin';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const App: React.FC = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path="/admin" component={Admin} history={history} />
          <Route path="/" render={() => <Redirect to="/admin" />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
