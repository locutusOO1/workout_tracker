const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname,"public","stats.html"));
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname,"public","exercise.html"));
});

app.post("/api/workouts",({body},res) => {
    console.log(body);
    db.Workout.create(body)
    .then(dbWorkout => {
        console.log(dbWorkout);
    })
    .catch(({ message }) => {
        console.log(message);
    });
});

app.get("/api/workouts",(req,res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`);
});
  