const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String },
    ext: { type: String },
    url: { type: String, required: true, unique: true }
});

module.exports = model("File", schema);
