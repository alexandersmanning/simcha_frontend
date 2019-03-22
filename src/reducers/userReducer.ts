import {UsersActions} from "../actions/userActions";

export interface IUserState {
    id?: number;
    email?: string;
}

const userReducer = (state: IUserState = {}, action: UsersActions) => {
    switch(action.type) {
        case 'SET_USER':
            return Object.assign(
                {},
                state,
                { id: action.payload.id, email: action.payload.email });
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export default userReducer;
