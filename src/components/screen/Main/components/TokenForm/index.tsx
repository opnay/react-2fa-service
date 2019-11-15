import './styles.css';

import React from 'react';
import { Input, Button } from '../../../../atoms/Classed';

type Props = {
  onCancel: () => void;
  onSubmit: (service: string, name: string, secret: string) => void;
};

const TokenForm = (props: Props) => {
  const inputServiceName = React.useRef<HTMLInputElement>(null);
  const inputName = React.useRef<HTMLInputElement>(null);
  const inputSecret = React.useRef<HTMLInputElement>(null);

  const onCancel = React.useCallback(() => {
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
  }, [props]);

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
    })().then(onCancel);
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
        <Button className={'positive'} onClick={onSubmit}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default TokenForm;
