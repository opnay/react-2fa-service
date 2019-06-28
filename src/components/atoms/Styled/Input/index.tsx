import './styles.css';

import React from 'react';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (props: InputProps) => {
  const { className } = props;
  const cn = React.useMemo(() => ['input', className].join(' '), [className]);
  return <input {...props} className={cn} />;
};
