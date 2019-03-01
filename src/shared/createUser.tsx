import React from 'react';

interface IUserFormState {
    email: string;
    password: string;
    confirmationPassword: string;
}

export default class UserForm extends React.Component<{}, IUserFormState> {
    private emailInput: HTMLInputElement;
    private emailInputRef: (element: HTMLInputElement) => void;

    private passwordInput: HTMLInputElement;
    private passwordInputRef: (element: HTMLInputElement) => void;

    private confirmationPasswordInput: HTMLInputElement;
    private confirmationPasswordInputRef: (element: HTMLInputElement) => void;

    constructor(props: {}) {
        super(props);
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
        // call create user action
    }

    render() {
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
