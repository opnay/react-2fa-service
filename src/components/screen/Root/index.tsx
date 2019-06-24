import './styles.css';

import React from 'react';
import Card from '../../atoms/Card';
import { FirebaseContext } from '../../../context/FirebaseContext';
import firebase from 'firebase';
import { withRouter, RouteComponentProps } from 'react-router';
import { APP_PATH } from '../../../router/path';

type Props = RouteComponentProps;

const RootScreen = (props: Props) => {
  const { history } = props;
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
        console.log(token);
        history.push(APP_PATH.MAIN);
      })
      .catch(err => {
        console.error(err);
      });
  }, [FirebaseApp]);

  return (
    <div className='main'>
      <Card className='login'>
        <button className='button' onClick={onClickGoogle}>
          Google SignIn
        </button>
      </Card>
    </div>
  );
};

export default withRouter(RootScreen);
