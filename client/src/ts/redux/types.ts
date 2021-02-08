import { IAuth, IUser, ICourse } from "./state-interfaces";
import { ILesson } from "Ts/services/service";

//ResetType
export const RESET_STATE = "RESET_STATE";
export type ResetState = typeof RESET_STATE;
export const resetState = () => ({ type: RESET_STATE });

//Authentication types
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
interface setAuth {
    type: typeof SET_AUTHENTICATION;
    payload: IAuth;
}
export type AuthActionTypes = setAuth;

//fetch user types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export interface fetchUserRequest {
    type: typeof FETCH_USER_REQUEST;
    payload: string;
}

export interface fetchUserSuccess {
    type: typeof FETCH_USER_SUCCESS;
    payload: IUser;
}

export interface fetchUserFailure {
    type: typeof FETCH_USER_FAILURE;
    payload: string;
}

export type UserActionTypes =
    | fetchUserRequest
    | fetchUserSuccess
    | fetchUserFailure;

//fetch courses types
export const FETCH_COURSES_REQUEST = "FETCH_COURSES_REQUEST";
export const FETCH_COURSES_SUCCESS = "FETCH_COURSES_SUCCESS";
export const FETCH_COURSES_FAILURE = "FETCH_COURSES_FAILURE";

export interface fetchCoursesRequest {
    type: typeof FETCH_COURSES_REQUEST;
    payload: string;
}

export interface fetchCoursesSuccess {
    type: typeof FETCH_COURSES_SUCCESS;
    payload: { courses: ICourse[]; userId: string; lessons: ILesson[] };
}

export interface fetchCoursesFailure {
    type: typeof FETCH_COURSES_FAILURE;
    payload: string;
}

//delete courses types
export const DELETE_COURSES_SUCCESS = "DELETE_COURSES_SUCCESS";
export const DELETE_COURSES_FAILURE = "DELETE_COURSES_FAILURE";
export const DELETE_COURSES_REQUEST = "DELETE_COURSES_REQUEST";

export interface deleteCoursesRequest {
    type: typeof DELETE_COURSES_REQUEST;
    payload: { token: string; courseId: string };
}

export interface deleteCoursesSuccess {
    type: typeof DELETE_COURSES_SUCCESS;
    payload: string;
}

export interface deleteCoursesFailure {
    type: typeof DELETE_COURSES_FAILURE;
    payload: string;
}

//add courses types
export const ADD_COURSES_SUCCESS = "ADD_COURSES_SUCCESS";
export const ADD_COURSES_FAILURE = "ADD_COURSES_FAILURE";
export const ADD_COURSES_REQUEST = "ADD_COURSES_REQUEST";

export interface addCoursesRequest {
    type: typeof ADD_COURSES_REQUEST;
    payload: { token: string; course: ICourse };
}

export interface addCoursesSuccess {
    type: typeof ADD_COURSES_SUCCESS;
    payload: ICourse;
}

export interface addCoursesFailure {
    type: typeof ADD_COURSES_FAILURE;
    payload: string;
}

//update courses types
export const UPDATE_COURSES_SUCCESS = "UPDATE_COURSES_SUCCESS";
export const UPDATE_COURSES_FAILURE = "UPDATE_COURSES_FAILURE";
export const UPDATE_COURSES_REQUEST = "UPDATE_COURSES_REQUEST";

export interface updateCoursesRequest {
    type: typeof UPDATE_COURSES_REQUEST;
    payload: { token: string; course: ICourse };
}

export interface updateCoursesSuccess {
    type: typeof UPDATE_COURSES_SUCCESS;
    payload: ICourse;
}

export interface updateCoursesFailure {
    type: typeof UPDATE_COURSES_FAILURE;
    payload: string;
}

//add lesson to course types
export const ADD_LESSON_TO_COURSE_SUCCESS = "ADD_LESSON_TO_COURSE_SUCCESS";
export const ADD_LESSON_TO_COURSE_FAILURE = "ADD_LESSON_TO_COURSE_FAILURE";
export const ADD_LESSON_TO_COURSE_REQUEST = "ADD_LESSON_TO_COURSE_REQUEST";

export interface addLessonToCourseRequest {
    type: typeof ADD_LESSON_TO_COURSE_REQUEST;
    payload: { token: string; lesson: ILesson };
}

export interface addLessonToCourseSuccess {
    type: typeof ADD_LESSON_TO_COURSE_SUCCESS;
    payload: ILesson;
}

export interface addLessonToCourseFailure {
    type: typeof ADD_LESSON_TO_COURSE_FAILURE;
    payload: string;
}

//update lesson in course types
export const UPDATE_LESSON_IN_COURSE_SUCCESS =
    "UPDATE_LESSON_IN_COURSE_SUCCESS";
export const UPDATE_LESSON_IN_COURSE_FAILURE =
    "UPDATE_LESSON_IN_COURSE_FAILURE";
export const UPDATE_LESSON_IN_COURSE_REQUEST =
    "UPDATE_LESSON_IN_COURSE_REQUEST";

export interface updateLessonInCourseRequest {
    type: typeof UPDATE_LESSON_IN_COURSE_REQUEST;
    payload: { token: string; lesson: ILesson };
}

export interface updateLessonInCourseSuccess {
    type: typeof UPDATE_LESSON_IN_COURSE_SUCCESS;
    payload: ILesson;
}

export interface updateLessonInCourseFailure {
    type: typeof UPDATE_LESSON_IN_COURSE_FAILURE;
    payload: string;
}

export type CoursesActionTypes =
    | fetchCoursesRequest
    | fetchCoursesSuccess
    | fetchCoursesFailure
    | deleteCoursesRequest
    | deleteCoursesSuccess
    | deleteCoursesFailure
    | addCoursesRequest
    | addCoursesSuccess
    | addCoursesFailure
    | updateCoursesRequest
    | updateCoursesSuccess
    | updateCoursesFailure
    | addLessonToCourseRequest
    | addLessonToCourseSuccess
    | addLessonToCourseFailure
    | updateLessonInCourseRequest
    | updateLessonInCourseSuccess
    | updateLessonInCourseFailure;
