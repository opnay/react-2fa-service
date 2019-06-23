import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from './router';

type ProviderProps = {
  contexts: Array<React.ComponentType<any>>;
  children?: React.ReactNode;
};

const ProviderComponent: React.FC<ProviderProps> = (props: ProviderProps) => {
  const { contexts, children = <Fragment /> } = props;

  const rendered = React.useMemo(() => {
    const rendred: React.ReactNode = contexts.reduce<React.ReactNode>(
      (prev, CurContext) => <CurContext>{prev}</CurContext>,
      children
    );

    return rendred || children;
  }, [contexts, children]);

  return <Fragment>{rendered}</Fragment>;
};

const ContextProviders: Array<React.ComponentType> = [];

ReactDOM.render(
  <ProviderComponent contexts={ContextProviders}>
    <AppRouter />
  </ProviderComponent>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
