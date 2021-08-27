const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    userName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    testToCheck: [{
        test_name: { type: String },
        questions: [{
            question: { type: String, required: true },
            answers: [{
                answerNumber: { type: Number },
                answer: { type: String },
            }],
            openQuestion: { type: Boolean },
            correctAnswer: { type: Number, required: true },

        }],
        // duration: { type: Number, required: true },
        time_days: { type: Number, required: true },
        time_hours: { type: Number, required: true },
        time_minutes: { type: Number, required: true },
        lastOpened: { type: Date },
        description: { type: String },
        openTest: { type: Boolean },

        answersArray: [{
            questionNumber: { type: Number },
            studentAnswer: { type: String },
            is_correct: { type: Boolean },
            gradeOpenQuest: { type: Number }
        }],
        multyQuestion_grade: { type: Number },
        grade: { type: Number },
    }],

    checkedTest: [{
        test_name: { type: String },
        questions: [{
            question: { type: String, required: true },
            answers: [{
                answerNumber: { type: Number },
                answer: { type: String },
            }],
            openQuestion: { type: Boolean },
            correctAnswer: { type: Number, required: true }
        }],
        // duration: { type: Number, required: true },
        time_days: { type: Number, required: true },
        time_hours: { type: Number, required: true },
        time_minutes: { type: Number, required: true },
        lastOpened: { type: Date },
        description: { type: String },
        openTest: { type: Boolean },

        answersArray: [{
            questionNumber: { type: Number },
            studentAnswer: { type: String },
            is_correct: { type: Boolean },
            gradeOpenQuest: { type: Number }
        }],
        multyQuestion_grade: { type: Number },
        grade: { type: Number },
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

