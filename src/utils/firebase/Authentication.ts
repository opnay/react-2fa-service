import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../context/FirebaseContext';
import { LoadingContext } from '../../context/LoadingContext';

export enum AuthState {
  NONE,
  SIGN_IN,
  SIGN_OUT
}

export const isSignedIn = (): AuthState => {
  const { toggleLoading } = useContext(LoadingContext);
  const FirebaseApp = useContext(FirebaseContext);
  const [state, setState] = useState(AuthState.NONE);

  useEffect(() => {
    toggleLoading(true, '로그인 확인중...');
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setState(AuthState.SIGN_IN);
      } else {
        setState(AuthState.SIGN_OUT);
      }

      toggleLoading(false);
    });

    return () => toggleLoading(false);
  }, []);

  return state;
};
