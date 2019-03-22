import {combineReducers, Reducer} from "redux";
import userReducer, {IUserState} from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import tokenReducer, {TokenState} from "./reducers/tokenReducer";
import {IPost} from "./shared/postComponents/posts";

export interface IApplicationState {
    posts: IPost[];
    user: IUserState;
    token: TokenState;
}

const reducer: Reducer<IApplicationState> = combineReducers({
    user: userReducer,
    posts: postReducer,
    token: tokenReducer,
});

export default reducer;
