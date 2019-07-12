import firebase from 'firebase/app';

import { useState, useCallback, useContext, useMemo, useEffect } from 'react';
import { TokenType } from '../../types/2fa-service/secret-token';
import { FirebaseContext } from '../../context/FirebaseContext';

export type HookToggle = [boolean, (s?: boolean) => void];

export function useToggle(defaultState: boolean = false): HookToggle {
  const [state, setState] = useState(defaultState);
  const setToggle = useCallback(
    (toggleState: boolean = !state) => setState(toggleState),
    [state, setState]
  );
  return [state, setToggle];
}

export type HookFirestoreSecret = [
  SecretType,
  firebase.firestore.CollectionReference,
  () => void
];
export type SecretType = Array<TokenType>;

export function useFirestoreSecret(): HookFirestoreSecret {
  const Firebase = useContext(FirebaseContext);
  const [tokens, setTokens] = useState<SecretType>([]);

  // Get firestore collection
  const collection = useMemo(
    () =>
      Firebase.firestore()
        .collection('2fa-service')
        .doc(Firebase.auth().currentUser!.uid)
        .collection('secrets'),
    [Firebase]
  );

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
  useEffect(() => loadSecrets(), []);

  return [tokens, collection, loadSecrets];
}
