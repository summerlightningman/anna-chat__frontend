import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {loginReducer} from "./loginReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer
});

export type RootState = ReturnType<typeof rootReducer>;