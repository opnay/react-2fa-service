import './styles.css';

import React from 'react';
import { Button, ClassedRef } from '../../atoms/Classed';

const BaseDialog = ClassedRef('div', 'dialog');

export type DialogProps = {
  className?: string;

  message: string;
  textCancel?: string;
  textPositive?: string;

  onCancel?: () => void | Promise<any>;
  onPositive?: () => void | Promise<any>;
};

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
  const {
    className,
    message,
    textCancel,
    textPositive,
    onCancel,
    onPositive
  } = props;

  return (
    <BaseDialog className={className}>
      <div className='message'>{message}</div>
      <div className='button-group'>
        <Button className='negative' onClick={onCancel}>
          {textCancel}
        </Button>
        <Button className='positive' onClick={onPositive}>
          {textPositive}
        </Button>
      </div>
    </BaseDialog>
  );
};

Dialog.defaultProps = {
  textCancel: '취소',
  textPositive: '확인'
};

export default Dialog;
