const { Schema, model } = require("mongoose");
const musicGenre = require("../utils/musicGenre");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
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
      type: [],
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
