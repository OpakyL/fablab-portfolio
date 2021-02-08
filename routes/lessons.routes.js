const { Router } = require("express");
const { check, body } = require("express-validator");
const { Types } = require("mongoose");
const User = require("./../models/User");
const authMiddleware = require("./../middleware/auth.middleware");
const Lesson = require("./../models/Lesson");
const Course = require("./../models/Course");
const File = require("./../models/File");
const { isTeacher } = require("./../utils/role");
const router = Router();

router.get(
    "/lessons",
    authMiddleware({ isTeacher: true, hasCourse: true }),
    async (req, res) => {
        try {
            const { role } = req.user;
            if (isTeacher(role)) {
                const lessons = await Lesson.find({})
                    .populate("files")
                    .exec();
                res.status(200).send({ lessons });
                return;
            }
            const { courseId } = req.query;
            const lessons = await Lesson.find({
                courseId: Types.ObjectId(courseId)
            })
                .populate("files")
                .exec();
            if (lessons.length === 0) {
                res.status(200).send({ message: "Уроки курса не найдены" });
                return;
            }
            res.status(200).send({ lessons });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.get("/lesson", authMiddleware({ hasLesson: true }), async (req, res) => {
    try {
        const { lesson } = req.body;
        res.status(200).send({ lesson });
    } catch (error) {
        res.status(500).send({ message: `Server error ${error.message}` });
    }
});

const errorMiddleware = require("./../middleware/errors.middleware");

const validateLesson = [
    check("title")
        .exists()
        .withMessage("Введите заголовок урока"),
    check("videoUrl")
        .exists()
        .withMessage("Введите ссылку на видео урока"),
    check("text")
        .exists()
        .withMessage("Введите текст урока")
    // check("text").exists().withMessage("Введите текст урока")
];

router.post(
    "/lesson",
    validateLesson,
    errorMiddleware("Некорректые данные урока"),
    authMiddleware({ postLesson: true, isAdmin: true }),
    async (req, res) => {
        try {
            const { courseId, title, files, videoUrl, text } = req.body;
            // console.log(files);
            const lesson = new Lesson({
                courseId,
                title,
                videoUrl,
                text,
                files
            });
            const data = await lesson.save();
            const response = JSON.parse(JSON.stringify(data));
            response.files = files;
            res.status(200).send({
                message: "Урок успешно добавлен",
                data: response
            });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.put(
    "/lesson",
    validateLesson,
    errorMiddleware("Некорректые данные урока"),
    authMiddleware({ myLesson: true, isAdmin: true }),
    async (req, res) => {
        try {
            const { oldLesson, title, files, videoUrl, text } = req.body;
            const data = Lesson.findByIdAndUpdate(oldLesson._id, {
                title,
                files,
                videoUrl,
                text
            });
            data.files = files;
            res.status(200).send({ message: "Урок успешно изменен", data });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.delete(
    "/lesson",
    authMiddleware({ myLesson: true, isAdmin: true }),
    async (req, res) => {
        try {
            const { oldLesson } = req.body;
            console.log(oldLesson);
            await Lesson.deleteOne({ _id: oldLesson._id });
            res.status(200).send({ message: "Урок успешно удален", data });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

module.exports = router;
