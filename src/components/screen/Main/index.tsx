import './styles.css';
import IconPlusCircle from '../../../assets/icons/PlusCircle.svg';

import React, { Fragment } from 'react';
import TokenItem from './components/TokenItem';
import TokenForm from './components/TokenForm';
import { Button } from '../../atoms/Classed';
import {
  useToggle,
  useFirestoreSecret,
  useMount,
} from '../../../utils/react-support/Hook';
import UserInfo from './components/UserInfo';
import { TokenType } from '../../../types/2fa-service/secret-token';
import CardModal from '../../molecule/CardModal/CardModal';
import Progress from '../../atoms/Progress';

const TIME_OUT = 1000; // 1s

const Main: React.FC = () => {
  const [[percent, animated], setProgress] = React.useState([0, false]);
  const [visible, toggleVisisble] = useToggle();
  const clickToggle = React.useCallback(() => toggleVisisble(), [
    toggleVisisble,
  ]);

  // Token
  const [tokens, collection, loadTokens] = useFirestoreSecret();

  // Callback
  const submit = React.useCallback(
    async (service: string, name: string, secret: string) => {
      if (!service || !name || !secret) {
        throw new Error('Invalid argument');
      }

      // Create document data
      const data: TokenType = { name, service, secret };
      await collection
        .doc(`${service}_${name.split('@')[0]}`)
        .set(data, { merge: true });

      // Call new Doc from firestore server
      return loadTokens();
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

  useMount(() => updateTime());

  return (
    <Fragment>
      <div className='content'>
        <UserInfo />
        <Progress value={percent} animated={animated} />
        <div className='list-content'>
          {tokens.map((it) => (
            <TokenItem
              key={`${it.service}-${it.secret.slice(0, 8)}`}
              loadSecrets={loadTokens}
              {...it}
            />
          ))}
        </div>
      </div>
      <Button className='add-token' onClick={clickToggle}>
        <img src={IconPlusCircle} alt='plus circle' />
      </Button>
      {visible && (
        <CardModal visible className='input-form'>
          <TokenForm onCancel={clickToggle} onSubmit={submit} />
        </CardModal>
      )}
    </Fragment>
  );
};

export default Main;
