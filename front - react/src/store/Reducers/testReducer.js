import React from "react"
import produce from 'immer';
import { actions } from '../actions';
import createReducer from "./reducerUtils";


const initialState = {
    missing: ["please fill in the missing details"], //=0 1-testName 2-descripion 3-duration 4-question 5-answer
    questionItem: 0,
    test: {
        sendTo_email: {
            body: '',
            list: [],
            subject: "Hello, you need to take a test"
        },
        kind: "",
        timer: null,
        id: "",
        openTest: true,
        questions: [
            {
                questionIndex: 0,
                openQuestion: false,
                question: "",
                answers: [
                    {
                        answerNumber: "1", //initial value
                        answer: "",
                        answerPicture: '',
                    },
                    {
                        answerNumber: "2", //initial value
                        answer: "",
                        answerPicture: '',
                    },
                    {
                        answerNumber: "3", //initial value
                        answer: "",
                        answerPicture: '',
                    },
                ],
                correctAnswer: "0",
                mandatoryQuestion: true,
                image: "",
                isProgressBarImage: false,
            }
        ],

        test_name: "",
        time_days: 0,
        time_hours: 1,
        time_minutes: 0,
        // duration: 60,
        description: "",
        backgroundImage: "https://files.codes/uploads/TzofiyaCohen/img/1618386496097__reka1.png",
        targetAudience: "",
        status: "inprogress",
        date: '',
        inTime: false,
        color: '86, 212, 222',
        uploadFile: [],
        video: '',
        displayVideo: true,
    },

    toSubmitTest: false,
    eInfoTestSubmit: "",
    noChange: true,
    savedStatus: false,
    isClickPlus: false,
    testArrImg: [],
}

