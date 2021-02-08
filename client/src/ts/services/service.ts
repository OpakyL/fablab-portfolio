import qs from "querystring";
import { IUser, ICourse, IEvent } from "Ts/redux/state-interfaces";

interface IRefetch {
    url: string;
    body?: any;
    headers?: any;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    json?: boolean;
}

export const refetch = async ({
    url = "/",
    body,
    headers = {},
    method = "GET",
    json = true
}: IRefetch) => {
    try {
        if (body) {
            body = JSON.stringify(body);
            if (json) {
                headers["Content-Type"] = "application/json";
            }
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
            throw {
                data,
                error: true,
                message: data.message || "Что-то пошло не так"
            };
        }

        return data;
    } catch (error) {
        return { ...error };
    }
};

let baseUrl: string = "/api/";
export let base = "";
const port: number = 5000;

if (process.env.NODE_ENV === "development") {
    // baseUrl = `http://192.168.1.64:${port}${baseUrl}`;
    // base = `http://192.168.1.64:${port}`;
    baseUrl = `http://192.168.1.130:${port}${baseUrl}`;
    base = `http://192.168.1.130:${port}`;
    // baseUrl = `http://localhost:${port}${baseUrl}`;
    // base = `http://localhost:${port}`;
}

export interface IFile {
    _id?: string;
    name: string;
    ext: string;
    url: string;
}

export interface IReview {
    _id?: string;
    userId: string;
    text: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface ILesson {
    _id?: string;
    courseId: string;
    title: string;
    videoUrl: string;
    text: string;
    files?: IFile[];
}

interface IUserPost extends IUser {
    password?: string;
}

export interface IContact {
    name: string;
    email?: string;
    phone?: string;
    comment?: string;
}

class UserService {
    login = async (usernameOrEmail: string, password: string) => {
        const body = await refetch({
            url: `${baseUrl}auth/login`,
            body: { identifier: usernameOrEmail, password },
            method: "POST"
        });
        return body;
    };

