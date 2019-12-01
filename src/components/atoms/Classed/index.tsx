import './css/styles.scss';

import React from 'react';

export const useClassName = (...classes: any[]) => {
  return React.useMemo(() => classes.reduce((prev, cur) => !!cur ? `${prev} ${cur}` : prev, ''), [classes]);
};

// Classed('div');
//  => <div class="div"></div>

// Classed('div', 'header-wrapper');
//  => <div class="header-wrapper"></div>

// Classed('BorderCard', 'border', Card);
//  => <Card class="border"></Card>
//  debug => <BorderCard>

export type PropsOfComponent<C extends React.ComponentType> = C extends React.ComponentType<infer P> ? P : {};
export type Element<H extends keyof React.ReactHTML> = React.ReactHTML[H] extends React.DetailedHTMLFactory<React.HTMLAttributes<infer E>, infer E> ? E : never;
export type ElementProps<H extends keyof React.ReactHTML> = React.ClassAttributes<Element<H>> & React.HTMLAttributes<H>

export function ClassedRef<K extends keyof React.ReactHTML>(name: K, classed?: string): React.ForwardRefExoticComponent<React.PropsWithoutRef<ElementProps<K>> & React.RefAttributes<Element<K>>> {
  function ClassedComponent(props: ElementProps<K>, ref: React.Ref<Element<K>>) {
    const { className } = props;
    const _className = useClassName(classed || name.toLowerCase(), className);
    return React.createElement(name, { ...props, className: _className, ref });
  }

  return React.forwardRef(ClassedComponent);
}

export function Classed<P extends { className?: string }>(name: string, classed: string, component: React.ComponentType<P>): React.FunctionComponent<P> {
  function ClassedComponent(props: P) {
    const { className } = props;
    const _className = useClassName(classed || name.toLowerCase(), className);
    return React.createElement(component, { ...props, className: _className });
  }

  ClassedComponent.displayName = name;

  return ClassedComponent;
}

export const Input = ClassedRef('input', 'input');
export const Button = ClassedRef('button', 'button');

// Card
export const Card = ClassedRef('div', 'card');
