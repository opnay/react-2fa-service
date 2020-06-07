import './styles.css';

import React from 'react';
import { Input, Button } from '../../../../atoms/Classed';

type Props = {
  onCancel: () => void;
  onSubmit: (service: string, name: string, secret: string) => void;
};

const TokenForm = (props: Props) => {
  const { onCancel } = props;
  const inputServiceName = React.useRef<HTMLInputElement>(null);
  const inputName = React.useRef<HTMLInputElement>(null);
  const inputSecret = React.useRef<HTMLInputElement>(null);

  const submit = React.useCallback(async () => {
    const { onSubmit: submit } = props;

    // Submit
    if (inputServiceName.current && inputName.current && inputSecret.current) {
      submit(
        inputServiceName.current.value,
        inputName.current.value,
        inputSecret.current.value
      );
    }

    onCancel();
  }, [onCancel, props]);

  return (
    <div className={'token-form'}>
      <h2 className={'header'}>추가</h2>
      <div className={'input-group'}>
        <Input ref={inputServiceName} placeholder='Service Name' />
        <Input ref={inputName} placeholder='Service User Name' />
        <Input ref={inputSecret} placeholder='Token' />
      </div>
      <div className={'button-group'}>
        <Button className={'negative'} onClick={onCancel}>
          취소
        </Button>
        <Button className={'positive'} onClick={submit}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default TokenForm;
