const router = require("express").Router();

const db = require("../models");

//most recent workout
router.get("/workout", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$Exercises.duration" } })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//add an exercise
router.put("/workout/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//create new workout
router.post("/workout", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//last 7 days workouts
router.get("workout/range", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    .sort({ day: -1 })
    .limit(7)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
