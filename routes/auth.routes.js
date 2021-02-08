const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, oneOf } = require("express-validator");
const User = require("../models/User");
const Token = require("../models/Token");
const randtoken = require("rand-token");
const router = Router();

const refreshTokens = {};

const initTokens = () => {};

const validation = [
    check("identifier")
        .exists()
        .withMessage("Введите имя пользователя или пароль")
        .isLength({ min: 4 })
        .withMessage(
            "Длина имени пользователя или почты должна быть больше 4 символов"
        )
        .isLength({ max: 30 })
        .withMessage(
            "Длина имени пользователя или почты должна быть меньше 30 символов"
        ),
    oneOf([
        check("identifier")
            .isAlphanumeric()
            .withMessage("Имя пользователя в некорректной форме"),
        check("identifier")
            .isEmail()
            .withMessage("Почта в некорректной форме")
    ]),
    check("password")
        .exists()
        .withMessage("Введите пароль")
        .isLength({ min: 4 })
        .withMessage("Длина пароля или почты должна быть больше 4 символов")
        .isLength({ max: 30 })
        .withMessage("Длина пароля или почты должна быть меньше 30 символов")
        .isAscii()
        .withMessage("Пароль в некорректной форме")
];

// /api/auth/login
router.post(
    "/login",
    validation,
    require("./../middleware/errors.middleware")(
        "Некорректные данные при входе"
    ),
    async (req, res) => {
        try {
            const { identifier, password } = req.body;
            const user = await User.findOne({
                $or: [{ username: identifier }, { email: identifier }]
            });

            if (!user) {
                return res
                    .status(400)
                    .send({ message: "Пользователь не найден" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .send({ message: "Неверные данные, попробуйте снова" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                {
                    expiresIn: "1d"
                }
            );
            const refreshToken = jwt.sign(
                { username: user.username },
                config.get("jwtSecret"),
                { expiresIn: "30d" }
            );
            res.status(200).send({
                token,
                refreshToken,
                userId: user.id,
                role: user.role
            });
        } catch (e) {
            res.status(500).send({ message: `Server error` });
        }
    }
);
// const initTokens = async () => {
//     try {
//         const tokens = await Token.find({}).exec();
//         if (tokens) {
//             tokens.map(({ userId, refreshToken }) => {
//                 refreshTokens[refreshToken] = userId;
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// const saveRefToken = async userId => {
//     try {
//         const refreshToken = randtoken.uid(256);
//         const dbToken = new Token({ refreshToken, userId });
//         await dbToken.save();
//         refreshTokens[refreshToken] = userId;
//         return refreshToken;
//     } catch (error) {
//         return false;
//     }
// };

// const deleteRefToken = async refreshToken => {
//     try {
//         if (refreshToken in refreshTokens) {
//             delete refreshTokens[refreshToken];
//             await Token.findOneAndDelete({ refreshToken }).exec();
//         }
//         return true;
//     } catch (error) {
//         return false;
//     }
// };

// const refreshUserToken = async (userId, refreshToken) => {
//     if (
//         refreshToken in refreshTokens &&
//         refreshTokens[refreshToken] === userId
//     ) {
//         const newToken = jwt.sign({ userId }, config.get("jwtSecret"), {
//             expiresIn: "1d"
//         });
//         if (await deleteRefToken(refreshToken)) {
//             const refToken = await saveRefToken(userId);
//             return { refreshToken: refToken, token: newToken };
//         }
//         throw "error";
//     } else {
//         return false;
//     }
// };

// router.post("/refresh", async (req, res) => {
//     try {
//         const { userId, refreshToken } = req.body;
//         const hz = await refreshUserToken(userId, refreshToken);
//         res.send({ ...hz });
//     } catch (error) {
//         res.status(500).send({ message: `Server error ${error.message}` });
//     }
// });

// router.post("/refresh/reject", async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const hz = await deleteRefToken(userId);
//         res.send({ hz });
//     } catch (error) {
//         res.status(500).send({ message: `Server error ${error.message}` });
//     }
// });

// /api/auth/register
// router.post(
//     "/register",
//     [
//         check("email", "Некорректный email").isEmail(),
//         check("password", "Минимальная длина пароля 6 символов").isLength({
//             min: 6
//         }),
//         check("username")
//             .exists()
//             .withMessage("Требуется имя пользователя")
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: "Некорректный данные при регистрации"
//                 });
//             }

//             const { email, password, username } = req.body;

//             const candidate = await User.findOne({
//                 $or: [{ username }, { email }]
//             });

//             if (candidate) {
//                 return res
//                     .status(400)
//                     .json({ message: "Такой пользователь уже существует" });
//             }

//             const hashedPassword = await bcrypt.hash(password, 12);
//             const user = new User({
//                 username,
//                 email,
//                 password: hashedPassword
//             });

//             await user.save();
//             res.status(201).json({ message: "Пользователь создан" });
//         } catch (e) {
//             res.status(500).json({
//                 message: "Что-то пошло не так, попробуйте снова"
//             });
//         }
//     }
// );

module.exports = { router, initTokens };
