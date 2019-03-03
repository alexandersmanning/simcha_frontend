import React from 'react';
import fetch from "isomorphic-fetch";
import {Redirect} from "react-router";

interface IUserBody {
    email: string;
    password: string;
    confirmationPassword: string;
}

export default class UserForm extends React.Component<{}, { loggedIn: boolean,  errors: string }> {
    private emailInput: HTMLInputElement;
    private readonly emailInputRef: (element: HTMLInputElement) => void;

    private passwordInput: HTMLInputElement;
    private readonly passwordInputRef: (element: HTMLInputElement) => void;

    private confirmationPasswordInput: HTMLInputElement;
    private readonly confirmationPasswordInputRef: (element: HTMLInputElement) => void;

    constructor(props: {}) {
        super(props);

        this.state = { loggedIn: false, errors: '' };
        this.emailInputRef = (element: HTMLInputElement) => {
            this.emailInput = element;
        };

        this.passwordInputRef = (element: HTMLInputElement) => {
            this.passwordInput = element;
        };

        this.confirmationPasswordInputRef = (element: HTMLInputElement) => {
            this.confirmationPasswordInput = element;
        }
    }

    onClickAction(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const bodyType: IUserBody = {
            email: this.emailInput.value,
            password: this.passwordInput.value,
            confirmationPassword: this.confirmationPasswordInput.value,
        };

        const headers: Headers = new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
        });

        fetch('http://localhost:8000/users', {
            headers,
            method: 'POST',
            body: JSON.stringify(bodyType),
        }).then((res: Response) => {
            if (res.status !== 200) {
                throw new Error('Could not create a new users')
            }

            this.setState(() => ({ loggedIn: true }))
        }).catch((err) => {
            this.setState(() => ({ errors: err }));
        })
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/posts'/>
        }
        return (
            <form>
                <label>
                    <span>Email</span>
                    <input type="email" ref={this.emailInputRef}/>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" ref={this.passwordInputRef}/>
                </label>
                <label>
                    <span>Password Confirmation</span>
                    <input type="password" ref={this.confirmationPasswordInputRef}/>
                </label>
                <button onClick={this.onClickAction.bind(this)}>Create User Account</button>
            </form>
            )
    }
}
