import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { ProductProvider } from './components/context';

ReactDOM.render(
    <ProductProvider>
        <Router>
            <App />
        </Router>
    </ProductProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
