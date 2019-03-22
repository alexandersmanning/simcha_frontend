import {SET_TOKEN, TokenActions} from "../actions/tokenActions";

export type TokenState = string;

export default (state: TokenState = '', action: TokenActions) => {
    switch(action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
}
