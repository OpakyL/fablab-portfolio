const { Types, Schema, model } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    hide: { type: Boolean, default: true }
});

module.exports = model("Event", schema);
