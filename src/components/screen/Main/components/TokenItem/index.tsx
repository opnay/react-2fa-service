import './styles.css';
import IconDelete from '../../../../../assets/icons/Delete.svg';

import React from 'react';
import Node2FA from 'node-2fa';
import { Button } from '../../../../atoms/Styled';
import { TokenType } from '../../../../../types/2fa-service/secret-token';

type Props = TokenType;

const TokenItem = (props: Props) => {
  const { name, service, secret } = props;

  // State of time
  const [time, setTime] = React.useState(new Date().getSeconds());
  const [tick, setTick] = React.useState(true);

  // Calculate TOTP
  const genToken = React.useMemo(() => {
    const { token } = Node2FA.generateToken(secret);

    if (!token) {
      return '';
    }

    return `${token.slice(0, 3)} ${token.slice(3, 6)}`;
  }, [secret, tick]);

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
      <div className='title'>{service}</div>
      <div className='name'>{name}</div>
      <div className='token'>{genToken}</div>
      <Button>
        <img src={IconDelete} alt='delete' />
      </Button>
    </div>
  );
};

export default TokenItem;
