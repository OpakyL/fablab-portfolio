const { Schema, model, Types } = require("mongoose");
const File = require("./../models/File");
const fs = require("fs");

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    picture: { type: Types.ObjectId, ref: "File" },
    courses: [{ type: Types.ObjectId, ref: "Course" }],
    role: { type: String, enum: ["STUDENT", "TEACHER"], default: "STUDENT" }
});

schema.pre("deleteOne", async function(next) {
    let id = this.getQuery()["_id"];
    const [user] = await this.find({ _id: Types.ObjectId(id) })
        .populate("picture")
        .exec();

    if (user.picture) {
        await File.deleteOne({ _id: Types.ObjectId(user.picture._id) });
        fs.unlink(`.${user.picture.url}`);
    }

    next();
});

module.exports = model("User", schema);

// const users = [
//     {
//        "role": "ADMIN",
//        "username": "admin",
//        "email": "MisheviyOpakyL@yandex.ru",
//        "password": "$2a$12$UcT4w3j1yQNbYCx2h8RjVO6ry/Eau8XJj5fZh88Q/.OxiA1zr5bNe"
//     },
//     {
//        "role": "TEACHER",
//        "username": "teacher",
//        "email": "teacher@teacher.com",
//        "password": "$2a$12$vVJnuQqLMVyUbakZGKX/uuRzyfl6d2sPNejuw3GEjWxIoKzeIAuRu"
//     },
//     {
//        "courses": [],
//        "role": "STUDENT",
//        "username": "username",
//        "email": "username@mail.com",
//        "firstname": "Namae",
//        "lastname": "Eaman",
//        "password": "$2a$12$kmRYaKgi9Vd0X21gDnjFEe/0oz4kCL21q647GHLUgwMqkbShoToDa"
//     }
//  ];