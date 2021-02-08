import { initState, IUser } from "../state-interfaces";
import {
    UserActionTypes,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
} from "../types";
import { fetchUserSuccess } from "../actions/actions";

export const userReducer = (
    state = initState.user,
    action: UserActionTypes
): IUser => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                error: false,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: false
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return { ...state };
    }
};
