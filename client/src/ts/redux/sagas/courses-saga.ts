import { call, put, takeLatest } from "redux-saga/effects";
import service from "Ts/services/service";
import * as actions from "../actions/actions";
import {
    fetchCoursesRequest,
    FETCH_COURSES_REQUEST,
    deleteCoursesRequest,
    DELETE_COURSES_REQUEST,
    addCoursesRequest,
    ADD_COURSES_REQUEST,
    updateCoursesRequest,
    UPDATE_COURSES_REQUEST,
    addLessonToCourseRequest,
    ADD_LESSON_TO_COURSE_REQUEST,
    updateLessonInCourseRequest,
    UPDATE_LESSON_IN_COURSE_REQUEST
} from "../types";
import store from "../store/store";
// import { fetchNotesRequest, FETCH_NOTES_REQUEST, resetState } from "../types";

function* fetchCoursesWorker({ payload }: fetchCoursesRequest) {
    try {
        // const { courses } = yield call(service.getCourses, payload);
        // const { lessons } = yield call(service.getLessons, payload);
        const { courses, lessons } = yield call(
            service.getCoursesAndLessons,
            payload
        );
        const { userId } = store.getState().auth;
        if (userId) {
            yield put(actions.fetchCoursesSuccess(courses, userId, lessons));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.fetchCoursesFailure(error));
    }
}

function* deleteCoursesWorker({
    payload: { token, courseId }
}: deleteCoursesRequest) {
    try {
        const res = yield call(service.deleteCourse, courseId, token);
        if (res.message === "Курс успешно удален") {
            yield put(actions.deleteCoursesSuccess(courseId));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.deleteCoursesFailure(error));
    }
}

function* addCourseWorker({ payload: { token, course } }: addCoursesRequest) {
    try {
        const { data } = yield call(service.addCourse, course, token);
        if (data) {
            yield put(actions.addCoursesSuccess(data));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.deleteCoursesFailure(error));
    }
}

function* updateCourseWorker({
    payload: { token, course }
}: updateCoursesRequest) {
    try {
        const { data } = yield call(service.updateCourse, course, token);
        if (data) {
            yield put(actions.updateCoursesSuccess(data));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.deleteCoursesFailure(error));
    }
}

function* addLessonToCourseWorker({
    payload: { token, lesson }
}: addLessonToCourseRequest) {
    try {
        const { data } = yield call(service.addLesson, lesson, token);
        if (data) {
            yield put(actions.addLessonToCourseSuccess(data));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.addLessonToCourseFailure(error));
    }
}

function* updateLessonInCourseWorker({
    payload: { token, lesson }
}: updateLessonInCourseRequest) {
    try {
        const { data } = yield call(service.updateLesson, lesson, token);
        if (data) {
            yield put(actions.updateLessonInCourseSuccess(data));
        }
    } catch (error) {
        console.error(error);
        yield put(actions.updateLessonInCourseFailure(error));
    }
}

export function* coursesWatcher(): any {
    yield takeLatest(FETCH_COURSES_REQUEST, fetchCoursesWorker);
    yield takeLatest(DELETE_COURSES_REQUEST, deleteCoursesWorker);
    yield takeLatest(ADD_COURSES_REQUEST, addCourseWorker);
    yield takeLatest(UPDATE_COURSES_REQUEST, updateCourseWorker);
    yield takeLatest(ADD_LESSON_TO_COURSE_REQUEST, addLessonToCourseWorker);
    yield takeLatest(
        UPDATE_LESSON_IN_COURSE_REQUEST,
        updateLessonInCourseWorker
    );
}
