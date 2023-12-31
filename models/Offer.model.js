const { Schema, model } = require("mongoose");
const musicGenre = require("../utils/musicGenre");
const offerType = require("../utils/offerType");
const mongoose = require("mongoose");

const offerSchema = new Schema({
    band: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Band",
    },
    title:{
      type: String,
      required: [true, 'Title is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    genre: {
      type: [String],
      enum: musicGenre,
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required']
    },
    offerType: {
        type: [String],
        enum: offerType
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