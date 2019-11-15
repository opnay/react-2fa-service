import './styles.css';
import IconPlusCircle from '../../../assets/icons/PlusCircle.svg';

import React, { Fragment } from 'react';
import TokenItem from './components/TokenItem';
import TokenForm from './components/TokenForm';
import { Button } from '../../atoms/Classed';
import {
  useToggle,
  useFirestoreSecret
} from '../../../utils/react-support/Hook';
import UserInfo from './components/UserInfo';
import { TokenType } from '../../../types/2fa-service/secret-token';
import CardModal from '../../molecule/CardModal/CardModal';
import Progress from '../../atoms/Progress';

const TIME_OUT = 1000; // 1s

const Main: React.FC = () => {
  const [[percent, animated], setProgress] = React.useState([0, false]);
  const [visible, toggleVisisble] = useToggle();
  const onClickVisible = React.useCallback(() => toggleVisisble(), [
    toggleVisisble
  ]);

  // Token
  const [tokens, collection, loadTokens] = useFirestoreSecret();

  // Callback
  const onSubmit = React.useCallback(
    (service: string, name: string, secret: string) => {
      if (!service || !name || !secret) {
        throw new Error('Invalid argument');
      }

      // Create document data
      const data: TokenType = { name, service, secret };
      return collection
        .doc(`${service}_${name.split('@')[0]}`)
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

  const updateTime = React.useCallback(() => {
    const time = new Date().getTime();
    // 0s ... 30s
    const per = (time % 30000) / 300;
    setProgress([per + 1, per >= 1]);

    // Each {TIME_OUT}s
    setTimeout(updateTime, TIME_OUT - (time % TIME_OUT));
  }, [setProgress]);

  React.useEffect(() => updateTime(), []);

  // Render
  const renderTokens = React.useMemo(
    () =>
      tokens.map((it: TokenType) => (
        <TokenItem
          key={`${it.service}-${it.secret.slice(0, 8)}`}
          loadSecrets={loadTokens}
          {...it}
        />
      )),
    [tokens]
  );

  return (
    <Fragment>
      <div className='content'>
        <UserInfo />
        <Progress value={percent} animated={animated} />
        <div className='list-content'>{renderTokens}</div>
      </div>
      <Button className='add-token' onClick={onClickVisible}>
        <img src={IconPlusCircle} alt='plus circle' />
      </Button>
      <CardModal visible={visible} className='input-form'>
        <TokenForm onCancel={onClickVisible} onSubmit={onSubmit} />
      </CardModal>
    </Fragment>
  );
};

export default Main;
