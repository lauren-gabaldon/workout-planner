const router = require("express").Router();

const db = require("../models");

//most recent workout
router.get("/workouts", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
//add an exercise
router.put("/workouts/:id", (req, res) => {
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
router.post("/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//last 7 days workouts
router.get("workouts/range", (req, res) => {
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
