import './styles.css';

import React, { SyntheticEvent } from 'react';
import Card from '../../atoms/Card';
import { tokenListStorage } from '../../../utils/browser-support/LocalStorageManager';
import TokenInput from './components/TokenInput';
import TokenItem from './components/TokenItem';

const Main: React.FC = (props) => {
  const arrToken = JSON.parse(tokenListStorage.value || '[]') as Array<string>;
  const [input, setInput] = React.useState('');
  const [inputRef, setInputRef] = React.useState<HTMLInputElement | undefined>(
    undefined
  );
  const [tokens, setToken] = React.useState([] as Array<string>);

  React.useEffect(() => {
    setToken(arrToken);
  }, [...arrToken]);

  // Callback
  const onChange = React.useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setInputRef(e.currentTarget);
      setInput(e.currentTarget.value);
    },
    [setInput, setInputRef]
  );
  const onSubmit = React.useCallback(() => {
    if (input) {
      const arr = [...tokens, input];
      tokenListStorage.value = JSON.stringify(arr);
    }

    if (inputRef) {
      inputRef.value = '';
    }
  }, [tokens, input, inputRef]);
  const onReset = React.useCallback(() => {
    tokenListStorage.value = '[]';
    if (inputRef) {
      inputRef.value = '';
    }
  }, [inputRef]);

  // Render
  const renderTokens = React.useMemo(() => {
    return arrToken.map((it, idx) => <TokenItem key={'item-idx'} token={it} />);
  }, [...arrToken]);

  return (
    <div className='main'>
      <Card>
        <h1>Token List</h1>
        <div className='bottom-line'>{renderTokens}</div>
        <TokenInput onChange={onChange} />
        <button onClick={onSubmit}>확인</button>
        <button onClick={onReset}>리셋</button>
      </Card>
    </div>
  );
};

export default Main;
