import React from 'react';
import {Route, Switch} from "react-router";
import LoginComponent from './login'
import asyncComponent from "./asyncComponent";

const AboutComponent = asyncComponent(() => (
    import( /* webpackChunkName: "about" */ '../app/components/about').then((module: any) => {
        return module.App;
    })
));

const Posts = asyncComponent(() => {
    return import(/* webpackChunkName: "posts" */ './postComponents/posts').then((module: any) => {
        return module.default;
    });
});

const UserForm = asyncComponent(() => {
    return import(/* webpackChunkName: "createUser" */ './createUser').then((module: any) => {
        return module.default;
    });
});

const Hello = asyncComponent(() => {
    return import(/* webpackChunkName: "hello" */ './hello').then((module: any) => {
        return module.Hello;
    });
});

export default () => {
    return (
        <div>
            <LoginComponent/>
            <Switch>
                <Route path="/about/:userId" exact component={AboutComponent}/>
                <Route path="/posts" exact component={Posts}/>
                <Route path="/newAccount" component={UserForm}/>
                <Route path="/:userId" exact component={Hello}/>
            </Switch>
        </div>
    )
}
