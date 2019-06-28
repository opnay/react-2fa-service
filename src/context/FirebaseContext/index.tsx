import * as Firebase from 'firebase/app';

import React, { Fragment } from 'react';

// Config
const config = Object.freeze(
  typeof process.env.FIREBASE === 'string'
    ? JSON.parse(process.env.FIREBASE!)
    : process.env.FIREBASE
);

// Create Firebase Context
type FirebaseType = Firebase.app.App;
export const FirebaseContext = React.createContext<FirebaseType>(
  Firebase.initializeApp(config)
);

// Firebase Context Provider
type Props = {
  children?: React.ReactNode;
};

export const FirebaseProvider = (props: Props) => {
  const { children } = props;

  // Bring FirebaseApp
  const FirebaseApp: Firebase.app.App = React.useMemo(() => Firebase.app(), []);

  // Render children when ready FirebaseApp
  const renderChildren = React.useMemo(() => {
    if (!FirebaseApp) {
      return <Fragment />;
    }
    return children;
  }, [FirebaseApp, children]);

  return (
    <FirebaseContext.Provider value={FirebaseApp}>
      {renderChildren}
    </FirebaseContext.Provider>
  );
};
