export const GET_USER = 'GET_USER';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';

export interface ISetUserAction {
    type: typeof SET_USER;
    payload: { email: string, id: number }
}

export const setUser = ({ email, id }:
    { email: string, id: number }
): ISetUserAction => {
    return ({
        type: SET_USER,
        payload: { email, id },
    });
};

export interface IGetUserAction {
    type: typeof GET_USER;
    payload: { email: string, password: string }
}

export const getUser = ({ email, password }: { email: string, password: string }): IGetUserAction => {
    return ({
        type: GET_USER,
        payload: { email, password },
    })
};

export interface ILogoutAction {
    type: typeof LOGOUT;
}

export const logout = (): ILogoutAction => {
    return ({
        type: LOGOUT
    })
};

export type UsersActions = ILogoutAction | ISetUserAction | IGetUserAction;
