import { FocusNode } from '@please/lrud';
import './app.css';
import { BoundaryListener } from './BoundaryListener';

function InnerApp() {
  return (
    <>
      <FocusNode className="block-container block-container-horizontal">
        <FocusNode className="block">One</FocusNode>
        <FocusNode className="block">Two</FocusNode>
        <FocusNode className="block">Three</FocusNode>
      </FocusNode>
      <BoundaryListener
        callback={({ node, arrow }) => {
          console.log(node, arrow, '2nd');
        }}
      />
    </>
  );
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

        <InnerApp />
        <BoundaryListener
          callback={({ node, arrow }) => {
            console.log(node, arrow, '1st');
          }}
        />
      </FocusNode>
    </>
  );
}
