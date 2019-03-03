import React from 'react';
import { Hello} from "./hello";
import {Route, Switch} from "react-router";
import {About} from "../app/components/about";
import Posts from './posts';
import UserForm from "./createUser";
import Login from "./login";

export default () => {
    return (
        <div>
            <Login/>
            <Switch>
                <Route path="/about/:userId" exact component={About}/>
                <Route path="/posts" exact component={Posts}/>
                <Route path="/newAccount" component={UserForm}/>
                <Route path="/:userId" exact component={Hello}/>
            </Switch>
        </div>
    )
}
