import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const extensionId = 'extension-root';
if (!document.getElementById(extensionId)) {
  const anchor = document.createElement('div');
  anchor.id = extensionId;
  document.body.insertBefore(anchor, document.body.childNodes[0]);

  ReactDOM.render(
    <App />,
    document.getElementById(extensionId) as HTMLElement
  );
  registerServiceWorker();
}
