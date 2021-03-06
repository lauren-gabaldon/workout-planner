const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: { type: "string" },
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});

const exercise = mongoose.model("exercise", ExerciseSchema);

module.exports = exercise;
//comment
