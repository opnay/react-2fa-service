import './styles.css';

import React from 'react';
import { Input, Button } from '../../../../atoms/Styled';

type Props = {
  onSubmit: (val: string) => void;
};

const TokenForm = (props: Props) => {
  const input = React.useRef<HTMLInputElement>() as React.RefObject<
    HTMLInputElement
  >;

  const onReset = React.useCallback(() => {
    if (input.current) {
      input.current.value = '';
    }
  }, []);
  const onSubmit = React.useCallback(() => {
    const { onSubmit: submit } = props;

    (async () => {
      // Submit
      if (input.current) {
        submit(input.current.value);
      }
    })().then(onReset);
  }, [input, onReset]);

  return (
    <div className={'token-form'}>
      <Input ref={input} />
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
