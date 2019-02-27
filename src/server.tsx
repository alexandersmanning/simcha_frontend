import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import html from './html';
import App from './shared/app';

const port: number = 3000;
const server = express();

server.use(express.static('dist'));
server.get('/', (req: express.Request, res: express.Response) => {
    const body = renderToString(<App name="Alex"/>);
    res.send(html({ body }));
});

server.listen(port, () => {
    console.log("listening on port 3000")
});




