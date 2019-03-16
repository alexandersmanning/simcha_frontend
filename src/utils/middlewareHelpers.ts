import {setToken} from "../actions/tokenActions";

export const handleCSRF = (store: any, token: string): void => {
    token && store.dispatch(setToken(token));
};
