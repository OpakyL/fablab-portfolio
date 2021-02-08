const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    teacherId: { type: Types.ObjectId, required: true, ref: "User" },
    lessonId: { type: Types.ObjectId },
    title: { type: String },
    text: { type: String },
    files: [{ type: Types.ObjectId, ref: "File" }]
});

module.exports = model("Message", schema);
