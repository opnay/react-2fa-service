import { useContext, useState } from 'react';
import { FirebaseContext } from '../../context/FirebaseContext';
import { LoadingContext } from '../../context/LoadingContext';
import { useMount } from '../react-support/Hook';

export enum AuthState {
  NONE,
  SIGN_IN,
  SIGN_OUT
}

export const useSignIn = (): AuthState => {
  const { toggleLoading } = useContext(LoadingContext);
  const FirebaseApp = useContext(FirebaseContext);
  const [state, setState] = useState(AuthState.NONE);

  useMount(() => {
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
  });

  return state;
};
