import React from 'react';
import { render } from 'react-dom';
import App from '../shared/app'
import {BrowserRouter} from 'react-router-dom'
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "../reducer";
import {createPost, deletePost, getPosts, editPost} from "../middleware/postsMiddleware";
import {loginUser, logoutUser} from "../middleware/userMiddleware";

declare global{
    interface Window {
        __PRELOADED_STATE__: any;
    }
}

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, applyMiddleware(createPost, getPosts, deletePost, editPost, loginUser, logoutUser));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
