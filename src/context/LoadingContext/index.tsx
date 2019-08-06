import React, { useState } from 'react';
import { useToggle } from '../../utils/react-support/Hook';
import Loading from '../../components/molecule/Loading';

const providerError = () => console.error('LoadingContext: Need Provider!');

/**
 * LoadingContext
 */

export type LoadingContextType = {
  toggleLoading: (visible: boolean, message?: string) => void;
};
const initialLoadingContext: LoadingContextType = {
  toggleLoading: providerError
};
export const LoadingContext = React.createContext(initialLoadingContext);

type Props = {
  children?: React.ReactNode;
};

export const LoadingContextProvider = (props: Props) => {
  const { children } = props;
  const [loadingVisible, toggleLoadingVisible] = useToggle(false);
  const [msg, setMessage] = useState<string | undefined>(undefined);

  const toggleLoading = React.useCallback(
    (visible: boolean, message?: string) => {
      toggleLoadingVisible(visible);
      setMessage(message);
    },
    []
  );

  const context = React.useMemo(
    () => ({
      toggleLoading
    }),
    [toggleLoading]
  );

  return (
    <LoadingContext.Provider value={context}>
      {children}
      <Loading visible={loadingVisible} message={msg} />
    </LoadingContext.Provider>
  );
};
