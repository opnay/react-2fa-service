import firebase from 'firebase/app';

import React from 'react';
import { useState, useCallback, useContext, useMemo } from 'react';
import { TokenType } from '../../types/2fa-service/secret-token';
import { FirebaseContext } from '../../context/FirebaseContext';

export type HookToggle = [boolean, (s?: boolean) => void];

export function useToggle(defaultState = false): HookToggle {
  const [state, setState] = useState(defaultState);
  const setToggle = useCallback(
    (toggleState = !state) => setState(toggleState),
    [state, setState]
  );
  return [state, setToggle];
}

export function useSecretCollection() {
  const Firebase = useContext(FirebaseContext);

  return useMemo(() => {
    const auth = Firebase.auth();

    if (!auth.currentUser) {
      throw new Error('useSecretCollection: Use it after Sign-in');
    }

    return Firebase.firestore()
      .collection('2fa-service')
      .doc(auth.currentUser.uid)
      .collection('secrets');
  }, [Firebase]);
}

export type HookFirestoreSecret = [
  SecretType,
  firebase.firestore.CollectionReference,
  () => void
];
export type SecretType = TokenType[];

export function useFirestoreSecret(): HookFirestoreSecret {
  const [tokens, setTokens] = useState<SecretType>([]);

  // Get firestore collection
  const collection = useSecretCollection();

  // Load Secrets
  const loadSecrets = useCallback(() => {
    collection.get().then((snapshot) => {
      const data: SecretType = snapshot.docs.map(
        (it) => it.data() as TokenType
      );
      setTokens(data);
    });
  }, [collection]);

  // Initial Loading
  useMount(() => loadSecrets());

  return [tokens, collection, loadSecrets];
}

export const useMount = (callback: () => void) => React.useEffect(callback, []);
