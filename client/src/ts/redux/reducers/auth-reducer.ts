import { initState, IAuth } from "../state-interfaces";
import { AuthActionTypes, SET_AUTHENTICATION } from "./../types";

export const authenticatoinReducer = (
    state = initState.auth,
    { type, payload }: AuthActionTypes
): IAuth => {
    switch (type) {
        case SET_AUTHENTICATION:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};
