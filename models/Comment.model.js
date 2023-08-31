const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  valoration: String,
  date: {
    type: Date,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;