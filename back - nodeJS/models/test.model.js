const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const testSchema = new Schema({
    questions: [{
        question: { type: String },
        answers: [{
            answerNumber: { type: Number },
            answer: { type: String },
            answerPicture: { type: String },
        }],
        openQuestion: { type: Boolean },
        correctAnswer: { type: Number },
        mandatoryQuestion: { type: Boolean },
        image: { type: String },
    }],
    openTest: { type: Boolean },
    test_name: { type: String },
    // duration: { type: Number },
    time_days: { type: Number },
    time_hours: { type: Number },
    time_minutes: { type: Number },
    lastOpened: { type: Date },
    description: { type: String },
    creator: { type: String },
    backgroundImage: { type: String },
    color: { type: String },
    deleted: { type: Boolean },
    kind: { type: String },
    targetAudience: { type: String },
    status: { type: String },
    email: { type: String },
    copied: { type: String },
    displayVideo: { type: Boolean },
    video: { type: String },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;