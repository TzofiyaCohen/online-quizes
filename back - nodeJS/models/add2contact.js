const mongoose = require('mongoose')

const add2contactSchema = mongoose.Schema({
    //isGoogleContact:{type:Boolean,default:false},

    quizes: [{
        testID: { type: String },
        done: { type: Boolean },
        cheating: { type: Boolean },

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
        studentUserName: { type: String },
        backgroundImage: { type: String },
        email: { type: String },
    }],

    email: { type: String },
    creator_userName: { type: String },

})

module.exports = mongoose.model('add2contact', add2contactSchema)