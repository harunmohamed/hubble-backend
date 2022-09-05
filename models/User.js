import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    dob_day: {
      type: Number,
      default: 20,
      required: true,
    },
    dob_month: {
      type: Number,
      default: 5,
      required: true,
    },
    dob_year: {
      type: Number,
      default: 2000,
      required: true,
    },
    img_url: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hashtags: {
      type: [{String}]
    },
    matches: {
      type: [{String}]
    }
  },
  { timestamps: true, collection: 'users' }
);

export default mongoose.model("User", UserSchema);