import './styles.css';

import React from 'react';
import { Input, Button } from '../../../../atoms/Styled';

type Props = {
  onSubmit: (name: string, secret: string) => void;
};

const TokenForm = (props: Props) => {
  const inputName = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;
  const inputSecret = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;

  const onReset = React.useCallback(() => {
    if (inputName.current) {
      inputName.current.value = '';
    }

    if (inputSecret.current) {
      inputSecret.current.value = '';
    }
  }, [inputName, inputSecret]);

  const onSubmit = React.useCallback(() => {
    const { onSubmit: submit } = props;

    (async () => {
      // Submit
      if (inputName.current && inputSecret.current) {
        submit(inputName.current.value, inputSecret.current.value);
      }
    })().then(onReset);
  }, [inputName, inputSecret, onReset]);

  return (
    <div className={'token-form'}>
      <Input ref={inputName} placeholder='Service Name' />
      <Input ref={inputSecret} placeholder='Token' />
      <div className={'section-button'}>
        <Button className={'reset'} onClick={onReset}>
          취소
        </Button>
        <Button onClick={onSubmit}>확인</Button>
      </div>
    </div>
  );
};

export default TokenForm;
