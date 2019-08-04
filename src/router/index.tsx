import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
  RouteProps,
  Redirect
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import RootScreen from '../components/screen/Root';
import { APP_PATH } from './path';
import Main from '../components/screen/Main';
import { __RouterContext } from 'react-router';
import PrivateRoute from './PrivateRoute';

const NotFound: React.FunctionComponent<RouteComponentProps> = () => (
  <div>404 Not Found</div>
);

const AppRouter: React.FunctionComponent<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path={APP_PATH.MAIN} component={Main} />

        {/* Base Route */}
        <Route exact path={APP_PATH.ROOT} component={RootScreen} />
        <Route render={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(AppRouter);
