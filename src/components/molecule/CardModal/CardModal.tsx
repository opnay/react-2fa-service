import './styles.css';

import React from 'react';
import Modal, { ModalProps } from '../../atoms/Modal';
import Card from '../../atoms/Card';

type Props = ModalProps & React.HTMLAttributes<HTMLDivElement>;

const CardModal = (props: Props) => {
  const { visible, className, ...cardProps } = props;
  const cn = React.useMemo(() => ['modal-card', className].join(' '), [
    className
  ]);
  return (
    <Modal visible={visible}>
      <Card {...cardProps} className={cn} />
    </Modal>
  );
};

export default CardModal;
