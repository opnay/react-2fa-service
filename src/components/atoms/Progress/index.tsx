import './styles.css';

import React from 'react';
import { ClassedRef } from '../Classed';

const BaseProgress = ClassedRef('div', 'progress');
const BaseProgressBar = ClassedRef('div', 'bar');

type Props = {
  value?: number;
  animated?: boolean;
};

const Progress: React.FunctionComponent<Props> = (props: Props) => {
  const { value = 0, animated = true } = props;

  return (
    <BaseProgress>
      <BaseProgressBar className={animated ? 'animate' : undefined} style={{ width: `${value}%` }} />
    </BaseProgress>
  );
};

export default Progress;
