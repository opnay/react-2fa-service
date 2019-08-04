import React from 'react';
import { Fragment } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
import { __RouterContext, RouteProps, Route } from 'react-router';

enum AuthState {
  NONE,
  SIGN_IN,
  SIGN_OUT
}

const PrivateRoute = (props: RouteProps) => {
  // Incorrect
  const FirebaseApp = React.useContext(FirebaseContext);
  const { history } = React.useContext(__RouterContext);
  const [isUser, setIsUser] = React.useState(AuthState.NONE);

  React.useEffect(() => {
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (!!user) {
        setIsUser(AuthState.SIGN_IN);
      } else {
        setIsUser(AuthState.SIGN_OUT);
        history.replace('/');
      }
    });
  }, []);

  // Correct
  if (isUser === AuthState.SIGN_IN) {
    return <Route {...props} />;
  }

  return <Fragment />;
};

export default PrivateRoute;
