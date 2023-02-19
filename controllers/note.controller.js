const { NoteModel } = require("../models/note.model");

const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find({ author: req.body.author });
    res.send(notes);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    await NoteModel.create(req.body);
    res.send({ msg: "New note has been created" });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  console.log(note);
  const userID_in_note = note.author;
  const userID_making_req = req.body.author;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate(id, req.body);
      res.send({ msg: `Note with id: ${id} has been updated` });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userID_in_note = note.author;
  const userID_making_req = req.body.author;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndDelete(id);
      res.send({ msg: `Note with id: ${id} has been deleted` });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
