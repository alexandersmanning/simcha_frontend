import {ADD_POST} from "../actions/postActions";
import {IPost} from "../shared/posts";

interface IPostAction {
    type: string,
    payload: IPost
}

const postReducer = (state: IPost[] = [], action: IPostAction) => {
    switch(action.type) {
        case ADD_POST:
            return state.concat(action.payload);
        default:
            return state;
    }
};

export default postReducer;
