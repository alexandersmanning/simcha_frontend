import {AnyAction, Dispatch} from "redux";
import {GET_USER, LOGOUT, setUser} from "../actions/userActions";
import {simchaFetch} from "../utils/fetchUtil";
import {handleCSRF} from "../utils/middlewareHelpers";

export const loginUser = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== GET_USER) return next(action);
    const csrfToken = store.getState().token;

    simchaFetch('login', { method: 'POST', body: action.payload, csrfToken })
        .then(({ token, data }: { token: string, data: any }) => {
            handleCSRF(store, token);
            store.dispatch(setUser(data));
        }).catch((err) => {
            console.log(err);
        })
};

export const logoutUser = (store: any) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (action.type !== LOGOUT) return next(action);

    simchaFetch('logout', { method: 'GET' })
        .then(({ token }: { token: string }) => {
            handleCSRF(store, token);
            return next(action);
        }).catch((err) => {
            console.log(err);
        });
};
