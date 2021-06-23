const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const logger = require("morgan");
const app = express();
const routes = require("./routes");
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}..`);
});
//comment
