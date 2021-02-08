const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("./../models/User");
const Course = require("./../models/Course");
const Lesson = require("./../models/Lesson");
const { isAdmin, isStudent, isTeacher } = require("./../utils/role");

const forbidden = options => {
    if (Object.entries(options).length === 0) {
        throw new Error("FORBIDDEN");
    }
};

module.exports = inputOptions => async (req, res, next) => {
    const options = { ...inputOptions };
    try {
        let token;
        if (req.headers.auth) {
            token = req.headers.auth.split(" ")[1]; //Bearer token
        }
        if (!token) {
            throw new Error("not authenticated");
        }

        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const user = await User.findById(decoded.userId)
            .populate("picture")
            .exec();
        if (!user) {
            throw new Error("not authenticated");
        }

        const { role } = user;
        req.user = user;
        if (options.isAdmin) {
            delete options.isAdmin;
            if (isAdmin(role)) {
                next();
                return;
            }
            forbidden(options);
        }
        if (options.isTeacher) {
            delete options.isTeacher;
            if (isTeacher(role)) {
                next();
                return;
            }
            forbidden(options);
        }
        if (options.isStudent) {
            delete options.isStudent;
            if (isStudent(role)) {
                next();
                return;
            }
            forbidden(options);
        }
        if (options.isStudent) {
            delete options.isStudent;
            if (isStudent(role)) {
                next();
                return;
            }
            forbidden(options);
        }
        if (options.me) {
            delete options.me;
            next();
            return;
        }
        if (options.myCourse) {
            delete options.myCourse;
            const {
                query: { courseId }
            } = req;
            const course = await Course.findOne({
                _id: Types.ObjectId(courseId),
                teacherId: Types.ObjectId(user._id)
            })
                .populate("thumbnail")
                .exec();
            if (course) {
                req.body.oldCourse = course;
                next();
                return;
            }
            forbidden(options);
        }
        if (options.myLesson) {
            delete options.myLesson;
            const {
                query: { lessonId }
            } = req;
            const lesson = await Lesson.findById(lessonId)
                .populate("courseId")
                .populate("files")
                .exec();
            if (lesson.courseId.teacherId === userId) {
                req.body.oldLesson = lesson;
                next();
                return;
            }
            forbidden();
        }
        if (options.hasCourse) {
            delete options.myLesson;
            const {
                query: { courseId }
            } = req;
            if (user.courses.includes(courseId)) {
                next();
                return;
            }
            forbidden(options);
        }
        if (options.postLesson) {
            delete options.postLesson;
            const { courseId } = req.body;
            const oldCourse = await Course.find({
                _id: courseId,
                teacherId: user._id
            }).exec();
            if (oldCourse) {
                req.body.oldCourse = oldCourse;
                next();
                return;
            }
            forbidden(options);
        }
        if (options.hasLesson) {
            delete options.hasLesson;
            const {
                query: { lessonId }
            } = req;
            const lesson = await Lesson.findById(lessonId).exec();
            if (
                user.courses.includes(lesson.courseId) ||
                isTeacher(user.role)
            ) {
                req.body.lesson = lesson;
                next();
                return;
            }
            forbidden(options);
        }
        next();
    } catch (error) {
        switch (error.message) {
            case "FORBIDDEN":
                res.status(403).send({
                    message: "У вас нет доступа к данному запросу"
                });
                break;
            case "not authenticated":
                if (options.notAuthed) {
                    next();
                    return;
                }
                res.status(401).send({
                    message: "Нет авторизации"
                });
                break;
            case "jwt expired":
                res.status(401).send({ message: "Время сессии истекло" });
            default:
                res.status(500).send({ message: "Server error" });
                break;
        }
    }
};
// teacher
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTMzZTU0N2E0NGRhMTJkYTA5ZWQzMTAiLCJpYXQiOjE1ODEzNTU1MDksImV4cCI6MTU4MTQ0MTkwOX0.Hbi95J_O_hx-DMG32anVJEAmtkiUwgmwEFOAwNFJxPE
// user
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTMzZTQyMjQwODI3ZjM0MmNmMTI0ZWIiLCJpYXQiOjE1ODEzNTU1NDAsImV4cCI6MTU4MTQ0MTk0MH0.NYV7ddOpcgPnW_IC_js1X3LxpYEZ4wzwOrqrzrS_Mj8
// eaman
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTQxMWIwY2RlNjEyOTMzYTBkYzU0NmQiLCJpYXQiOjE1ODEzNTU1NjcsImV4cCI6MTU4MTQ0MTk2N30.35qdK6rjCIU1d3wXgxEu9zyMHXoiPZr-rmwGtSR3rgY
