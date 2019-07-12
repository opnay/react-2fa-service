import { useState, useCallback } from 'react';

export type HookToggle = [boolean, (s?: boolean) => void];

export function useToggle(defaultState: boolean = false): HookToggle {
  const [state, setState] = useState(defaultState);
  const setToggle = useCallback(
    (toggleState: boolean = !state) => setState(toggleState),
    [setState]
  );
  return [state, setToggle];
}
