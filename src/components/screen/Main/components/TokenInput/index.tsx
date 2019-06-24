import './styles.css';

import React, { HTMLAttributes, ReactNode, MutableRefObject } from 'react';

type TokenInputProps = HTMLAttributes<HTMLInputElement>;

const TokenInput = (props: TokenInputProps) => {
  const { className, ...inputProps } = props;

  const cn = React.useMemo(() => {
    const arr = ['token-input'];
    if (className) {
      arr.push(className);
    }

    return arr.join(' ');
  }, [className]);

  return <input {...inputProps} className={cn} />;
};

export default TokenInput;
