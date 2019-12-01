import './styles.css';

import React from 'react';
import { Card, PropsOfComponent } from '../../atoms/Classed';
import Modal, { ModalProps } from '../../atoms/Modal';

type Props = ModalProps & PropsOfComponent<typeof Card>;

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
