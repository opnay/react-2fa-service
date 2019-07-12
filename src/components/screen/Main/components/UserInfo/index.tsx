import './styles.css';

import React from 'react';
import { FirebaseContext } from '../../../../../context/FirebaseContext';

type Props = {};

const UserInfo = (prop: Props) => {
  const FirebaseApp = React.useContext(FirebaseContext);

  const [userName, userProfile] = React.useMemo(() => {
    const current = FirebaseApp.auth().currentUser;
    if (!current) return ['None', undefined];

    return [current.displayName, current.photoURL];
  }, [FirebaseApp]);

  return (
    <div className='user-info'>
      <img className='profile' src={userProfile!} alt='profile' />
      <div className='name'>{userName}</div>
    </div>
  );
};

export default UserInfo;
