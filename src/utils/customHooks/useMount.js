import React, { useEffect } from "react";
import usePersistFn from './usePersistFn';

// mine
// export default function useMount(callback) {
//   useEffect(() => {
//     callback && callback();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
// }

// 大佬
const useMount = (fn) => {
  const fnPersist = usePersistFn(fn);

  useEffect(() => {
    if (fnPersist && typeof fnPersist === 'function') {
      fnPersist();
    }
  }, []);
};

export default useMount