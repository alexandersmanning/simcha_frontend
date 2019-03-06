import {AnyAction, Dispatch} from "redux";
import {GET_USER, setUser} from "../actions/userActions";

export const loginUser = (state: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== GET_USER) return next(action);

    const headers: Headers = new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
    });

    fetch('http://localhost:8000/login', {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers,
        credentials: 'include',
    }).then((res: Response) => {
        if (!res.ok) {
            throw new Error('Response is not ok');
        }

        return res.json();
    }).then((user) => {
        state.dispatch(setUser(user));
    }).catch((err) => {
        console.log(err);
    })
};
