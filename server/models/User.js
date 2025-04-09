const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["reader", "journalist", "admin"],
      default: "reader",
    },
    isSubscribed: { type: Boolean, default: false }, 
    isDeleted: { type: Boolean, default: false },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  {}
);

module.exports = mongoose.model("User", userSchema);
