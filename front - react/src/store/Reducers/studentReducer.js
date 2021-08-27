import produce from 'immer';
import { actions } from '../actions';
import createReducer from "./reducerUtils";


const initialState = {
    student: {
        test: {
            name: "",
            // questions: [ 
            //         question, 
            //         answers[answerNumber,answer],
            //         openQuestion
            //         correctAnswer
            //     ],
            // duration: 0,
            time_days: 0,
            time_hours: 0,
            time_minutes: 0,
            // lastOpened: 
            // description:

            id: "",
            test_name: "",
            // openTest: false,
            answersArray: [], //  questionNumber: "", studentAnswer: "",is_correct or gradeOpenQuest ,answerPicture
            multyQuestion_grade: 0, //grade for the multy question only
            grade: 0, //the multy question grade relative to all the test
            cheating: false,
            ArrayMQ: [],
            cvFile: '',
        },
        studentFinish: false,
    }
}


const student = {
    detectedCheating(state, action) {
        state.student.test.cheating = true
    },
    setCvFile(state, action) {
        state.student.test.cvFile = action.payload
    },
    setTestToStudent(state, action) {
        state.student.test.id = action.payload.id;
        state.student.test.test_name = action.payload.testName;
        // state.student.test.duration = action.payload.duration;
        state.student.test.time_days = action.payload.time_days;
        state.student.test.time_hours = action.payload.time_hours;
        state.student.test.time_minutes = action.payload.time_minutes;
        state.student.test.questions = action.payload.questions;
        state.student.test.openTest = action.payload.openTest;
        state.student.test.cvFile = action.payload.cvFile;
        state.student.test.description = action.payload.description;
        state.student.test.backgroundImage = action.payload.backgroundImage
        state.student.test.cheating = action.payload.cheating
        state.student.test.kind = action.payload.kind
        state.student.test.displayVideo = action.payload.displayVideo;
        state.student.test.video = action.payload.video
        state.student.test.creator = action.payload.creator

    },
    //student answered a question
    submitAnswer(state, action) { //questionNumber, studentAnswer

        var foundQuestion = false
        for (let i = 0; i < state.student.test.answersArray.length; i++) {
            if (state.student.test.answersArray[i].questionNumber == action.payload.questionNumber) {
                foundQuestion = true
                state.student.test.answersArray[i].studentAnswer = action.payload.studentAnswer
                if (!state.student.test.questions[action.payload.questionNumber - 1].openQuestion) //if multy question
                {
                    var correctAnswer = state.student.test.questions[action.payload.questionNumber - 1].correctAnswer
                    if (action.payload.studentAnswer == correctAnswer)
                        state.student.test.answersArray[i].is_correct = true
                    else
                        state.student.test.answersArray[i].is_correct = false
                }
            }
        }
        if (!foundQuestion) {
            if (!state.student.test.questions[action.payload.questionNumber - 1].openQuestion) //multy question
            {
                state.student.test.answersArray.push({
                    questionNumber: action.payload.questionNumber,
                    studentAnswer: action.payload.studentAnswer,
                    is_correct: action.payload.studentAnswer == state.student.test.questions[action.payload.questionNumber - 1].correctAnswer,
                })
            }
            else { //open question
                state.student.test.answersArray.push({
                    questionNumber: action.payload.questionNumber,
                    studentAnswer: action.payload.studentAnswer,
                    gradeOpenQuest: 0,
                })
            }
        }
    },

    //calculate the student' grade 
    calculateGrade(state, action) {
        var numOfQuestion = state.student.test.questions ? state.student.test.questions.length : 0
        var americanQuestionSum = 0
        var currentGrade = 0
        for (let i = 0; i < numOfQuestion; i++) {
            //if multy question
            if (!state.student.test.questions[i].openQuestion) {
                americanQuestionSum++;
            }
        }
        for (let c = 0; c < state.student.test.answersArray.length; c++) {
            if (state.student.test.answersArray[c].is_correct)
                currentGrade += 100;
        }

        //we finished to check the student answers
        //set the student grade
        state.student.test.multyQuestion_grade = americanQuestionSum == 0 ? 0 : currentGrade / americanQuestionSum;
        state.student.test.grade = numOfQuestion == 0 ? 0 : currentGrade / numOfQuestion;
    },
    //set the grade
    setGrade(state, action) {  //testID finalGrade
        state.student.hasChanged = false
        //find the right test
        for (var i = 0; i < state.student.doneTasks.length; i++) {
            if (state.student.doneTasks[i].testID === action.payload.testID) {
                state.student.doneTasks[i].grade = action.payload.finalGrade
                break;
            }
        }
        state.student.hasChanged = true
    },
    //set the studebt answer to true
    setIsCorrect(state, action) {//i,k
        state.student.doneTasks[action.payload.i].answersArray[action.payload.k].is_correct = true
    },

    setArrayMQ(state, action) {
        action.payload.map((question, index) => {
            if (question.mandatoryQuestion) {
                state.student.test.ArrayMQ.push(index + 1)

            }
        })
    },
    setStudentFinish(state, action) {
        state.student.studentFinish = action.payload
    },

}



export default produce((state, action) => createReducer(state, action, student), initialState);