import './styles.css';
import Lock from '../../../assets/icons/Lock.svg';

import * as firebase from 'firebase/app';

import React from 'react';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { __RouterContext } from 'react-router';
import { APP_PATH } from '../../../router/path';
import { Button } from '../../atoms/Styled';

type Props = {};

const RootScreen: React.FunctionComponent<Props> = () => {
  const { history } = React.useContext(__RouterContext);
  const FirebaseApp = React.useContext(FirebaseContext);

  // Get Google Auth Provider
  const GoogleAuthProvider = React.useMemo(() => {
    FirebaseApp.auth().languageCode = 'kr';
    return new firebase.auth.GoogleAuthProvider();
  }, [FirebaseApp]);

  // onClickGoogle Button
  const onClickGoogle = React.useCallback(() => {
    return FirebaseApp.auth()
      .signInWithPopup(GoogleAuthProvider)
      .then((val: firebase.auth.UserCredential) => {
        if (!val.credential) {
          throw new Error('Failed to Google Auth');
        }

        const token: firebase.auth.OAuthCredential = val.credential;
        history.push(APP_PATH.MAIN);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [FirebaseApp]);

  return (
    <div className='root'>
      <div className='background'>
        <img src={Lock} alt='Lock' />
      </div>
      <div className='content'>
        <h1>로그인</h1>
        <Button className='button' onClick={onClickGoogle}>
          Google SignIn
        </Button>
      </div>
    </div>
  );
};

export default RootScreen;
