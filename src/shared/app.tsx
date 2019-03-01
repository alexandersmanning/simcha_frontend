import React from 'react';
import { Hello} from "./hello";
import {Route, Switch} from "react-router";
import {About} from "../app/components/about";
import Posts from './posts';

export default () => {
    return (
        <Switch>
            <Route path="/about/:userId" exact component={About}/>
            <Route path="/posts" exact component={Posts}/>
            <Route path="/:userId" exact component={Hello}/>
        </Switch>
    )
}
