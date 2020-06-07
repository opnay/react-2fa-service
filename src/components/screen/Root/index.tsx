import './styles.css';
import Lock from '../../../assets/icons/Lock.svg';

import * as firebase from 'firebase/app';

import React from 'react';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { __RouterContext } from 'react-router';
import { APP_PATH } from '../../../router/path';
import { Button } from '../../atoms/Classed';
import { useSignIn, AuthState } from '../../../utils/firebase/Authentication';

type Props = {};

const RootScreen: React.FunctionComponent<Props> = () => {
  const { history } = React.useContext(__RouterContext);
  const FirebaseApp = React.useContext(FirebaseContext);
  const authState = useSignIn();

  // Get Google Auth Provider
  const GoogleAuthProvider = React.useMemo(() => {
    FirebaseApp.auth().languageCode = 'kr';
    FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return new firebase.auth.GoogleAuthProvider();
  }, [FirebaseApp]);

  // onClickGoogle Button
  const clickGoogle = React.useCallback(async () => {
    const user = await FirebaseApp.auth().signInWithPopup(GoogleAuthProvider);

    if (!user.credential) {
      throw new Error('Failed to Google Auth');
    }
  }, [FirebaseApp, GoogleAuthProvider]);

  React.useEffect(() => {
    // Already Signed In
    if (authState === AuthState.SIGN_IN) {
      history.replace(APP_PATH.MAIN);
    }
  }, [authState, history]);

  return (
    <div className='root'>
      <div className='background'>
        <img src={Lock} alt='Lock' />
      </div>
      <div className='content'>
        <h1>로그인</h1>
        <Button className='button' onClick={clickGoogle}>
          Google SignIn
        </Button>
      </div>
    </div>
  );
};

export default RootScreen;
