import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import html from './html';
import App from './shared/app';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import {StaticRouter} from "react-router";
import reducer from "./reducer";
import fetch from 'isomorphic-fetch';
import {createPost, getPosts} from "./middleware/postsMiddleware";
import {loginUser} from "./middleware/userMiddleware";

const port: number = 3000;
const server = express();

server.use('*/js', express.static("dist/js"));

server.get('**', (req: express.Request, res: express.Response) => {
    fetch('http://localhost:8000/currentUser', {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }),
    }).then((res: Response) => {
        return res.json();
    }).then((user) => {
        let initialState = {};
        if (user.id && user.email) {
            initialState = {
                user: {
                    id: user.id || null,
                    email: user.email,
                }
            };
        }

        const store = createStore(reducer, initialState, applyMiddleware(createPost, getPosts, loginUser));
        const context = {};
        const body = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        );
        const preloadedState = store.getState();
        res.send(html({ body, preloadedState }));
    }).catch((err) => {
        console.log(err);
    });
});

server.listen(port, () => {
    console.log("listening on port 3000")
});

