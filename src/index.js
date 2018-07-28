import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterConfig from './router/index';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <RouterConfig />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
