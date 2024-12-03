// models/User.js
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fatigueLimit: { type: Number, default: 3600 },
  notes: [{ type: String }],
  studySessions: [{ startTime: Date, endTime: Date }],
  breakTime: { type: Number, default: 3600 },
});
// Pre-save hook to hash passwords before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
