const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    comment: { type: String }
});

module.exports = model("Contact", schema);
