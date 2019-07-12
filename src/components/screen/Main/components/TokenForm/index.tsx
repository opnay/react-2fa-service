import './styles.css';

import React from 'react';
import { Input, Button } from '../../../../atoms/Styled';

type Props = {
  onCancel: () => void;
  onSubmit: (service: string, name: string, secret: string) => void;
};

const TokenForm = (props: Props) => {
  const inputServiceName = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;
  const inputName = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;
  const inputSecret = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;

  const onReset = React.useCallback(() => {
    const { onCancel } = props;

    if (inputServiceName.current) {
      inputServiceName.current.value = '';
    }

    if (inputName.current) {
      inputName.current.value = '';
    }

    if (inputSecret.current) {
      inputSecret.current.value = '';
    }

    onCancel();
  }, [inputServiceName, inputName, inputSecret]);

  const onSubmit = React.useCallback(() => {
    const { onSubmit: submit } = props;

    (async () => {
      // Submit
      if (
        inputServiceName.current &&
        inputName.current &&
        inputSecret.current
      ) {
        submit(
          inputServiceName.current.value,
          inputName.current.value,
          inputSecret.current.value
        );
      }
    })().then(onReset);
  }, [inputName, inputSecret, onReset]);

  return (
    <div className={'token-form'}>
      <Input ref={inputServiceName} placeholder='Service Name' />
      <Input ref={inputName} placeholder='Service User Name' />
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
