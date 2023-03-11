import { FocusNode, useFocusStoreDangerously } from '@please/lrud';
import { useEffect } from 'react';
import './app.css';

function BoundaryListener({ callback }) {
  const focusStore = useFocusStoreDangerously();

  useEffect(() => {
    const origFocusStoreHandleArrow = focusStore.handleArrow;
    focusStore.handleArrow = (arrow) => {
      const currentFocusedNodeId = focusStore.getState().focusedNodeId;
      const originalReturn = origFocusStoreHandleArrow(arrow);
      const finalState = focusStore.getState();
      const finalFocusedNodeId = finalState.focusedNodeId;

      if (currentFocusedNodeId === finalFocusedNodeId) {
        const node = finalState.nodes[finalFocusedNodeId];
        callback({ node, arrow });
      }

      return originalReturn;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <FocusNode className="app">
        <FocusNode
          orientation="vertical"
          className="block-container block-container-vertical">
          <FocusNode className="block">One</FocusNode>
          <FocusNode className="block">Two</FocusNode>
          <FocusNode className="block">Three</FocusNode>
        </FocusNode>

        <FocusNode
          orientation="vertical"
          className="block-container block-container-vertical">
          <FocusNode className="block">One</FocusNode>
          <FocusNode className="block">Two</FocusNode>
          <FocusNode className="block">Three</FocusNode>
        </FocusNode>

        <FocusNode className="block-container block-container-horizontal">
          <FocusNode className="block">One</FocusNode>
          <FocusNode className="block">Two</FocusNode>
          <FocusNode className="block">Three</FocusNode>
        </FocusNode>
      </FocusNode>
      <BoundaryListener
        callback={({ node, arrow }) => {
          console.log(node, arrow);
        }}
      />
    </>
  );
}