    upload = async (file: Blob, token: string) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${baseUrl}media/upload`, {
            method: "POST",
            headers: {
                auth: `Bearer ${token}`
            },
            body: formData
        });
        const data = await res.json();
        return data;
    };

    addUsers = async (user: IUserPost, token: string) => {
        const body = { ...user };
        const res = await refetch({
            url: `${baseUrl}user/register`,
            method: "POST",
            headers: { auth: `Bearer ${token}` },
            body
        });

        return res;
    };

    getUsers = async (token: string) => {
        const headers: any = {};
        if (token) {
            headers.auth = `Bearer ${token}`;
        }
        const users = await refetch({
            url: `${baseUrl}users`,
            headers
        });
        return users;
    };

    getCourses = async (token: string) => {
        const headers: any = {};
        if (token) {
            headers.auth = `Bearer ${token}`;
        }
        const courses = await refetch({
            url: `${baseUrl}courses`,
            headers
        });
        return courses;
    };

    getCoursesAndLessons = async (token: string) => {
        const headers: any = {};
        if (token) {
            headers.auth = `Bearer ${token}`;
        }
        const { courses } = await refetch({
            url: `${baseUrl}courses`,
            headers
        });
        const { lessons } = await refetch({
            url: `${baseUrl}lessons`,
            headers
        });
        return { courses, lessons };
    };

    getNearestCourse = async () => {
        const { course } = await refetch({
            url: `${baseUrl}course-nearest`
        });
        return course;
    };

    getCourse = async (courseId: string, token: string) => {
        const url = `${baseUrl}course?${qs.stringify({ courseId })}`;

        const res = await refetch({
            url,
            headers: { auth: `Bearer ${token}` }
        });
        return res;
    };

    addCourse = async (course: ICourse, token: string) => {
        const body = { ...course };
        const res = await refetch({
            url: `${baseUrl}course`,
            method: "POST",
            headers: { auth: `Bearer ${token}` },
            body
        });

        return res;
    };

    updateCourse = async (course: ICourse, token: string) => {
        const url = `${baseUrl}course?${qs.stringify({
            courseId: course._id
        })}`;
        const res = await refetch({
            url,
            method: "PUT",
            headers: { auth: `Bearer ${token}` },
            body: { ...course }
        });

        return res;
    };

    getLessons = async (token: string) => {
        const headers: any = {};
        if (token) {
            headers.auth = `Bearer ${token}`;
        }
        const lessons = await refetch({
            url: `${baseUrl}lessons`,
            headers
        });
        return lessons;
    };

    addLesson = async (lesson: ILesson, token: string) => {
        const body = { ...lesson };
        const res = await refetch({
            url: `${baseUrl}lesson`,
            method: "POST",
            headers: { auth: `Bearer ${token}` },
            body
        });

        return res;
    };

    updateLesson = async (lesson: ILesson, token: string) => {
        const url = `${baseUrl}lesson?${qs.stringify({
            lessonId: lesson._id
        })}`;
        const res = await refetch({
            url,
            method: "PUT",
            headers: { auth: `Bearer ${token}` },
            body: { ...lesson }
        });

        return res;
    };

    postContact = async (contact: IContact) => {
        const res = await refetch({
            url: `${baseUrl}contacts`,
            body: contact,
            method: "POST"
        });
        return res;
    };
    getContacts = async (token: string) => {
        const { contacts } = await refetch({
            url: `${baseUrl}contacts`,
            headers: { auth: `Bearer ${token}` }
        });
        return contacts;
    };

    deleteCourse = async (courseId: string, token: string) => {
        const url = `${baseUrl}course?${qs.stringify({
            courseId
        })}`;

        const res = await refetch({
            url,
            method: "DELETE",
            headers: { auth: `Bearer ${token}` }
        });

        return res;
    };

    fetchUser = async (token: string) => {
        const res = await refetch({
            url: `${baseUrl}user`,
            headers: { auth: `Bearer ${token}` }
        });
        return res;
    };

    getEvents = async (token: string) => {
        const res = await refetch({
            url: `${baseUrl}events`,
            headers: { auth: `Bearer ${token}` }
        });
        return res;
    };

    addEvent = async (event: IEvent, token: string) => {
        const res = await refetch({
            url: `${baseUrl}event`,
            method: "POST",
            body: event,
            headers: { auth: `Bearer ${token}` }
        });
        return res;
    };

    deleteEvent = async (eventId: string, token: string) => {
        const url = `${baseUrl}event?${qs.stringify({
            eventId
        })}`;
        const res = await refetch({
            url,
            method: "DELETE",
            headers: { auth: `Bearer ${token}` }
        });
        return res;
    };

    getEvent = async (eventId: string, token: string) => {
        const url = `${baseUrl}event?${qs.stringify({
            eventId
        })}`;
        const { event } = await refetch({
            url,
            headers: { auth: `Bearer ${token}` }
        });
        return event;
    };

    updateEvent = async (event: IEvent, token: string) => {
        const url = `${baseUrl}event?${qs.stringify({
            eventId: event._id
        })}`;
        const res = await refetch({
            url,
            method: "PUT",
            headers: { auth: `Bearer ${token}` },
            body: { ...event }
        });

        return res;
    };

    //TODO: token zaebal
    refresh = async (userId: string, refreshToken: string) => {
        const tokens = await refetch({
            url: `${baseUrl}auth/refresh`,
            body: { userId, refreshToken },
            method: "POST"
        });
        return tokens;
    };

    deleteToken = async (userId: string) => {
        const result = await refetch({
            url: `${baseUrl}auth/refresh/reject`,
            body: { userId },
            method: "POST"
        });
        return result;
    };
}

// new UserService().fetchUser(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTQxMWIwY2RlNjEyOTMzYTBkYzU0NmQiLCJpYXQiOjE1ODEzMjc1MTgsImV4cCI6MTU4MTQxMzkxOH0.z4yRzUJv37jBoi7s9TJ-djonOSrTNYIP5_SbnifvDlE"
// );

export default new UserService();
