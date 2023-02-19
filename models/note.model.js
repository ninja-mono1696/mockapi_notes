const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };