import { initState, IData } from "../state-interfaces";
import {
    CoursesActionTypes,
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
    UPDATE_LESSON_IN_COURSE_FAILURE,
    UPDATE_LESSON_IN_COURSE_SUCCESS,
    UPDATE_LESSON_IN_COURSE_REQUEST
} from "../types";

export const dataReducer = (
    state = initState.data,
    action: CoursesActionTypes
): IData => {
    switch (action.type) {
        case FETCH_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case FETCH_COURSES_SUCCESS:
            const { userId, courses, lessons } = action.payload;
            const teacherCourses: any = courses.filter(
                ({ teacherId, _id }) => teacherId === userId && _id
            );
            if (lessons) {
                courses.forEach(el => {
                    const coursesLessons = lessons.filter(
                        l => l.courseId === el._id
                    );
                    el.lessons = coursesLessons;
                });
            }
            return {
                ...state,
                courses,
                teacherCourses: teacherCourses.map(({ _id }: any) => _id),
                loading: false,
                error: false
            };
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case DELETE_COURSES_SUCCESS:
            const courseId = action.payload;
            let newCourses;
            let newTeacherCourses;
            if (state.courses) {
                newCourses = state.courses.filter(el => el._id !== courseId);
            }
            if (state.teacherCourses) {
                newTeacherCourses = state.teacherCourses.filter(
                    el => el !== courseId
                );
            }
            return {
                ...state,
                courses: newCourses,
                teacherCourses: newTeacherCourses,
                loading: false,
                error: false
            };
        case DELETE_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case ADD_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ADD_COURSES_SUCCESS:
            const course = action.payload;
            let withAdded;
            let withAddedTeacher: any;
            if (state.courses) {
                withAdded = [...state.courses, course];
            }
            if (state.teacherCourses) {
                withAddedTeacher = [...state.teacherCourses, course._id];
            }
            return {
                ...state,
                courses: withAdded,
                teacherCourses: withAddedTeacher,
                loading: false,
                error: false
            };
        case ADD_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case UPDATE_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case UPDATE_COURSES_SUCCESS:
            const updatedCourse = action.payload;
            let withUpdated;
            let withUpdatedTeacher: any;
            if (state.courses) {
                const oldIdx = state.courses.findIndex(
                    el => el._id === updatedCourse._id
                );
                withUpdated = state.courses;
                withUpdated.splice(oldIdx, 1, updatedCourse);
            }
            if (state.teacherCourses) {
                const oldIdx = state.teacherCourses.findIndex(
                    el => el === updatedCourse._id
                );
                withUpdatedTeacher = state.teacherCourses;
                withUpdatedTeacher.splice(oldIdx, 1, updatedCourse._id);
            }
            return {
                ...state,
                courses: withUpdated,
                teacherCourses: withUpdatedTeacher,
                loading: false,
                error: false
            };
        case UPDATE_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case ADD_LESSON_TO_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ADD_LESSON_TO_COURSE_SUCCESS:
            const lesson = action.payload;
            const courseIdx = state.courses?.findIndex(
                c => c._id === lesson.courseId
            );
            let coursesWithLesson = state.courses;
            if ((courseIdx || courseIdx === 0) && state.courses) {
                const courseWithLesson = state.courses[courseIdx];
                courseWithLesson.lessons?.push(lesson);
                coursesWithLesson?.splice(courseIdx, 1, courseWithLesson);
            }
            return {
                ...state,
                courses: coursesWithLesson,
                loading: false,
                error: false
            };
        case ADD_LESSON_TO_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case UPDATE_LESSON_IN_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case UPDATE_LESSON_IN_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            };
        case UPDATE_LESSON_IN_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return { ...state };
    }
};
