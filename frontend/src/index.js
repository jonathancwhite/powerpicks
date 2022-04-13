import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

serviceWorker.unregister();