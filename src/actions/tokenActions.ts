export const SET_TOKEN = 'SET_TOKEN';

export interface ISetTokenAction {
    type: typeof SET_TOKEN;
    payload: string;
}
export const setToken = (token: string): ISetTokenAction => ({
    type: SET_TOKEN,
    payload: token,
});

export type TokenActions = ISetTokenAction;
