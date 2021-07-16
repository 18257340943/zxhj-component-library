import { useCallback, useRef } from 'react';



export default function usePersistFn(fn) {
  const ref = useRef(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;

  const persistFn = useCallback(((...args) => ref.current(...args)), [ref]);

  return persistFn;
}


