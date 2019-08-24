import './styles.css';

import React from 'react';

type Props = {
  value?: number;
  animated?: boolean;
};

const Progress: React.FunctionComponent<Props> = (props: Props) => {
  const { value = 0, animated = true } = props;
  const barClassName = React.useMemo(() => {
    const arr = ['bar'];

    if (animated) {
      arr.push('animate');
    }

    return arr.join(' ');
  }, [animated]);

  return (
    <div className='progress'>
      <div className={barClassName} style={{ width: value + '%' }} />
    </div>
  );
};

export default Progress;
