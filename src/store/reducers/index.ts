import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {loginReducer} from "./loginReducer";
import {chatReducer} from "./chatReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;