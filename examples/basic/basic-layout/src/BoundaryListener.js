import { useFocusStoreDangerously } from '@please/lrud';
import { useEffect } from 'react';

function removeElementFromArray(arr, element) {
  const index = arr.indexOf(element);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function BoundaryListener({ callback }) {
  const focusStore = useFocusStoreDangerously();

  useEffect(() => {
    if (!focusStore.$$boundaryListeners) {
      focusStore.$$boundaryListeners = [];
    }

    focusStore.$$boundaryListeners.push(callback);
    console.log(focusStore.$$boundaryListeners);

    return () => {
      removeElementFromArray(focusStore.$$boundaryListeners, callback);
    };
  }, [focusStore, callback]);

  return null;
}
