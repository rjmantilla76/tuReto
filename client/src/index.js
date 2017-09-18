import React from 'react';
import ReactDOM from 'react-dom';

// import assets
import './index.css';

// import react components
import App from './App';

// import others
import registerServiceWorker from './registerServiceWorker';

// render app & init service worker
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
