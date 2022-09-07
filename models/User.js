import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
    },
    about: {
      type: String,
    },
    dob_day: { 
      type: Number,
      required: true,
    },
    dob_month: {
      type: Number,
      required: true,
    },
    dob_year: {
      type: Number,
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
      type: [String]
    },
    matches: {
      type: [String] 
    }
  },
  { timestamps: true, collection: 'users' }
);

export default mongoose.model("User", UserSchema);