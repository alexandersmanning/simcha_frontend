import React from 'react';
import { Hello} from "./hello";
import {Route, Switch} from "react-router";
import {About} from "../app/components/about";
import Posts from './postComponents/posts';
import UserForm from "./createUser";
import LoginComponent from './login'

export default () => {
    return (
        <div>
            <LoginComponent/>
            <Switch>
                <Route path="/about/:userId" exact component={About}/>
                <Route path="/posts" exact component={Posts}/>
                <Route path="/newAccount" component={UserForm}/>
                <Route path="/:userId" exact component={Hello}/>
            </Switch>
        </div>
    )
}
