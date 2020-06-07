import './styles.css';
import IconDelete from '../../../../../assets/icons/Delete.svg';

import React from 'react';
import Node2FA from 'node-2fa';
import { Button } from '../../../../atoms/Classed';
import { TokenType } from '../../../../../types/2fa-service/secret-token';
import { DialogContext } from '../../../../../context/DialogContext';
import {
  useSecretCollection,
  useMount,
} from '../../../../../utils/react-support/Hook';
import { DialogProps } from '../../../../molecule/Dialog';

const INITIAL_TOKEN = 'XXX XXX';
const TIME_OUT = 30000; // 30s

const catchDialog = (
  toggleDialog: (toggle: boolean, props?: DialogProps) => void
) => (err: any) => {
  toggleDialog(true, {
    message: '오류가 발생했습니다.',
    onCancel: () => toggleDialog(false),
    onPositive: () => toggleDialog(false),
  });
  console.error(err);

  // Block onPositive
  throw err;
};

type Props = TokenType & {
  loadSecrets: () => void;
};

const TokenItem = (props: Props) => {
  const { name, service, secret, loadSecrets } = props;
  const { toggleDialog } = React.useContext(DialogContext);

  // Delete Modal
  const secretCollection = useSecretCollection();
  const clickDelete = React.useCallback(() => {
    const onPositive = async () => {
      toggleDialog(false);

      // Find selected docs
      const { docs } = await secretCollection
        .where('service', '==', service)
        .where('name', '==', name)
        .where('secret', '==', secret)
        .get()
        .catch(catchDialog(toggleDialog));

      if (docs.length > 0) {
        for (const doc of docs) {
          await doc.ref.delete().catch(catchDialog(toggleDialog));
        }
      } else {
        catchDialog(toggleDialog)(new Error('Something long'));
      }

      // Reload Secrets
      loadSecrets();
    };

    toggleDialog(true, {
      className: 'alert',
      message: `${service}을(를) 삭제하시겠습니까?`,
      onCancel: () => toggleDialog(false),
      onPositive,
    });
  }, [toggleDialog, service, secretCollection, name, secret, loadSecrets]);

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
  useMount(() => generateToken());

  return (
    <div className='token-item'>
      <div className='title'>{service}</div>
      <div className='name'>{name}</div>
      <div className='token'>{token}</div>
      <Button className='delete' onClick={clickDelete}>
        <img src={IconDelete} alt='delete' />
      </Button>
    </div>
  );
};

export default TokenItem;
