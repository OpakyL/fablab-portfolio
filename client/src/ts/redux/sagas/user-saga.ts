import { call, put, takeLatest } from "redux-saga/effects";
import service from "Ts/services/service";
import * as actions from "../actions/actions";
import { FETCH_USER_REQUEST, fetchUserRequest } from "../types";
// import { fetchNotesRequest, FETCH_NOTES_REQUEST, resetState } from "../types";

function* userWorker({ payload }: fetchUserRequest) {
    try {
        const user = yield call(service.fetchUser, payload);
        yield put(actions.fetchUserSuccess(user));
    } catch (error) {
        console.error(error)
        yield put(actions.fetchUserFailure(error));
    }
}

export function* userWatcher(): any {
    yield takeLatest(FETCH_USER_REQUEST, userWorker);
}
