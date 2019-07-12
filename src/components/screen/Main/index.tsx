import './styles.css';
import IconPlusCircle from '../../../assets/icons/PlusCircle.svg';

import React, { Fragment } from 'react';
import TokenItem from './components/TokenItem';
import TokenForm from './components/TokenForm';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { Button } from '../../atoms/Styled';
import Modal from '../../atoms/Modal';
import { useToggle } from '../../../utils/react-support/Hook';
import Card from '../../atoms/Card';
import UserInfo from './components/UserInfo';
import { TokenType } from '../../../types/2fa-service/secret-token';

type TokenObject = Array<TokenType>;

const Main: React.FC = () => {
  const Firebase = React.useContext(FirebaseContext);
  const [visible, toggleVisisble] = useToggle();
  const onClickVisible = React.useCallback(() => toggleVisisble(), [
    toggleVisisble
  ]);

  // Token
  const [tokens, setTokens] = React.useState<TokenObject>([]);
  const collection = React.useMemo(
    () =>
      Firebase.firestore()
        .collection('2fa-service')
        .doc(Firebase.auth().currentUser!.uid)
        .collection('secrets'),
    [Firebase]
  );
  const loadTokens = React.useCallback(() => {
    collection.get().then((snapshot) => {
      const data: TokenObject = snapshot.docs.map(
        (it) => it.data() as TokenType
      );
      setTokens(data);
    });
  }, [collection]);
  React.useEffect(() => loadTokens(), []);

  // Callback
  const onSubmit = React.useCallback(
    (name: string, secret: string) => {
      if (!name || !secret) {
        throw new Error('Invalid argument');
      }

      // Create document data
      const data: { [x: string]: string } = {};
      data[name] = secret;

      // Double check data
      if (!data[name] || data[name] !== secret) {
        throw new Error('Build data failed');
      }

      return collection
        .doc(`${name}_a`)
        .set(data, { merge: true })
        .then(() => {
          // Call new Doc from firestore server
          return loadTokens();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [collection, loadTokens]
  );

  // Render
  const renderTokens = React.useMemo(
    () =>
      tokens.map((it: TokenType) => (
        <TokenItem key={'item-' + it.service} {...it} />
      )),
    [tokens]
  );

  return (
    <Fragment>
      <div className='content'>
        <UserInfo />
        <div className='list-content'>{renderTokens}</div>
      </div>
      <Button className='add-token' onClick={onClickVisible}>
        <img src={IconPlusCircle} alt='plus circle' />
      </Button>
      <Modal visible={visible}>
        <Card className='input-form'>
          <TokenForm onCancel={onClickVisible} onSubmit={onSubmit} />
        </Card>
      </Modal>
    </Fragment>
  );
};

export default Main;
