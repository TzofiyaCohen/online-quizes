const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    student: { type: Boolean },
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
                answerPicture: { type: String },
            }],
            openQuestion: { type: Boolean },
            correctAnswer: { type: Number, required: true }

        }],
        time_days: { type: Number },
        time_hours: { type: Number },
        time_minutes: { type: Number },
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

    }],


    // createdDate: { type: Date, default: Date.now },
    email: { type: String, require: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    uid: { type: String, require: true },
    username: { type: String, trim: true },
    // premium: { type: Boolean },
    contacts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Contacts' }
    ],

    // videos: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
    // ],
    // tags: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
    // ],
    // landingPages: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'LandingPage' }
    // ],
    // forms: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Form' }
    // ],
    // cards: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Card'
    // }],
    // events: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event'
    // }],
    // blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    // chats: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Chat'
    // }],
    // sites: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Site'
    // }],
    // conversations: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
    // ],
    // suspend: { type: Boolean, default: false },
    // fullName: { type: String, default: '' },
    // position: { type: String, default: '' },
    // phone: {
    //     type: String,
    //     default: '',
    //     validate: {
    //         validator: function (v) {
    //             // match:/\d{10}/,
    //             // return /\d{3}-\d{3}-\d{4}/.test(v);

    //             return /^$|^\d{10}$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid phone number!`
    //     },
    // },
    // companyName: { type: String, default: '' },
    // birthday: { type: String },
    // // socialmedias:[{type: String,default:[{"facebook":""}]}],
    // socialmedias: { facebook: { type: String, default: '' }, whatsapp: { type: String, default: '' }, messenger: { type: String, default: '' }, youtube: { type: String, default: '' }, website: { type: String, default: '' } },
    // // [{ url: String, filename: String }]
    // // socialmedias: [{ facebook: String,whatsapp:String}],
    // // socialmedias: [{ "facebook": ""},{"whatsapp":''}],
    // address: { type: String, default: '' },
    // numberAddress: { type: Number, default: 0 },
    // city: { type: String, default: '' },
    // state: { type: String, default: '' },///
    // zipcode: { type: String, default: '' },///
    // vat: { type: String, default: '' },
    // imgProfile: { type: String, default: '' },
    // imgLogo: { type: String, default: '' },
    // stringBase: { type: String, default: '' },
    // country: { type: String, default: '' },
    // workHours: { type: Number, default: 0 },
    // companyEmail: { type: String, default: '', match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    apiKey: { type: String },
    contactFacebookForm: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactFacebookForms' },
    googleContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactGoogle' }],
    // desktopFcmToken: { type: String },
    // androidFcmToken: { type: String },
    // iosFcmToken: { type: String }

})
userSchema.pre('save', function (next) {
    const user = this
    user.username = user.username.replace(/\s/g, "");
    next()
})

module.exports = mongoose.model("User", userSchema);