const { Schema, model, Types } = require("mongoose");
const File = require('./../models/File');
const fs = require('fs');

const removeLessonFiles =async (ids) => {
    for (let i = 0; i < ids.length; i++) {
        const element = ids[i];
        const file = await File.findById(element._id).exec();
        fs.unlink(`.${file.url}`);
    }
}

const schema = new Schema({
    courseId: { type: Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    text: { type: String, required: true },
    files: [{ type: Types.ObjectId, ref: "File" }]
});


schema.pre("delete", async next => {
    // console.log("delete");
    // let id = this.getQuery()["_id"];
    // const [lesson] = await this.find({ _id: Types.ObjectId(id) }).exec();
    // removeLessonFiles(lesson.files)
    next();
});

module.exports = model("Lesson", schema);
