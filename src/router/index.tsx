import React from 'react';
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
import { FirebaseContext } from '../context/FirebaseContext';
import { APP_PATH } from './path';
import Main from '../components/screen/Main';

const PrivateRoute = (props: RouteProps) => {
  // Incorrect
  const FirebaseApp = React.useContext(FirebaseContext);

  if (!FirebaseApp.auth().currentUser) {
    return <Redirect to={APP_PATH.ROOT} />;
  }

  // Correct
  return <Route {...props} />;
};

const NotFound = (props: RouteComponentProps) => {
  return <div>404 Not Found</div>;
};

const AppRouter = (props: {}) => {
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
