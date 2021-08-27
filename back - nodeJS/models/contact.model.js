const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    //isGoogleContact:{type:Boolean,default:false},

    student: { type: Boolean },
    quizes: [{
        testID: { type: String },
        done: { type: Boolean },
        cheating: { type: Boolean },
        kind: { type: String },
        test_name: { type: String },
        color: { type: String },
        questions: [{
            question: { type: String, required: true },
            answers: [{
                answerNumber: { type: Number },
                answer: { type: String },
                answerPicture: { type: String },
            }],
            openQuestion: { type: Boolean },
            correctAnswer: { type: Number, required: true },
            image: { type: String }
        }],
        // duration: { type: Number, required: true },
        time_days: { type: Number, required: true },
        time_hours: { type: Number, required: true },
        time_minutes: { type: Number, required: true },
        lastOpened: { type: Date },
        description: { type: String },
        displayVideo: { type: Boolean },
        video: { type: String },
        cvFile: { type: String },
        openTest: { type: Boolean },

        answersArray: [{
            questionNumber: { type: Number },
            studentAnswer: { type: String },
            is_correct: { type: Boolean },
            gradeOpenQuest: { type: Number },
            answerPicture: { type: String },
        }],
        multyQuestion_grade: { type: Number },
        grade: { type: Number },
        studentUserName: { type: String },
        backgroundImage: { type: String },
        creator: { type: String }

    }],

    name: { type: String },
    email: {
        type: String, require: true, unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    phone: {
        type: String,
        //  required: true,
        match: /\d{10}/,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    starred: Boolean,
    thumbnail: String,
    numOfUnReadedWaves: Number,
    status: String,
    sourceUrl: String,
    conversations: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
    ],
    quotes:
        [
            { type: mongoose.Schema.Types.ObjectId, ref: 'quotes' }
        ],
    source: [s = mongoose.Schema({
        id: { type: mongoose.Schema.Types.ObjectId },
        type: String
    })],
    leadOwner: String,
    leadSource: String,
    attached: String,
    customerType: String,
    companySize: String,
    companyName: String,
    gender: String,
    createDateAndTime: { type: Date, default: Date.now },
    bestTimeToCallFrom: Date,
    bestTimeToCallTo: Date,
    birthday: Date,
    telephon: String,
    mobileNumber: String,
    companyAddress: String,
    state: String,
    zipcode: String,
    website: String,
    whatsapp: String,
    linkedIn: String,
    facebook: String,
    instagram: String,
    youTube: String,
    active: Boolean,
    googleContact: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactGoogle' },
    addYourMedia: { type: String },
    secoundEmail: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    nickName: { type: String },
    officePhone: { type: String },
    //bestTimeToCall: { type: String },
    describe: { type: String },
    subscribe: { type: String },
    active: { type: Boolean, default: true },


    //leaderStatus: { type: String },

})

module.exports = mongoose.model('Contacts', contactSchema)