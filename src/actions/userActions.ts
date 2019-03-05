export const SET_USER = 'SET_USER';

export const loginUser = ({ email, id }:
    { email: string, id: string }
) => {
    return ({
        type: SET_USER,
        payload: { email, id },
    });
};
