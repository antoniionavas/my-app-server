const { Schema, model } = require("mongoose");
const musicGenre = require("../utils/musicGenre");
const mongoose = require("mongoose");

const bandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true,
      },
    components: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    genre: {
        type: [String],
        enum: musicGenre,
      },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
    },
    foundationDate: {
      type: Date,
    },
 });

const Band = model("Band", bandSchema);

module.exports = Band;