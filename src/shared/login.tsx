import React, {FormEvent} from 'react';
import fetch from 'isomorphic-fetch';
import userReducer from "../reducers/userReducer";
import {connect} from "react-redux";
import {loginUser} from "../actions/userActions";

interface ILoginProps {
    user: {
        id: string;
        email: string;
    },
    login: (email: string, id: string) => void;
}

class Login extends React.Component<ILoginProps, {}> {
    private email: HTMLInputElement;
    private readonly emailRef: (element: HTMLInputElement) => void;

    private password: HTMLInputElement;
    private readonly passwordRef: (element: HTMLInputElement) => void;

    constructor(props: ILoginProps) {
        super(props);
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
        }).then(({ email, id }: { email: string, id: string }) => {
            this.props.login(email, id);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        if (this.props.user.id && this.props.user.email) {
            return (
                <div>
                    <span>Welcome {this.props.user.email}</span>
                </div>
            )
        }

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

const mapStateToProps = (state: any, action: any) => {
    return {
        user: userReducer(state.user, action),
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login(email: string, id: string){
            dispatch(loginUser({ email, id }));
        }
    }
};

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginComponent;
