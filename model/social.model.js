const mongoose = require("mongoose");

const socialSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        device: {
            type: String,
            enum: {
                values: ["PC", "TABLET", "MOBILE"],
                message: `{values} is not supported provide "PC"or "TABLET"or "MOBILE" `
            }
        },
        userID: { type: String }
    },
  { versionKey: false }
);

const SocialModel = mongoose.model("social", socialSchema);

module.exports = { SocialModel };
