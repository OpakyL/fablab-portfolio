const { Schema, model, Types } = require("mongoose");

const tokenSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    refreshToken: { type: String, required: true }
});

module.exports = model("refreshTokens", tokenSchema);
