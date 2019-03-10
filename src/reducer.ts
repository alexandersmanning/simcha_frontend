import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import tokenReducer from "./reducers/tokenReducer";

const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    token: tokenReducer,
});

export default reducer;
