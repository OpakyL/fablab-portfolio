const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "yandex",
    auth: { user: "MisheviyOpakyL@yandex.ru", pass: "misheviy777opakyl" }
});

const from = "MisheviyOpakyL@yandex.ru";
const subject = "Fablab";

const fs = require("fs").promises;
const sendMail = options =>
    new Promise((res, rej) => {
        transporter.sendMail({ from, subject, ...options }, function(
            error,
            info
        ) {
            if (error) {
                console.log(error);
                rej(error);
            } else {
                res();
                console.log("Email sent: " + info.response);
            }
        });
    });

const handlebars = require("handlebars");

const readHtmlFile = async (htmlfilepath, replacements) => {
    const html = `${await fs.readFile(htmlfilepath)}`;
    const template = handlebars.compile(html);
    const htmlToSend = template(replacements);
    return htmlToSend;
};

const contactEmail = "lpm-format@mail.ru";

module.exports = { sendMail, readHtmlFile, contactEmail };
