const { Router } = require("express");
const { check } = require("express-validator");
const User = require("./../models/User");
const Course = require("./../models/Course");
const { Types } = require("mongoose");
const bcrypt = require("bcryptjs");
const authMiddleware = require("./../middleware/auth.middleware");
const errorMiddleware = require("./../middleware/errors.middleware");
const { isTeacher, isAdmin } = require("./../utils/role");
const fs = require("fs").promises;

const router = Router();

router.get("/users", authMiddleware({ isTeacher: true }), async (req, res) => {
    try {
        const users = await User.find({ role: "STUDENT" }).exec();
        res.status(200).send({ students: users });
    } catch (error) {
        res.status(500).send({ message: `Server error` });
    }
});

router.get("/teachers", authMiddleware({ isAdmin: true }), async (req, res) => {
    try {
        const users = await User.find({ role: "TEACHER" }).exec();
        res.status(200).send({ students: users });
    } catch (error) {
        res.status(500).send({ message: `Server error` });
    }
});

router.get(
    "/user",
    authMiddleware({ isTeacher: true, me: true }),
    async (req, res) => {
        try {
            const { user } = req;
            const {
                courses,
                username,
                firstname,
                lastname,
                picture,
                email
            } = user;
            res.status(200).send({
                username,
                email,
                firstname,
                lastname,
                picture,
                courses
            });
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

const validatePwd = check("password")
    .exists()
    .withMessage("Введите пароль")
    .isLength({ min: 4 })
    .withMessage("Длина пароля или почты должна быть больше 4 символов")
    .isLength({ max: 30 })
    .withMessage("Длина пароля или почты должна быть меньше 30 символов")
    .isAscii()
    .withMessage("Пароль в некорректной форме");

const validateUser = [
    check("username")
        .exists()
        .withMessage("Введите имя пользователя")
        .isLength({ min: 4 })
        .withMessage("Длина имени пользователя должна быть больше 4 символов")
        .isLength({ max: 30 })
        .withMessage("Длина имени пользователя должна быть меньше 30 символов")
        .isAlphanumeric()
        .withMessage("Имя пользователя в некорректной форме"),
    check("email")
        .exists()
        .isEmail()
        .withMessage("Почта в некорректной форме"),
    validatePwd
];

const { sendMail } = require("./../utils/mailer");

router.post(
    "/user/register",
    validateUser,
    errorMiddleware("Данные пользователя заданы в некорректной форме"),
    authMiddleware({ isTeacher: true }),
    async (req, res) => {
        try {
            const { body } = req;
            const { username, email, password } = body;
            const userData = {
                username,
                email
            };
            if (body.firstname) {
                userData.firstname = body.firstname;
            }
            if (body.lastname) {
                userData.lastname = body.lastname;
            }
            if (body.courses) {
                if (body.courses.length > 0) {
                    userData.courses = body.courses;
                }
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ ...userData, password: hashedPassword });
            await user.save();
            const replace = {
                username
            };
            sendMail({
                to: email,
                html: await readHtmlFile("./utils/mailer.html", replace)
            });
            res.status(200).send({ message: "Ученик успешно добавлен" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `Server error ` });
        }
    }
);

//TODO USER PUT METHOD
router.put(
    "/user",
    authMiddleware({ isTeacher: true, me: true }),
    async (req, res) => {
        try {
            const {
                body,
                query,
                user: { role, _id }
            } = req;
            const userData = {};
            if (body.username) {
                userData.username = body.username;
            }
            if (body.email) {
                userData.email = body.email;
            }
            if (body.firstname) {
                userData.firstname = body.firstname;
            }
            if (body.lastname) {
                userData.lastname = body.lastname;
            }
            if (body.courses && isTeacher(role)) {
                userData.courses = body.courses;
            }

            //TODO: user avatar
            if (body.picture) {
                userData.picture = body.picture;
            }
            let userid = _id;
            if (isTeacher(role)) {
                const { userId } = query;
                userid = userId;
            }
            await User.updateOne({ _id: userid }, userData).exec();

            res.status(200).send({
                message: "Пользователь успешно изменен"
            });
        } catch (error) {
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.post(
    "/user/delete",
    authMiddleware({ me: true, isTeacher: true }),
    async (req, res) => {
        try {
            const { user } = req;
            const {
                body: { password },
                query: { userId }
            } = req;
            if (isTeacher(user.role)) {
                await User.deleteOne({ _id: Types.ObjectId(userId) }).exec();
                res.status(200).send({
                    message: "Пользователь успешно удален",
                    user
                });
            } else if (await bcrypt.compare(password, user.password)) {
                await User.deleteOne({ _id: Types.ObjectId(user._id) }).exec();
                res.status(200).send({
                    message: "Пользователь успешно удален"
                });
            } else {
                res.status(400).send({ message: "Неверный пароль" });
            }
        } catch (error) {
            res.status(500).send({ message: `Server error` });
        }
    }
);

router.post(
    "/teacher/register",
    validateUser,
    errorMiddleware("Данные учителя заданы некорректно"),
    authMiddleware({ isAdmin: true }),
    async (req, res) => {
        try {
            const { username, email, password, firstname, lastname } = req.body;
            const teacherData = {
                username,
                email,
                firstname,
                lastname,
                role: "TEACHER"
            };
            const hashedPassword = await bcrypt.hash(password, 12);
            const teacher = new User({
                ...teacherData,
                password: hashedPassword
            });
            await teacher.save();
            res.status(200).send({ message: "Учитель успешно добавлен" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `Server error ` });
        }
    }
);

router.delete(
    "/teacher",
    authMiddleware({ isAdmin: true }),
    async (req, res) => {
        try {
            // const { teacherId } = req.query;
            // const teacher = await User.findByIdAndDelete(teacherId);
            // const courses = await Course
            // if (teacherId)
            // const { username, email, password, firstname, lastname } = req.body;
            // const teacherData = {
            //     username,
            //     email,
            //     firstname,
            //     lastname,
            //     role: "TEACHER"
            // };
            // const hashedPassword = await bcrypt.hash(password, 12);
            // const teacher = new User({
            //     ...teacherData,
            //     password: hashedPassword
            // });
            // await teacher.save();
            // res.status(200).send({ message: "Учитель успешно добавлен" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `Server error ` });
        }
    }

    // "mongoUri": "mongodb+srv://misheviyopakyl:H%23Nxdoso%5Eyw%40SYmB3zYNEX%40S@cluster0-dm6mr.mongodb.net/fablab?retryWrites=true&w=majority",
);

module.exports = router;
