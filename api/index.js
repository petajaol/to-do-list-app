const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the root!" });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
