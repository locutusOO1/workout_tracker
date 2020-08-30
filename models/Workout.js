const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: {
        type: Array, 
        default: []
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

mongoose.model.exports = Workout;

