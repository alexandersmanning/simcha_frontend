import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";

const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
});

export default reducer;
