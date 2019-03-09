import {ADD_POST, DELETE_POST, RECEIVE_POSTS} from "../actions/postActions";
import {IPost} from "../shared/postComponents/posts";

const postReducer = (state: IPost[] = [], action: any) => {
    switch(action.type) {
        case ADD_POST:
            return state.concat(action.payload);
        case RECEIVE_POSTS:
            return state.concat(action.payload);
        case DELETE_POST:
            return state.filter((post: IPost) => {
                return post.id !== action.payload;
            });
        default:
            return state;
    }
};

export default postReducer;
