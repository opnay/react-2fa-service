import './styles.css';
import IconDelete from '../../../../../assets/icons/Delete.svg';

import React from 'react';
import Node2FA from 'node-2fa';
import { Button } from '../../../../atoms/Styled';
import { TokenType } from '../../../../../types/2fa-service/secret-token';

const INITIAL_TOKEN = 'XXX XXX';
const TIME_OUT = 30000; // 30s

type Props = TokenType;

const TokenItem = (props: Props) => {
  const { name, service, secret } = props;

  const [token, _setToken] = React.useState(INITIAL_TOKEN);
  // setToken to make format as 'xxx xxx'
  const setToken = React.useCallback(
    (t: string) => {
      if (t.length !== 6) {
        _setToken('Invalid');
      }

      _setToken(`${t.slice(0, 3)} ${t.slice(3, 6)}`);
    },
    [_setToken]
  );

  // Infinite loop each TIME_OUT
  const generateToken = React.useCallback(() => {
    const result = Node2FA.generateToken(secret);
    const genToken = result.token || '';

    setToken(genToken);

    const curDate = new Date();
    setTimeout(generateToken, TIME_OUT - (curDate.getTime() % TIME_OUT));
  }, [secret, setToken]);

  // start infinite loop
  React.useEffect(() => generateToken(), []);

  return (
    <div className='token-item'>
      <div className='title'>{service}</div>
      <div className='name'>{name}</div>
      <div className='token'>{token}</div>
      <Button>
        <img src={IconDelete} alt='delete' />
      </Button>
    </div>
  );
};

export default TokenItem;
