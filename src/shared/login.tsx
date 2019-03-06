import React, {FormEvent} from 'react';
import userReducer from "../reducers/userReducer";
import {connect} from "react-redux";
import {getUser } from "../actions/userActions";

interface ILoginProps {
    user: {
        id: string;
        email: string;
    },
    login: (email: string, password: string) => void;
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
        this.props.login(this.email.value, this.password.value);
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
        login(email: string, password: string){
            dispatch(getUser({ email, password }));
        }
    }
};

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginComponent;
