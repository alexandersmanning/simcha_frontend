import {ADD_POST, RECEIVE_POSTS} from "../actions/postActions";
import {IPost} from "../shared/posts";

interface IPostAction {
    type: string,
    payload: IPost
}

const postReducer = (state: IPost[] = [], action: IPostAction) => {
    switch(action.type) {
        case ADD_POST:
            return state.concat(action.payload);
        case RECEIVE_POSTS:
            return action.payload;
        default:
            return state;
    }
};

export default postReducer;
