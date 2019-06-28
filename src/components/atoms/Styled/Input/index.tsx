import './styles.css';

import React from 'react';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const { className } = props;
    const cn = React.useMemo(() => ['input', className].join(' '), [className]);
    return <input {...props} className={cn} ref={ref} />;
  }
);
