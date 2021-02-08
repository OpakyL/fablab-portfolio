const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const Contact = require("./../models/Contacts");

const { readHtmlFile, sendMail, contactEmail } = require("./../utils/mailer");

const auth = require("./../middleware/auth.middleware");

router.post(
    "/contacts",
    auth({ notAuthed: true }),
    [
        check("name")
            .exists()
            .withMessage("Ведите контактное имя")
    ],
    require("./../middleware/errors.middleware")(
        "Некорректные контактные данные"
    ),
    async (req, res) => {
        try {
            const { body } = req;
            const { name } = body;
            const contactData = { name };
            if (body.phone) {
                contactData.phone = body.phone;
            }
            if (body.email) {
                contactData.email = body.email;
            }
            if (body.comment) {
                contactData.comment = body.comment;
            }

            const contact = new Contact(contactData);
            await contact.save();
            const replace = {
                ...contactData
            };
            sendMail({
                to: contactEmail,
                html: await readHtmlFile("./utils/contact.html", replace)
            });

            res.status(200).send({ message: "Спасибо за то что вы есть" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: `Server error ${error.message}` });
        }
    }
);

router.get("/contacts", auth({ isTeacher: true }), async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: 1 });
        res.status(200).send({ contacts });
    } catch (error) {
        res.status(500).send({ message: `Server error ${error.message}` });
    }
});

module.exports = router;
