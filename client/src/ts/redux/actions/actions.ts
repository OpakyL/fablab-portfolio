import {
    AuthActionTypes,
    UserActionTypes,
    CoursesActionTypes,
    RESET_STATE,
    SET_AUTHENTICATION,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    DELETE_COURSES_REQUEST,
    DELETE_COURSES_SUCCESS,
    DELETE_COURSES_FAILURE,
    ADD_COURSES_REQUEST,
    ADD_COURSES_SUCCESS,
    ADD_COURSES_FAILURE,
    UPDATE_COURSES_REQUEST,
    UPDATE_COURSES_SUCCESS,
    UPDATE_COURSES_FAILURE,
    ADD_LESSON_TO_COURSE_REQUEST,
    ADD_LESSON_TO_COURSE_SUCCESS,
    ADD_LESSON_TO_COURSE_FAILURE,
    UPDATE_LESSON_IN_COURSE_REQUEST,
    UPDATE_LESSON_IN_COURSE_SUCCESS,
    UPDATE_LESSON_IN_COURSE_FAILURE
} from "./../types";
import { IAuth, IUser, ICourse } from "./../state-interfaces";
import { ILesson } from "Ts/services/service";

export const setAuth = (payload: IAuth): AuthActionTypes => ({
    type: SET_AUTHENTICATION,
    payload
});

export const resetState = () => ({
    type: RESET_STATE
});

export const fetchUserRequest = (token: string): UserActionTypes => ({
    type: FETCH_USER_REQUEST,
    payload: token
});

export const fetchUserSuccess = (payload: IUser): UserActionTypes => ({
    type: FETCH_USER_SUCCESS,
    payload
});

export const fetchUserFailure = (error: Error): UserActionTypes => ({
    type: FETCH_USER_FAILURE,
    payload: error.message
});

export const fetchCoursesRequest = (token: string): CoursesActionTypes => ({
    type: FETCH_COURSES_REQUEST,
    payload: token
});

export const fetchCoursesSuccess = (
    courses: ICourse[],
    userId: string,
    lessons: ILesson[]
): CoursesActionTypes => ({
    type: FETCH_COURSES_SUCCESS,
    payload: { userId, courses, lessons }
});

export const fetchCoursesFailure = (error: Error): CoursesActionTypes => ({
    type: FETCH_COURSES_FAILURE,
    payload: error.message
});

export const deleteCoursesRequest = (
    token: string,
    courseId: string
): CoursesActionTypes => ({
    type: DELETE_COURSES_REQUEST,
    payload: { token, courseId }
});

export const deleteCoursesSuccess = (payload: string): CoursesActionTypes => ({
    type: DELETE_COURSES_SUCCESS,
    payload
});

export const deleteCoursesFailure = (error: Error): CoursesActionTypes => ({
    type: DELETE_COURSES_FAILURE,
    payload: error.message
});

export const addCoursesRequest = (
    token: string,
    course: ICourse
): CoursesActionTypes => ({
    type: ADD_COURSES_REQUEST,
    payload: { token, course }
});

export const addCoursesSuccess = (payload: ICourse): CoursesActionTypes => ({
    type: ADD_COURSES_SUCCESS,
    payload
});

export const addCoursesFailure = (error: Error): CoursesActionTypes => ({
    type: ADD_COURSES_FAILURE,
    payload: error.message
});

export const updateCoursesRequest = (
    token: string,
    course: ICourse
): CoursesActionTypes => ({
    type: UPDATE_COURSES_REQUEST,
    payload: { token, course }
});

export const updateCoursesSuccess = (payload: ICourse): CoursesActionTypes => ({
    type: UPDATE_COURSES_SUCCESS,
    payload
});

export const updateCoursesFailure = (error: Error): CoursesActionTypes => ({
    type: UPDATE_COURSES_FAILURE,
    payload: error.message
});

export const addLessonToCourseRequest = (
    token: string,
    lesson: ILesson
): CoursesActionTypes => ({
    type: ADD_LESSON_TO_COURSE_REQUEST,
    payload: { token, lesson }
});

export const addLessonToCourseSuccess = (
    payload: ILesson
): CoursesActionTypes => ({
    type: ADD_LESSON_TO_COURSE_SUCCESS,
    payload
});

export const addLessonToCourseFailure = (error: Error): CoursesActionTypes => ({
    type: ADD_LESSON_TO_COURSE_FAILURE,
    payload: error.message
});

export const updateLessonInCourseRequest = (
    token: string,
    lesson: ILesson
): CoursesActionTypes => ({
    type: UPDATE_LESSON_IN_COURSE_REQUEST,
    payload: { token, lesson }
});

export const updateLessonInCourseSuccess = (
    payload: ILesson
): CoursesActionTypes => ({
    type: UPDATE_LESSON_IN_COURSE_SUCCESS,
    payload
});

export const updateLessonInCourseFailure = (
    error: Error
): CoursesActionTypes => ({
    type: UPDATE_LESSON_IN_COURSE_FAILURE,
    payload: error.message
});
