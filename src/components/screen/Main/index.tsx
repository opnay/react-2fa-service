import './styles.css';

import React, { SyntheticEvent } from 'react';
import Card from '../../atoms/Card';
import { tokenListStorage } from '../../../utils/browser-support/LocalStorageManager';
import TokenItem from './components/TokenItem';
import { Input } from '../../atoms/Styled';

const Main: React.FC = (props) => {
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

  // Input ref
  const [inputRef, setInputRef] = React.useState<HTMLInputElement | undefined>(
    undefined
  );

  // Callback
  const onChange = React.useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setInputRef(e.currentTarget);
    },
    [setInputRef]
  );
  const onSubmit = React.useCallback(() => {
    if (!!inputRef && inputRef.value) {
      const arr = [...arrToken, inputRef.value];
      setToken(JSON.stringify(arr));
    }

    if (inputRef) {
      inputRef.value = '';
    }
  }, [!!inputRef, (inputRef || { value: '' }).value, token, arrToken]);
  const onReset = React.useCallback(() => {
    setToken('');
    if (inputRef) {
      inputRef.value = '';
    }
  }, [!!inputRef, (inputRef || { value: '' }).value]);

  // Render
  const renderTokens = arrToken.map((it, idx) => (
    <TokenItem key={'item-idx' + idx} token={it} />
  ));

  return (
    <div className='main'>
      <Card>
        <h1>Token List</h1>
        <div className='bottom-line'>{renderTokens}</div>
        <Input onChange={onChange} />
        <button onClick={onSubmit}>확인</button>
        <button onClick={onReset}>리셋</button>
      </Card>
    </div>
  );
};

export default Main;
