import './css/styles.scss';

import React, { forwardRef } from 'react';

type HookClassName = [string, (cn?: string | string[]) => void];
const useClassName = (initial: string): HookClassName => {
  const [_className, _setClassName] = React.useState(initial);
  const appendClassName = React.useCallback((className?: string | string[]) => {
    const cn = [_className];

    if (Array.isArray(className)) {
      cn.push(...className);
    } else if (!!className) {
      cn.push(className);
    }

    _setClassName(cn.join(' '));
  }, [_className]);

  return [_className, appendClassName];
};

const Classed = <T extends HTMLElement>(name: string, classed: string, Component?: any) => {
  const ClassedComponent = (props: { [x: string]: any }, ref: React.Ref<T>) => {
    const { className } = props;
    const [_className, _appendClassName] = useClassName(classed);
    React.useEffect(() => {
      if (_className.indexOf(className) < 0) {
        _appendClassName(className);
      }
    }, [_appendClassName, _className, className]);

    return React.createElement(Component || name, {
      ...props,
      className: _className,
      ref
    });
  };

  ClassedComponent.displayName = name;

  return forwardRef(ClassedComponent);
};

export default Classed;

export const Input = Classed('input', 'input');

export const Button = Classed('button', 'button');

// Card
export const Card = Classed('div', 'card');
