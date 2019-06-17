import './styles.css';

import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const Card = (props: CardProps) => {
  const { children, className } = props;
  const cn = React.useMemo(() => ['card', className].join(' '), [className]);

  return <div className={cn}>{children}</div>;
};

export default Card;
