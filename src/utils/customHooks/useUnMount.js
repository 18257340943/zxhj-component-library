import React, { useEffect } from "react";

import usePersistFn from "./usePersistFn";
// mine
// export default function useUnMount(callback) {

//   useEffect(() => {
//     return () => {
//       componentWillUnmount()
//     };
//   }, []);

//   function componentWillUnmount() {
//     console.log(callback, 'componentWillUnmount');
//     callback && callback()
//   }

// }


// 大佬
const useUnMount = (fn) => {
  const fnPersist = usePersistFn(fn);

  useEffect(
    () => () => {
      if (fnPersist && typeof fnPersist === 'function') {
        console.log('useUnMount')
        fnPersist();
      }
    },
    [],
  );
};

export default useUnMount