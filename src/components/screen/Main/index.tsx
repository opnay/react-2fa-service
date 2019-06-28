import './styles.css';

import React from 'react';
import Card from '../../atoms/Card';
import { tokenListStorage } from '../../../utils/browser-support/LocalStorageManager';
import TokenItem from './components/TokenItem';
import TokenForm from './components/TokenForm';

const Main: React.FC = () => {
  // Token
  const [token, setTokenString] = React.useState(tokenListStorage.value);
  const setToken = React.useCallback(
    (val: string) => {
      setTokenString(val);
      tokenListStorage.value = val;
    },
    [token, setTokenString]
  );
  const arrToken: Array<string> = React.useMemo(
    () => JSON.parse(token || '[]'),
    [token]
  );

  // Callback
  const onSubmit = React.useCallback(
    (val: string) => {
      if (val) {
        const arr = [...arrToken, val];
        setToken(JSON.stringify(arr));
      }
    },
    [token, arrToken]
  );
  const onReset = React.useCallback(() => {
    setToken('');
  }, [setToken]);

  // Render
  const renderTokens = arrToken.map((it, idx) => (
    <TokenItem key={'item-idx' + idx} token={it} />
  ));

  return (
    <div className='main'>
      <Card>
        <h1>Token List</h1>
        <div className='bottom-line'>{renderTokens}</div>
        <TokenForm onSubmit={onSubmit} />
        <button onClick={onReset}>리셋</button>
      </Card>
    </div>
  );
};

export default Main;
