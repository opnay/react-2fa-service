import './styles.css';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

export type ModalProps = {
  visible: boolean;
  children?: React.ReactChild;
};

let modalCount = 0;

const Modal = (props: ModalProps) => {
  const { visible, children } = props;
  const [count, setCount] = React.useState(0);
  const eId = React.useMemo(() => 'modal-' + count, [count]);
  const eClass = React.useMemo(() => 'modal', []);

  React.useEffect(() => {
    modalCount += 1;
    setCount(modalCount);
  }, [setCount]);

  if (!visible) {
    return <Fragment />;
  } else {
    return ReactDOM.createPortal(
      <div id={eId} className={eClass}>
        {children}
      </div>,
      document.body
    );
  }
};

export default Modal;
