const { Schema, model } = require("mongoose");
const musicGenre = require("../utils/musicGenre");
const offerType = require("../utils/offerType");
const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    genre: {
      type: String,
      enum: musicGenre,
    },
    profileImg: {
      type: String,
    },
    dateborn: {
      type: Date,
    },
    city: {
      type: String,
      required: [true, 'City is required.']
    },
    offerType: {
      type: String,
      enum: offerType,
    },
    bandFav: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Band",
      },
    ],
   },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
