import './styles.css';
import IconDelete from '../../../../../assets/icons/Delete.svg';

import React from 'react';
import Node2FA from 'node-2fa';
import { Button } from '../../../../atoms/Styled';

type Props = {
  token: [string, string];
};

const TokenItem = (props: Props) => {
  const { token } = props;
  const [name, tokenSecret] = token;

  // State of time
  const [time, setTime] = React.useState(new Date().getSeconds());
  const [tick, setTick] = React.useState(true);

  // Calculate TOTP
  const genToken = React.useMemo(() => {
    const { token } = Node2FA.generateToken(tokenSecret);

    if (!token) {
      return '';
    }

    return `${token.slice(0, 3)} ${token.slice(3, 6)}`;
  }, [tokenSecret, tick]);

  // Check time for each 30s
  const updateTime = React.useCallback(() => {
    const time = new Date().getSeconds();
    if (time === 0 || time === 30) {
      setTick(!tick);
    }
    setTime(time >= 30 ? time - 30 : time);
  }, [time, setTime, tick, setTick]);

  // setTime
  React.useEffect(() => {
    const curDate = new Date();
    const timeout = setTimeout(updateTime, 1000 - (curDate.getTime() % 1000));
    return () => clearInterval(timeout);
  }, [time, updateTime]);

  return (
    <div className='token-item'>
      <div className='title'>{name}</div>
      {/* TODO: Update name */}
      <div className='name'>aaaa@example.com</div>
      <div className='token'>{genToken}</div>
      <Button>
        <img src={IconDelete} alt='delete' />
      </Button>
    </div>
  );
};

export default TokenItem;
