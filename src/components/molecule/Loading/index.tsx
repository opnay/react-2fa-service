import './styles.css';

import React, { useMemo } from 'react';
import Modal, { ModalProps } from '../../atoms/Modal';

type Props = ModalProps & {
  message?: string;
};

const Loading = (props: Props) => {
  const { message, visible, className, ...loadingProps } = props;
  const cn = useMemo(() => ['loading', className].join(' '), [className]);

  const msg = useMemo(() => {
    if (!!message) {
      return <span className='message'>{message}</span>;
    } else {
      return undefined;
    }
  }, [message]);

  return (
    <Modal visible={visible} className={cn}>
      <div className='circle' />
      {msg}
    </Modal>
  );
};

export default Loading;
