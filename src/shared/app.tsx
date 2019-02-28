import React from 'react';
import { Hello} from "./hello";
import {Route, Switch} from "react-router";
import {About} from "../app/components/about";

export default () => {
    return (
        <Switch>
            <Route path="/about/:userId" component={About}/>
            <Route path="/:userId" component={Hello}/>
        </Switch>
    )
}
