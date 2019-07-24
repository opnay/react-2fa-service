import './styles.css';

import React from 'react';
import { Button } from '../../atoms/Styled';

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
  const cn = React.useMemo(() => ['dialog', className].join(' '), [className]);

  return (
    <div className={cn}>
      <div className='message'>{message}</div>
      <div className='button-group'>
        <Button className='negative' onClick={onCancel}>
          {textCancel}
        </Button>
        <Button className='positive' onClick={onPositive}>
          {textPositive}
        </Button>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  textCancel: '취소',
  textPositive: '확인'
};

export default Dialog;
