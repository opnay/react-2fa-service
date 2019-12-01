import './styles.css';

import React, { useMemo } from 'react';
import Modal, { ModalProps } from '../../atoms/Modal';
import { Classed, ClassedRef } from '../../atoms/Classed';

const BaseLoadingModal = Classed('BaseLoadingModal', 'loading', Modal);
const Circle = ClassedRef('div', 'circle');

type Props = ModalProps & {
  message?: string;
};

const Loading = (props: Props) => {
  const { message, visible, className, ...loadingProps } = props;

  const msg = useMemo(() => {
    if (!!message) {
      return <span className='message'>{message}</span>;
    } else {
      return undefined;
    }
  }, [message]);

  return (
    <BaseLoadingModal className={className} visible={visible}>
      <Circle {...loadingProps} />
      {msg}
    </BaseLoadingModal>
  );
};

export default Loading;
