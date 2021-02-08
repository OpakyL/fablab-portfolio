import { IFile, IReview, ILesson } from "Ts/services/service";

export const initState: IAppState = {
    auth: {
        token: "",
        refreshToken: "",
        userId: "",
        isAuthenticated: false
    },
    data: {},
    user: {}
};

export type Role = "ADMIN" | "TEACHER" | "STUDENT" | undefined;

export interface IEvent {
    _id?: string;
    title: string;
    description: string;
    date: string;
    hide?: boolean;
}

export interface IAuth {
    token: string;
    refreshToken: string;
    userId?: string;
    isAuthenticated: boolean;
    role?: Role;
}

export interface IData {
    courses?: ICourse[];
    teacherCourses?: string[];
    loading?: boolean;
    error?: boolean;
}

export interface IUser {
    _id?: string;
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    picture?: IFile;
    loading?: boolean;
    error?: boolean;
    courses?: string[];
}

export interface ICourse {
    _id?: string;
    title: string;
    thumbnail: IFile;
    shortDescr: string;
    longDescr: string;
    price: string;
    teacherId?: string;
    hide?: boolean;
    startDate?: string;
    endDate?: string;
    reviews?: IReview[];
    lessons?: ILesson[];
}

export interface IAppState {
    auth: IAuth;
    data: IData;
    user: IUser;
}

// export const initialState = {
//     user: {
//         id: null,
//         name: null,
//         email: null,
//         jwt: null,
//         picture: null,
//         courses: [],
//         isLoggedIn: false
//     },
//     data: {
//         coursesUnauthorized: [
//             {
//                 id: null,
//                 title: null,
//                 thumbnail: null,
//                 shortDescr: null,
//                 price: null,
//                 longDescr: null,
//                 reviews: []
//             }
//         ],
//         lessonsAuthorized: [
//             {
//                 id: null,
//                 courseId: null,
//                 title: null,
//                 videoUrl: null,
//                 lessonText: null,
//                 files: []
//             }
//         ],
//         messages: [
//             {
//                 lessonId: null,
//                 userId: null,
//                 messageTitle: null,
//                 messageText: null,
//                 messageFiles: []
//             }
//         ]
//     },
//     status: {
//         error: false,
//         loading: false
//     }
// };
