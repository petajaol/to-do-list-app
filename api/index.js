const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000 || process.env.PORT;
const choresRouter = require("./routes/chores");

app.use(cors());
app.use(express.json());

app.use("/chores", choresRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the root!" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
