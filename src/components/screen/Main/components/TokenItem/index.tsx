import './styles.css';
import IconDelete from '../../../../../assets/icons/Delete.svg';

import React from 'react';
import Node2FA from 'node-2fa';
import { Button } from '../../../../atoms/Styled';
import { TokenType } from '../../../../../types/2fa-service/secret-token';
import CardModal from '../../../../atoms/CardModal/CardModal';
import { useToggle } from '../../../../../utils/react-support/Hook';
import TokenAlert from '../TokenDelete';

const INITIAL_TOKEN = 'XXX XXX';
const TIME_OUT = 30000; // 30s

type Props = TokenType;

const TokenItem = (props: Props) => {
  const { name, service, secret } = props;

  // Delete Modal
  const [visible, toggleVisible] = useToggle(false);
  const onClickDelete = React.useCallback(() => toggleVisible(), [
    toggleVisible
  ]);

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
      <Button className='delete' onClick={onClickDelete}>
        <img src={IconDelete} alt='delete' />
      </Button>
      <CardModal visible={visible}>
        <TokenAlert onCancel={onClickDelete} onDeleted={onClickDelete} />
      </CardModal>
    </div>
  );
};

export default TokenItem;
