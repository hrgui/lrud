import { FocusNode, useLeafFocusedNode } from '@please/lrud';
import { useEffect } from 'react';
import './app.css';

// This maps a Key string, returned from an event, to a handler name.
export const keyToBindingMap = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

// This maps a KeyCode num value, returned from an event, to a handler name.
export const keyCodeToBindingMap = {
  38: keyToBindingMap.ArrowUp,
  40: keyToBindingMap.ArrowDown,
  37: keyToBindingMap.ArrowLeft,
  39: keyToBindingMap.ArrowRight,
};

function useLRUD(mapping = {}) {
  const keydownHandler = function (e) {
    const bindingName =
      keyToBindingMap[e.key] || keyCodeToBindingMap[e.keyCode];
    const binding = mapping[bindingName];

    if (typeof binding === 'function') {
      e.preventDefault();
      e.stopPropagation();

      binding();
    }
  };

  function subscribe() {
    window.addEventListener('keydown', keydownHandler);
  }

  function unsubscribe() {
    window.removeEventListener('keydown', keydownHandler);
  }

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  });
}

function BoundaryListener() {
  // if the leaf focused node changes
  // then the LRUD events won't trigger
  useLeafFocusedNode();

  useLRUD({
    up() {
      console.log('up');
    },
    left() {
      console.log('left');
    },
    right() {
      console.log('right');
    },
    down() {
      console.log('down');
    },
  });

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
      <BoundaryListener />
    </>
  );
}
