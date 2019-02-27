import React from 'react';
import {Route} from 'react-router';

import App from '../../shared/app'
import { About } from './about'

export default () => (
    <Route>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={About}/>
    </Route>
);
