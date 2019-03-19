import {ADD_POST, DELETE_POST, EDIT_POST, RECEIVE_POSTS, UPDATE_POST} from "../actions/postActions";
import {IPost} from "../shared/postComponents/posts";

const postReducer = (state: IPost[] = [], action: any) => {
    let idx: number;
    switch(action.type) {
        case ADD_POST:
            return state.concat(action.payload);
        case RECEIVE_POSTS:
            return state.concat(action.payload);
        case DELETE_POST:
            return state.filter((post: IPost) => {
                return post.id !== action.payload;
            });
        case EDIT_POST:
            idx = state.findIndex((post: IPost) => {
                return post.id === action.payload;
            });
            const post = Object.assign({}, state[idx], { edit: true });
            return state.slice(0, idx).concat(post, state.slice(idx + 1));
        case UPDATE_POST:
            idx = state.findIndex((post: IPost) => {
                return post.id === action.payload.id
            });

            return state.slice(0, idx).concat(action.payload, state.slice(idx + 1));
        default:
            return state;
    }
};

export default postReducer;
