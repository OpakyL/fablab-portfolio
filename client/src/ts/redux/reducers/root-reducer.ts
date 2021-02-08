import { combineReducers } from "redux";
import { IAppState, initState } from "../state-interfaces";
import { RESET_STATE } from "../types";
import { authenticatoinReducer } from "./auth-reducer";
import { userReducer } from "./user-reducer";
import { dataReducer } from "./data-reducer";

const reducerCombined = combineReducers({
    auth: authenticatoinReducer,
    user: userReducer,
    data: dataReducer
});

export const reducer = (state: IAppState, action: any): IAppState => {
    if (action.type === RESET_STATE) {
        return initState;
    }
    return reducerCombined(state, action);
};
