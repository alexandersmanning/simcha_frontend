import React, {FormEvent} from 'react';
import fetch from 'isomorphic-fetch';

export default class Login extends React.Component<{}, {}> {
    private email: HTMLInputElement;
    private readonly emailRef: (element: HTMLInputElement) => void;

    private password: HTMLInputElement;
    private readonly passwordRef: (element: HTMLInputElement) => void;

    constructor(props: {}) {
        super(props)
        this.emailRef = (element) => {
            this.email = element;
        };

        this.passwordRef = (element) => {
            this.password = element;
        };
    }

    onSubmit(e: FormEvent<HTMLElement>) {
        e.preventDefault();
        const bodyInput = {
            email: this.email.value,
            password: this.password.value,
        };

        const headers: Headers = new Headers({
            'Content-type': 'application/json',
            'Accept': 'application/json',
        });

        fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify(bodyInput),
            headers,
            credentials: 'include',
        }).then((res: Response) => {
            if (!res.ok) {
                throw new Error('Response is not ok');
            }

            return res.json();
        }).then(() => {
            console.log('logged in')
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return(
            <form>
                <label>
                    <span>Email</span>
                    <input type="text" placeholder="Email" ref={this.emailRef}/>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" placeholder="Password" ref={this.passwordRef} />
                </label>
                <button onClick={this.onSubmit.bind(this)}>Login</button>
            </form>
        )
    }
}
