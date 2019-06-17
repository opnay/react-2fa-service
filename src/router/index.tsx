import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import RootScreen from '../components/screen/Root';

const NotFound = (props: RouteComponentProps) => {
  return <div>404 Not Found</div>;
};

const AppRouter = (props: {}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={RootScreen} />
        <Route render={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(AppRouter);
