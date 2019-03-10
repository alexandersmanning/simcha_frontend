import {SET_TOKEN} from "../actions/tokenActions";

export default (state = '', action: { type: string, payload: string, }) => {
    switch(action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
}
