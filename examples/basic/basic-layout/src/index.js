import 'modern-normalize/modern-normalize.css';
import ReactDOM from 'react-dom';
import { FocusRoot } from '@please/lrud';
import './index.css';
import App from './app';
import { BoundaryListenerSetup } from './BoundaryListenerSetup';

ReactDOM.render(
  <FocusRoot>
    <App />
    <BoundaryListenerSetup />
  </FocusRoot>,
  document.getElementById('root')
);
