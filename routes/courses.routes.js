const { Router } = require("express");
const { Types } = require("mongoose");
const { check, body } = require("express-validator");
const fs = require("fs").promises;
const Course = require("../models/Course");
const File = require("../models/File");
const { isTeacher } = require("./../utils/role");
const authMiddleware = require("./../middleware/auth.middleware");
const errorMiddleware = require("./../middleware/errors.middleware");

const router = Router();

const fetchCourse = async (options, role) => {
    let res;
    if (isTeacher(role)) {
        res = await Course.find(options)
            .sort({ startDate: 1 })
            .populate("thumbnail")
            .populate("reviews")
            .exec();
    } else {
        res = await Course.find({ ...options, hide: false })
            .sort({ startDate: 1 })
            .populate("thumbnail")
            .populate("reviews")
            .exec();
    }
    return res;
};

router.get(
    "/courses",
    authMiddleware({ notAuthed: true }),
    async (req, res) => {
        try {
            let role;
            if (req.user) {
                role = req.user.role;
            }
            const courses = await fetchCourse({}, role);
            res.status(200).send({
                courses
            });
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

router.get("/course", authMiddleware({ notAuthed: true }), async (req, res) => {
    try {
        let role;
        if (req.user) {
            role = req.user.role;
        }
        const { courseId } = req.query;

        const [course] = await fetchCourse(
            { _id: Types.ObjectId(courseId) },
            role
        );

        if (!course) {
            res.status(400).send({ message: "Курс не найден" });
        }

        res.status(200).send({ course });
    } catch (error) {
        res.status(500).send({ message: `Server error` });
    }
});

const moment = require("moment");
const nearest = require("nearest-date");
router.get(
    "/course-nearest",
    authMiddleware({ notAuthed: true }),
    async (req, res) => {
        try {
            let role;
            if (req.user) {
                role = req.user.role;
            }

            const courses = await fetchCourse({}, role);

            if (!courses) {
                res.status(400).send({ message: "Курс не найден" });
                return;
            }
            const index = nearest(
                courses.map(({ _doc }) => _doc.startDate),
                new Date()
            );

            res.status(200).send({ course: courses[index] });
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

const validateThumbnail = body("thumbnail").custom(
    async (thumbnail, { req }) => {
        try {
            if (thumbnail.url) {
                const { url } = thumbnail;
                const preview = await File.findOne({ url }).exec();
                if (!preview) {
                    return Promise.reject(
                        "Please provide thumbnail correct with url field"
                    );
                } else {
                    req.body.thumbnail = preview;
                }
            } else {
                return Promise.reject(
                    "Please provide thumbnail with url field"
                );
            }
        } catch (error) {
            return Promise.reject("Please provide thumbnail with url field");
        }
    }
);

const validateCourse = [
    check("title", "Введите заголовок").exists(),
    check("shortDescr", "Введите описание").exists(),
    check("longDescr", "Введите описание").exists(),
    check("price", "Введите цену").exists(),
    check("startDate", "Введите изначальную дату").exists(),
    check("endDate", "Введите конечную дату").exists(),
    check("hide", "Please provide hide field in your request").isBoolean()
];

router.post(
    "/course",
    authMiddleware({ isTeacher: true }),
    validateThumbnail,
    validateCourse,
    errorMiddleware("Некорректные данные курса"),
    async (req, res) => {
        try {
            const {
                body,
                user: { _id: teacherId }
            } = req;
            const {
                title,
                thumbnail,
                shortDescr,
                longDescr,
                price,
                startDate,
                endDate,
                hide
            } = body;
            const course = new Course({
                title,
                thumbnail: Types.ObjectId(thumbnail._id),
                teacherId: Types.ObjectId(teacherId),
                shortDescr,
                endDate,
                startDate,
                longDescr,
                price,
                hide
            });
            const data = await course.save();
            data.thumbnail = thumbnail;
            res.status(200).send({
                message: "Курс успешно добавлен",
                data
            });
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

router.put(
    "/course",
    validateThumbnail,
    validateCourse,
    errorMiddleware("Некорректные данные курса"),
    authMiddleware({ myCourse: true }),
    async (req, res) => {
        try {
            const {
                body,
                query: { courseId }
            } = req;
            const {
                thumbnail: { _id, url },
                oldCourse,
                title,
                shortDescr,
                longDescr,
                price,
                startDate,
                endDate,
                hide
            } = body;
            await Course.updateOne(
                { _id: courseId },
                {
                    title,
                    endDate,
                    startDate,
                    thumbnail: Types.ObjectId(_id),
                    shortDescr,
                    longDescr,
                    price,
                    hide
                }
            );
            if (oldCourse.thumbnail.url !== url) {
                fs.unlink(`.${oldCourse.thumbnail.url}`);
                await File.deleteOne({ url: oldCourse.thumbnail.url }).exec();
            }
            const data = await Course.findById(courseId)
                .populate("thumbnail")
                .exec();
            res.status(200).send({ message: "Курс успешно обновлен", data });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.delete(
    "/course",
    authMiddleware({ myCourse: true }),
    async (req, res) => {
        try {
            const {
                query: { courseId }
            } = req;
            await Course.deleteOne({
                _id: courseId
            }).exec();
            res.status(200).send({ message: "Курс успешно удален" });
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

module.exports = router;
