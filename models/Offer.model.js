const { Schema, model } = require("mongoose");
const musicGenre = require("../utils/musicGenre");

const offerSchema = new Schema({
    band: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Band",
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    genre: {
      type: String,
      enum: musicGenre,
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required']
    },
    offerType: {
        type: [],
    },
    initialDate: {
      type: Date,
    },
    finalDate: {
        type: Date,
    },
    subscribers: [], 
  });


const Offer = model("Offer", offerSchema);

module.exports = Offer;