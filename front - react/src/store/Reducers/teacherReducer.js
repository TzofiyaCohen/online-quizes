import produce from 'immer';
import { actions } from '../actions';
import createReducer from "./reducerUtils";

const initialState = {
    teacher: {
        id: "",
        userName: "",
        testToCheck: [
            // {
            // questions: [ 
            //         question, 
            //         answers[answerNumber,answer],
            //         openQuestion
            //         correctAnswer
            //     ],
            //  duration: 
            // lastOpened: 
            // description:

            // testName: "",
            // openTest: "",
            // answersArray: [], //  questionNumber: "", studentAnswer: "",is_correct or gradeOpenQuest
            // grade: 0,

            // studentFullName:""
            // studentID
            // }
        ],
        checkedTest: [],
        setGrade: false,
    },
    
}


const teacher = {
    //add test to check test list
    addTestToCheck(state, action) { //test, studentFullName, studentID

        var updated_test = Object.assign({}, action.payload.test);
        updated_test.studentFullName = action.payload.studentFullName
        updated_test.studentID = action.payload.studentID

        state.teacher.testToCheck.push(updated_test)
    },
    //set the teacher from the mongo
    setTeacher(state, action) { //firstName,lastName,testToCheck,id

        state.teacher.id = action.payload.id;
        state.teacher.userName = action.payload.userName;
        state.teacher.testToCheck = action.payload.testToCheck;
        state.teacher.checkedTest = action.payload.checkedTest;
    },
    //delete test to check
    // deleteToCheckTest(state, action) {
    //     state.teacher.testToCheck.filter(el => el._id !== action.payload)
    // },
    //set grade to specific question
    setMark(state, action) {    // (mark, questionNumber, testID)
        for (let i = 0; i < state.teacher.testToCheck.length; i++) {
            if (state.teacher.testToCheck[i]._id == action.payload.testID)
                for (let j = 0; j < state.teacher.testToCheck[i].answersArray.length; j++) {
                    if (state.teacher.testToCheck[i].answersArray[j].questionNumber == action.payload.questionNumber)
                        state.teacher.testToCheck[i].answersArray[j].gradeOpenQuest = action.payload.mark
                }
        }
    },

    calculateGradeOpenQuest(state, action) {
        var testIndex;
        for (let i = 0; i < state.teacher.testToCheck.length; i++) {
            if (state.teacher.testToCheck[i]._id == action.payload.testID) {
                testIndex = i;
                for (let j = 0; j < state.teacher.testToCheck[i].answersArray.length; j++) {
                    if (state.teacher.testToCheck[i].answersArray[j].hasOwnProperty('gradeOpenQuest'))  //open question
                        state.teacher.testToCheck[i].grade += state.teacher.testToCheck[i].answersArray[j].gradeOpenQuest / action.payload.numOfQuest
                }
            }
        }
        alert(state.teacher.testToCheck[testIndex].grade)
        state.teacher.setGrade = true
    },
    
    // deleteCheckedTest(state, action) {
    //     state.teacher.checkedTest.filter(el => el._id !== action.payload)
    // },
}
export default produce((state, action) => createReducer(state, action, teacher), initialState);