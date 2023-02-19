const express = require("express");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

const noteRouter = express.Router();

noteRouter.get("/", getNotes);
noteRouter.post("/create", createNote);
noteRouter.patch("/update/:id", updateNote);
noteRouter.delete("/delete/:id", deleteNote);

module.exports = { noteRouter };
