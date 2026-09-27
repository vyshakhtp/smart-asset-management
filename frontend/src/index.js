import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/Store';

import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || '';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);