import './styles.css';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ClassedRef, PropsOfComponent } from '../Classed';

const BaseModal = ClassedRef('div', 'modal');

export type ModalProps = PropsOfComponent<typeof BaseModal> & {
  visible: boolean;
  children?: React.ReactNode;
};

let modalCount = 0;

const Modal = (props: ModalProps) => {
  const { visible, ...modalProps } = props;
  const [count, setCount] = React.useState(0);
  const eId = React.useMemo(() => 'modal-' + count, [count]);

  React.useEffect(() => {
    modalCount += 1;
    setCount(modalCount);
  }, [setCount]);

  if (!visible) {
    return <Fragment />;
  } else {
    return ReactDOM.createPortal(
      <BaseModal {...modalProps} id={eId} />,
      document.body
    );
  }
};

export default Modal;
