import React from 'react';
import {Route, Switch} from "react-router";
import LoginComponent from './login'
import {About} from '../app/components/about';
import PostComponent from './postComponents/posts';
import UserForm from './createUser';
import { Hello } from './hello'

export default () => {
    return (
        <div>
            <LoginComponent/>
            <Switch>
                <Route path="/about/:userId" exact component={About}/>
                <Route path="/posts" exact component={PostComponent}/>
                <Route path="/newAccount" component={UserForm}/>
                <Route path="/:userId" exact component={Hello}/>
            </Switch>
        </div>
    )
}
