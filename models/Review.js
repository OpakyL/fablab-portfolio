const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    courseId: { type: Types.ObjectId, required: true, ref: "Course" },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    text: { type: String },
    rating: { type: Number, min: 0, max: 5 }
});

module.exports = model("Review", schema);
