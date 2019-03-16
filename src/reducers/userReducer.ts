interface IUserAction {
    type: string,
    payload: {
        id: string,
        email: string
    }
}

const userReducer = (state = {}, action: IUserAction) => {
    switch(action.type) {
        case 'SET_USER':
            return Object.assign({}, state, { id: action.payload.id, email: action.payload.email });
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export default userReducer;
