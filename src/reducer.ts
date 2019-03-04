import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    user: userReducer,
});

export default reducer;
