import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import html from './html';
import App from './shared/app';
import {StaticRouter} from "react-router";

const port: number = 3000;
const server = express();

server.use('*/js', express.static("dist/js"));

server.get('**', (req: express.Request, res: express.Response) => {
    const body = renderToString(
        <StaticRouter location={req.url}>
            <App/>
        </StaticRouter>
    );
    res.send(html({ body }));
});

server.listen(port, () => {
    console.log("listening on port 3000")
});




