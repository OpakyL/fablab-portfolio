const { Schema, model, Types } = require("mongoose");
const Review = require("./Review");
const Lesson = require("./Lesson");
const File = require("./File");
const fs = require("fs").promises;

const schema = new Schema({
    title: { type: String, required: true },
    thumbnail: { type: Types.ObjectId, required: true, ref: "File" },
    teacherId: { type: Types.ObjectId, required: true, ref: "User" },
    shortDescr: { type: String, required: true },
    longDescr: { type: String, required: true },
    price: { type: String, required: true },
    reviews: [{ type: Types.ObjectId, ref: "Review" }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    hide: { type: Boolean, default: true, required: true }
});

schema.pre("deleteOne", async function(next) {
    let id = this.getQuery()["_id"];
    const [course] = await this.find({ _id: Types.ObjectId(id) }).exec();
    await Review.deleteMany({ courseId: Types.ObjectId(course._id) }).exec();
    await Lesson.deleteMany({ courseId: Types.ObjectId(course._id) }).exec();
    const file = await File.findOneAndDelete({
        _id: Types.ObjectId(course.thumbnail)
    }).exec();
    fs.unlink(`.${file.url}`);
    next();
});

module.exports = model("Course", schema);
