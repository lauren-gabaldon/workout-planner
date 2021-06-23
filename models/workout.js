const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Date,
  exercises: [
    {
      type: { type: "string" },
      name: String,
      duration: Number,
      weight: { type: Number, default: 0 },
      reps: { type: Number, default: 0 },
      sets: { type: Number, default: 0 },
    },
  ],
});
const workout = mongoose.model("workout", WorkoutSchema);

module.exports = workout;
