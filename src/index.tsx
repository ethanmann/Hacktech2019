import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const extensionId = 'extension-root';
let extensionElement = document.getElementById(extensionId);

if (!extensionElement) {
  extensionElement = document.createElement('div');
  extensionElement.id = extensionId;
  document.body.appendChild(extensionElement);
  ReactDOM.render(
    <App />,
    extensionElement
  );

  registerServiceWorker();
}
