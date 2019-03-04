import React from 'react';
import { render } from 'react-dom';
import App from '../shared/app'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "../reducer";

declare global{
    interface Window {
        __PRELOADED_STATE__: any;
    }
}

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState);

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
