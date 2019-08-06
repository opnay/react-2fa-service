import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../context/FirebaseContext';

export enum AuthState {
  NONE,
  SIGN_IN,
  SIGN_OUT
}

export const isSignedIn = (): AuthState => {
  const FirebaseApp = useContext(FirebaseContext);
  const [state, setState] = useState(AuthState.NONE);

  useEffect(() => {
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setState(AuthState.SIGN_IN);
      } else {
        setState(AuthState.SIGN_OUT);
      }
    });
  });

  return state;
};
