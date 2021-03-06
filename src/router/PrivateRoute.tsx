import React from 'react';
import { Fragment } from 'react';
import { __RouterContext, RouteProps, Route } from 'react-router';
import { useSignIn, AuthState } from '../utils/firebase/Authentication';
import { APP_PATH } from './path';

const PrivateRoute = (props: RouteProps) => {
  // Incorrect
  const { history } = React.useContext(__RouterContext);
  const authState = useSignIn();

  React.useEffect(() => {
    if (authState === AuthState.SIGN_OUT) {
      history.replace(APP_PATH.ROOT);
    }
  }, [authState, history]);

  // Correct
  if (authState === AuthState.SIGN_IN) {
    return <Route {...props} />;
  }

  return <Fragment />;
};

export default PrivateRoute;
