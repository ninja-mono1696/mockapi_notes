const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
