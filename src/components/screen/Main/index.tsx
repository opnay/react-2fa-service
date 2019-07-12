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

type TokenObject = { [x: string]: string };

const Main: React.FC = () => {
  const Firebase = React.useContext(FirebaseContext);
  const [visible, toggleVisisble] = useToggle();
  const onClickVisible = React.useCallback(() => toggleVisisble(), [
    toggleVisisble
  ]);

  // Token
  const [tokenObj, setTokenObj] = React.useState<TokenObject>({});
  const doc = React.useMemo(() => {
    return Firebase.firestore()
      .collection('totp-secrets')
      .doc(Firebase.auth().currentUser!.uid);
  }, [Firebase]);

  // Callback
  const loadTokenObj = React.useCallback(() => {
    return doc.get().then((val) => {
      const data = val.data();
      if (data) {
        setTokenObj(data);
      }
    });
  }, [doc, setTokenObj]);

  React.useEffect(() => {
    loadTokenObj();
  }, []);

  const onSubmit = React.useCallback(
    (name: string, secret: string) => {
      if (!name || !secret) {
        throw new Error('Invalid argument');
      }

      if (!!tokenObj[name]) {
        throw new Error('Duplicated');
      }

      // Create document data
      const data: { [x: string]: string } = {};
      data[name] = secret;

      // Double check data
      if (!data[name] || data[name] !== secret) {
        throw new Error('Build data failed');
      }

      return doc
        .set(data, { merge: true })
        .then(() => {
          // Call new Doc from firestore server
          return loadTokenObj();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [doc, setTokenObj]
  );

  // Render
  const renderTokens = Object.keys(tokenObj).map((key) => (
    <TokenItem key={'item-' + key} token={[key, tokenObj[key]]} />
  ));

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
