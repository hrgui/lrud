import { useFocusStoreDangerously } from '@please/lrud';
import { useEffect } from 'react';

export function BoundaryListenerSetup() {
  const focusStore = useFocusStoreDangerously();

  useEffect(() => {
    const origFocusStoreHandleArrow = focusStore.handleArrow;
    focusStore.$$boundaryListeners = focusStore.$$boundaryListeners || [];
    focusStore.handleArrow = (arrow) => {
      const currentFocusedNodeId = focusStore.getState().focusedNodeId;
      const originalReturn = origFocusStoreHandleArrow(arrow);
      const finalState = focusStore.getState();
      const finalFocusedNodeId = finalState.focusedNodeId;

      if (currentFocusedNodeId === finalFocusedNodeId) {
        const node = finalState.nodes[finalFocusedNodeId];
        if (focusStore.$$boundaryListeners) {
          focusStore.$$boundaryListeners.forEach((boundaryListener) => {
            boundaryListener({ node, arrow });
          });
        }
      }

      return originalReturn;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