const tests = {
    setnoChange(state, action) {
        state.noChange = action.payload
    },
    setTestArrImg(state, action) {
        state.testArrImg = action.payload
    },
    setBackgroundImage(state, action) {
        state.test.backgroundImage = action.payload
    },
    setColor(state, action) {
        state.test.color = action.payload
    },
    setCorrectAnswer(state, action) {
        state.test.questions[0].correctAnswer = action.payload
    },
    setAnswerQuestion1(state, action) {
        state.test.questions[0].answers[action.payload.index].answer = action.payload.answer
    },
    setQuestion1(state, action) {
        state.test.questions[0].question = action.payload
    },
    setEmailBody(state, action) {
        //  state.test.sendTo_email.body = `<h1><a herf="https://quiz.leader.codes/${action.payload}/answerTest/${state.test.id}"> please take a test in ${state.test.test_name}</a ></h1 >`;
    },
    //set email adress
    setEmail(state, action) {
        state.test.sendTo_email.list = action.payload
    },
    setVideo(state, action) {
        state.test.video = action.payload
    },
    setDisplayVideo(state, action) {
        state.test.displayVideo = action.payload
    },
    setTimer(state, action) {
        state.test.timer = action.payload
    },

    //////////////////////////////////////////////////
    setInTime(state, action) {
        state.test.inTime = action.payload
    },

    //set description
    setDescription(state, action) {
        state.test.description = action.payload;
    },
    //set test to be open or amerucan test
    setOpenTest(state, action) {
        state.test.openTest = !action.payload
        console.log(action.payload)
    },
    //set QuestionType
    setOpenQuestion(state, action) {  //questionIndex openQuestion
        if (action.payload.openQuestion == "American Question")
            state.test.questions[action.payload.questionIndex].openQuestion = false
        else
            state.test.questions[action.payload.questionIndex].openQuestion = true
    },
    //update test_name
    setTestName(state, action) {
        state.test.test_name = action.payload;
    },
    //update duration
    // setDuration(state, action) {
    //     state.test.duration = action.payload;
    //     console.log(state.test.duration)
    // },
    setTimeDays(state, action) {
        state.test.time_days = action.payload;
    },

    setTimeHours(state, action) {
        state.test.time_hours = action.payload;
    },

    setTimeMinutes(state, action) {
        state.test.time_minutes = action.payload;
    },


    setKind(state, action) {
        state.test.kind = action.payload;
    },

    setIdTest(state, action) {
        state.test.id = action.payload;
    },
    //update target audience
    setTargetAudience(state, action) {
        state.test.targetAudience = action.payload;
    },

    setStatus(state, action) {
        state.test.status = action.payload;
    },
    //delete question from test
    deleteQuestion(state, action) {
        action.payload.event.preventDefault();
        state.test.questions.splice(action.payload.questionIndex, 1) //returns the deleted value (in let for exmp)

        state.test.questions.forEach((element, index) => {
            element.questionIndex = index
        });

        // if (state.questionItem > action.payload.questionIndex)
        //     state.questionItem -= 1

        if (state.test.questions.length == 0) {
            state.test.questions.push({
                questionIndex: 0,  //יחזיר ערך נכון אם מתבצע לפני הדחיפה
                question: "How are you today?",
                answers: [
                    {
                        answerNumber: "1",
                        answer: "Okay",
                    },
                    {
                        answerNumber: "2",
                        answer: "Fine",
                    },
                    {
                        answerNumber: "2",
                        answer: "Bad",
                    },
                ],
                openQuestion: false,
                correctAnswer: "0",
            })
        }

    },
    deleteMultiAnswer(state, action) {//({event, questionIndex, answerIndex}))
        action.payload.event.preventDefault();
        state.test.questions[action.payload.questionIndex].answers.splice(action.payload.answerIndex, 1) //returns the deleted value (in let for exmp)

        state.test.questions[action.payload.questionIndex].answers.forEach((element, index) => {
            element.answerNumber = index + 1
        });
    },
    copyAnswer(state, action) {//({event, questionIndex, answerIndex}))
        action.payload.event.preventDefault();
        var copy = Object.assign({}, state.test.questions[action.payload.questionIndex].answers[action.payload.answerIndex]);
        copy.answerNumber = state.test.questions[action.payload.questionIndex].answers.length + 1
        state.test.questions[action.payload.questionIndex].answers.splice(action.payload.answerIndex, 0, copy);

        state.test.questions[action.payload.questionIndex].answers.forEach((element, index) => {
            element.answerNumber = index + 1
        });
        //state.test.questions.splice( action.payload.questionIndex,0, copied);
        // state.test.questions[action.payload.questionIndex].answers.push({
        //     answerNumber: state.test.questions[action.payload.questionIndex].answers.length + 1,
        //     answer: state.test.questions[action.payload.questionIndex].answers[action.payload.answerIndex].answer,
        // })
    },
    //add Open question to the test 
    addOpenQuestion(state, action) {
        action.payload.preventDefault();

        state.test.questions.push({
            questionIndex: state.test.questions.length,  //יחזיר ערך נכון אם מתבצע לפני הדחיפה
            question: "",
            // questionDescription: "",
            answers: [
                {
                    // answerNumber: "1",
                    // answer: "",
                }
            ],
            openQuestion: true,
            correctAnswer: "0",
            mandatoryQuestion: true,
        })
    },
    setQuestionItem(state, action) {
        state.questionItem = action.payload
    },
    //add close question to the test 
    addCloseQuestion(state, action) {
        action.payload.preventDefault();
        state.questionItem = state.test.questions.length
        state.test.questions.push({
            // questionIndex: state.test.questions[state.test.questions.length - 1].questionIndex + 1,  //יחזיר ערך נכון אם מתבצע לפני הדחיפה
            questionIndex: state.test.questions.length,  //יחזיר ערך נכון אם מתבצע לפני הדחיפה
            question: "",
            answers: [
                {
                    answerNumber: "1",
                    answer: "",
                },
                {
                    answerNumber: "2",
                    answer: "",
                }
            ],
            openQuestion: false,
            correctAnswer: "0",
            mandatoryQuestion: true,
        })

    },

    //copyQuestion
    copyQuestion(state, action) { //event, questionInsex

        action.payload.event.preventDefault();

        var copied = Object.assign({}, state.test.questions[action.payload.questionIndex]);
        copied.questionIndex = state.test.questions.length
        state.test.questions.splice(action.payload.questionIndex, 0, copied);
        // state.test.questions.splice(1, state.test.questions[action.payload.questionIndex], copied);
        // state.test.questions.push(copied)

        state.test.questions.forEach((element, index) => {
            element.questionIndex = index
        });
    },
    //update question/correctAnswer
    handleAnswers(state, action) {  //(index, type, value)
        state.test.questions[action.payload.index][action.payload.type] = action.payload.value
    },
    //add multiAnswer
    addMultiAnswer(state, action) { //(event, questionIndex) 
        action.payload.event.preventDefault();

        //state.test.questions[action.payload.questionIndex].openQuestion = false;  //now we have multi answers
        state.test.questions[action.payload.questionIndex].answers.push({
            answerNumber: state.test.questions[action.payload.questionIndex].answers.length + 1,
            answer: "",
        })
    },
    //update multiAnswers
    handleMultiAnswers(state, action) {     //(questionIndex, type(answerNumber), value) {
        state.test.questions[action.payload.questionIndex].answers[action.payload.answerNumber - 1].answer = action.payload.value
    },
    //set test
    setTest(state, action) {  //testName, duration, questions
        state.test.id = action.payload.id;
        state.test.test_name = action.payload.testName;
        // state.test.duration = action.payload.duration;
        state.test.time_days = action.payload.time_days;
        state.test.time_hours = action.payload.time_hours;
        state.test.time_minutes = action.payload.time_minutes;
        state.test.questions = action.payload.questions;
        state.test.openTest = action.payload.openTest;
        state.test.description = action.payload.description;
        // state.test.timer = action.payload.duration * 60; //in seconds
        state.test.timer = (action.payload.time_days * 24 * 60 * 60 + action.payload.time_hours * 60 * 60 + action.payload.time_minutes * 60);
        state.test.backgroundImage = action.payload.backgroundImage;
        state.test.kind = action.payload.kind
        state.test.targetAudience = action.payload.targetAudience
        state.test.status = action.payload.status
        state.test.creator = action.payload.creator
        state.test.color = action.payload.color
        state.test.date = (action.payload.date).slice(0, 10)
        state.test.displayVideo = action.payload.displayVideo;
        state.test.video = action.payload.video

        //  state.test.sendTo_email.body = `<a href="https://quiz.leader.codes/${action.payload.userName}/answerTest/${action.payload.id}">please take a test in ${action.payload.testName}</a >`
    },
    setSolvedTest2(state, action) {
        state.test.id = action.payload.id;
        state.test.test_name = action.payload.testName;
        // state.test.duration = action.payload.duration;
        state.test.time_days = action.payload.time_days;
        state.test.time_hours = action.payload.time_hours;
        state.test.time_minutes = action.payload.time_minutes;
        state.test.questions = action.payload.questions;
        state.test.openTest = action.payload.openTest;
        state.test.description = action.payload.description;
        // state.test.timer = action.payload.duration * 60; //in seconds
        state.test.timer = (action.payload.time_days * 24 * 60 * 60 + action.payload.time_hours * 60 * 60 + action.payload.time_minutes * 60);
        state.test.answersArray = action.payload.answersArray;
        state.test.grade = action.payload.grade;
        state.test.studentUserName = action.payload.studentUserName;
        state.test.backgroundImage = action.payload.backgroundImage
        state.test.cheating = action.payload.cheating
        state.test.targetAudience = action.payload.targetAudience
        state.test.status = action.payload.status
        state.test.kind = action.payload.kind
        state.test.displayVideo = action.payload.displayVideo;
        state.test.video = action.payload.video
        state.test.cvFile = action.payload.cvFile
        state.test.creator = action.payload.creator

    },
    setStatusSaved(state, action) {
        state.savedStatus = action.payload
    },

    resetTestVarsToReturnToTestList(state, action) {
        state.savedStatus = false
        state.isClickPlus = false
        state.noChange = true
        state.missing = ["please fill in the missing details"] //=0 1-testName 2-descripion 3-duration 4-question 5-answer
        state.questionItem = 0
        state.test.id = '';
        state.test.test_name = '';
        state.test.time_days = 0;
        state.test.time_hours = 1;
        state.test.time_minutes = 0;
        state.test.openTest = true;
        state.test.timer = null;
        state.test.backgroundImage = "https://files.codes/uploads/TzofiyaCohen/img/1618386496097__reka1.png";
        state.test.kind = ''
        state.test.targetAudience = ''
        state.test.status = 'inprogress'
        state.test.creator = ''
        state.test.color = '201, 10, 10'
        state.test.date = ''
        state.test.displayVideo = true
        state.test.inTime = false
        state.test.video = ''
        state.test.uploadFile = []
        state.test.description = ''
        // state.test.questions = {}
        state.test.questions = [{
            questionIndex: 0,
            openQuestion: false,
            question: "",
            answers: [
                {
                    answerNumber: "1", //initial value
                    answer: "",
                    answerPicture: '',
                },
                {
                    answerNumber: "2", //initial value
                    answer: "",
                    answerPicture: '',
                },
                {
                    answerNumber: "3", //initial value
                    answer: "",
                    answerPicture: '',
                },
            ],
            correctAnswer: "0",
            mandatoryQuestion: true,
            image: "",
            isProgressBarImage: false,
        }]
        state.test.sendTo_email = {
            body: '',
            list: [],
            subject: "Hello, you need to take a test"
        }
        state.toSubmitTest = false
        state.eInfoTestSubmit = ""

        state.test.answersArray = undefined
        state.test.grade = undefined
        state.test.studentUserName = undefined
        state.test.cheating = undefined
        state.test.cvFile = undefined
        var color = '#56D4DE'
        var x = parseInt(color.substr(1, 2), 16) + ',' +
            parseInt(color.substr(3, 2), 16) + ',' +
            parseInt(color.substr(5, 2), 16)
        document.getElementById('body').style.setProperty('--colorStyle', x)
        state.test.color = x

    },

    checkIfDone(state, action) {

        state.missing = ["please fill in the missing details"]

        if (state.test.test_name == "" || state.test.test_name == null) {
            state.missing.push("test name is empty"); state.done = false;
        }
        // if (state.test.duration == "0" || state.test.duration == null) {
        //     state.missing.push("duration is empty"); state.done = false;
        // }
        if ((state.test.time_days == null || state.test.time_hours == null || state.test.time_minutes == null)) {
            state.missing.push("test time is empty"); state.done = false;
        }
        if (state.test.description == "" || state.test.description == null) {
            state.missing.push("description is empty"); state.done = false;
        }

        state.test.questions.forEach((quest, index) => {

            if (quest.questionIndex == undefined)
                quest.questionIndex = 0;

            if (quest.question == "") {
                state.missing.push(`question ${index + 1} is empty`);
                state.done = false;
            }
            quest.answers.forEach((answer, index2) => {
                if (answer.answer == "") {
                    state.missing.push(`answer ${index2 + 1}  in question ${index + 1} is empty`);
                    state.done = false;

                }
            })

            if (quest.correctAnswer == "0" && state.test.kind != 'survey') {
                state.missing.push(`No correct answer in question ${index + 1}`);
                state.done = false;
            }

        })


        if (state.missing.length == 1)
            state.done = true;


    },
    setIsClickPlus(state, action) {
        state.isClickPlus = action.payload
    },
    CheckEmptyLastQuestion(state, action) {
        let emptyQ = false;
        if (state.test.questions) {
            if (state.test.questions[state.test.questions.length - 1].question == '')
                emptyQ = true;
            state.test.questions[state.test.questions.length - 1].answers.forEach((answer, index) => {
                if (answer.answer == "") {
                    emptyQ = true;
                }
            })
        }

        if (emptyQ == false)
            state.isClickPlus = false

    },



    //             checkIfDone(state, action) {
    //             if(state.test.test_name != "" &&
    //                 (state.test.duration != 0 || state.test.kind != 'quiz')
    //                 && state.test.description != ""
    //                 && state.test.description != null
    //                 && state.test.test_name != null) {
    //             state.missing[1] = ""; state.missing[2] = ""; state.missing[3] = ""
    //             state.test.questions.forEach((quest, index) => {
    //                 if (quest.question != "") {
    //                     state.missing[4] = ""
    //                     quest.answers.forEach((answer) => {
    //                         if (answer.answer != "") {
    //                             state.missing[5] = ""
    //                             if (quest.correctAnswer != "0") {
    //                                 state.missing[6] = ""
    //                                 if ((answer.answerNumber == quest.answers.length) && (index + 1 == state.test.questions.length)) {
    //                                     state.done = true
    //                                     state.missing = []
    //                                 }
    //                             }
    //                             else {
    //                                 console.log("error 6")
    //                                 state.done = false
    //                                 if (quest.questionIndex == undefined)
    //                                     quest.questionIndex = 0
    //                                 state.missing[6] = `choose correct answer in question number ${quest.questionIndex + 1}`
    //                             }
    //                         }
    //                         else {
    //                             console.log("error 3")
    //                             state.done = false
    //                             if (quest.questionIndex == undefined)
    //                                 quest.questionIndex = 0
    //                             state.missing[5] = `answer ${answer.answerNumber}  in question number ${quest.questionIndex + 1} is empty`
    //                         }
    //                     });
    //                 }
    //                 else {
    //                     console.log("error 2")
    //                     state.done = false
    //                     if (quest.questionIndex == undefined)
    //                         quest.questionIndex = 0
    //                     state.missing[4] = `question number ${quest.questionIndex + 1} is empty`;
    //                 }
    //             });
    //         }
    //         else {
    //         console.log("error 1")
    //             state.done = false
    //             if(state.test.test_name == "" || state.test.test_name == null) state.missing[1] = "test name is empty"; else state.missing[1] = ""
    //             if(state.test.duration == "0" || state.test.duration == null) state.missing[3] = "duration is empty"; else state.missing[3] = ""
    //             if(state.test.description == "" || state.test.description == null) state.missing[2] = "description is empty"; else state.missing[2] = ""
    //     }

    // },

    setMandatoryQuestion(state, action) {
        state.test.questions[action.payload.i].mandatoryQuestion = !action.payload.type
    },

    //set the info on click to save test 
    setEInfoTestSubmit(state, action) {
        state.eInfoTestSubmit = action.payload;
    },
    //set to true or false to play onsubmit func
    setToSubmitTest(state, action) {
        state.toSubmitTest = action.payload;
    },

    inputImageQuestion(state, action) {
        state.test.questions[action.payload.index].image = action.payload.value;
    },
    AnswerPicture(state, action) {
        state.test.questions[action.payload.questIndex].answers[action.payload.ansIndex].answerPicture = action.payload.value;
    },
    setIsProgressBarImage(state, action) {
        state.test.questions[action.payload.index].isProgressBarImage = action.payload.value
    },



};

export default produce((state, action) => createReducer(state, action, tests), initialState);

