const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const Event = require("./../models/Event");
const { Types } = require("mongoose");
const { isTeacher } = require("./../utils/role");
const authMiddleware = require("./../middleware/auth.middleware");
const errorMiddleware = require("./../middleware/errors.middleware");

const fetchEvents = async (options, role) => {
    let res;
    if (isTeacher(role)) {
        res = await Event.find(options).sort({ date: -1 });
    } else {
        res = await Event.find({ ...options, hide: false }).sort({ date: -1 });
    }
    return res;
};

router.get("/events", authMiddleware({ notAuthed: true }), async (req, res) => {
    try {
        let role;
        if (req.user) {
            role = req.user.role;
        }
        const events = await fetchEvents({}, role);
        res.status(200).send({ events });
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
});

router.get("/event", authMiddleware({ notAuthes: true }), async (req, res) => {
    try {
        const { eventId } = req.query;
        const [event] = await fetchEvents({ _id: eventId }, "STUDENT");
        res.status(200).send({ event });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
    }
});

const validateEvent = [
    check("title", "Введите заголовок события").exists(),
    check("description", "Введите описание события").exists(),
    check("date", "Введите дату события").exists()
];

router.post(
    "/event",
    validateEvent,
    errorMiddleware("Данные события заданы некорректно"),
    authMiddleware({ isTeacher: true }),
    async (req, res) => {
        try {
            const eventData = { ...req.body };
            eventData.date = new Date(req.body.date);

            const event = new Event(eventData);
            await event.save();
            res.status(200).send({
                message: "Событие успешно добавлено",
                event
            });
        } catch (error) {
            res.status(500).send({ message: "Server error" });
        }
    }
);

router.delete(
    "/event",
    authMiddleware({ isTeacher: true }),
    async (req, res) => {
        try {
            const { eventId } = req.query;
            console.log(eventId);
            await Event.deleteOne({ _id: eventId });
            res.status(200).send({
                message: "Событие успешно удалено",
                done: true
            });
        } catch (error) {
            res.status(500).send({ message: "Server error", done: false });
        }
    }
);

router.put(
    "/event",
    authMiddleware({ isTeacher: true }),
    validateEvent,
    errorMiddleware("Данные события заданы некорректно"),
    async (req, res) => {
        try {
            const { eventId } = req.query;
            const eventData = { ...req.body };
            eventData.date = new Date(req.body.date);
            await Event.updateOne({ _id: Types.ObjectId(eventId) }, eventData);

            res.status(200).send({
                message: "Событие успешно изменено"
            });
        } catch (error) {
            res.status(500).send({ message: "Server error" });
        }
    }
);

module.exports = router;
