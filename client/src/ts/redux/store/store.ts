import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
// import { noteWatcher } from "../sagas/notes-saga";
import { reducer } from "../reducers/root-reducer";
import { userWatcher } from "../sagas/user-saga";
import { coursesWatcher } from "../sagas/courses-saga";

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof reducer>;

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(userWatcher);
sagaMiddleware.run(coursesWatcher);

export default store;
