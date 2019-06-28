import './styles.css';

import React from 'react';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = (props: ButtonProps) => {
  const { className } = props;
  const cn = React.useMemo(() => ['button', className].join(' '), [className]);

  return <button {...props} className={cn} />;
};
