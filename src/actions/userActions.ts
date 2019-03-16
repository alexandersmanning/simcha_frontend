export const GET_USER = 'GET_USER';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';

export const setUser = ({ email, id }:
    { email: string, id: string }
) => {
    return ({
        type: SET_USER,
        payload: { email, id },
    });
};

export const getUser = ({ email, password }: { email: string, password: string }) => {
    return ({
        type: GET_USER,
        payload: { email, password },
    })
};

export const logout = () => {
    return ({
        type: LOGOUT
    })
};
