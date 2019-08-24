import React from 'react';
import CardModal from '../../components/molecule/CardModal/CardModal';
import { useToggle } from '../../utils/react-support/Hook';
import Dialog, { DialogProps } from '../../components/molecule/Dialog';

const providerError = () => console.error('DialogContext: Need Provider!');

/**
 * DialogContext
 */
export type DialogContextType = {
  toggleDialog: (visible: boolean, props?: DialogProps) => void;
};
const initialDialogContext: DialogContextType = {
  toggleDialog: providerError
};
const initialDialogProps: DialogProps = { message: '' };
export const DialogContext = React.createContext(initialDialogContext);

type Props = {
  children?: React.ReactNode;
};

export const DialogContextProvider = (props: Props) => {
  const { children } = props;
  const [dialogVisible, toggleDialogVisible] = useToggle();
  const [dialogProps, setDialogProps] = React.useState<DialogProps>(
    initialDialogProps
  );

  const toggleDialog = React.useCallback(
    (visible: boolean, props: DialogProps = initialDialogProps) => {
      // set Props
      setDialogProps(props);

      toggleDialogVisible(visible);
    },
    []
  );

  const context = React.useMemo(
    () => ({
      toggleDialog
    }),
    [toggleDialog]
  );

  return (
    <DialogContext.Provider value={context}>
      {children}
      <CardModal visible={dialogVisible}>
        <Dialog {...dialogProps} />
      </CardModal>
    </DialogContext.Provider>
  );
};
