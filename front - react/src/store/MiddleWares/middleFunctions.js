import { get } from 'jquery';
import { actions } from '../actions';

export const updateTestsToCheck = ({ dispatch, getState }) => next => action => {

    if (action.type === 'UPDATE_TESTS_TO_CHECK') {
        var solvedTest = getState().studentReducer.student.test;

        //dispatch(actions.getStudentUser(solvedTest))
        dispatch(actions.setSolvedTestToStudent(
            {
                solvedTest: solvedTest,
                email: action.payload.email,
                name: action.payload.name == "" ? action.payload.email.split("@")[0] : action.payload.name
            }))
    }
    return next(action);
};

export const mergeSolved = ({ dispatch, getState }) => next => action => {

    if (action.type === 'MERGE_SOLVED') {
        var merged = getState().funnelReducer.solvedTestArray.concat(getState().funnelReducer.solvedAdd2Contact)
        dispatch(actions.initialFilteredTest(
            {
                testList: merged,
                displayTest: "checked"
            }
        ))
        dispatch(actions.setMergedSolved(merged))
        console.log(merged, "merged")

    }
    return next(action);
};

// export const setTestToCheckList = ({ dispatch, getState }) => next => action => {

//     if (action.type === 'SET_TEST_TO_CHECK_LIST') {
//         var testList = getState().teacherReducer.teacher.testToCheck;
//         const displayTest = "to_check"
//         dispatch(actions.initialFilteredTest({ testList, displayTest }))
//     }
//     return next(action);
// };

export const setSolvedTest = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_SOLVED_TEST') {
        var testList = getState().funnelReducer.filteredTests.filter(el => el._id == action.payload.id);
        var solvedTest = testList[0]
        var grade = solvedTest.grade
        var id = action.payload.id
        var testName = solvedTest.test_name
        // var duration = solvedTest.duration
        var time_days = solvedTest.time_days
        var time_hours = solvedTest.time_hours
        var time_minutes = solvedTest.time_minutes
        var questions = solvedTest.questions
        var openTest = solvedTest.openTest
        var answersArray = solvedTest.answersArray
        var description = solvedTest.description
        var studentUserName = solvedTest.studentUserName
        var backgroundImage = solvedTest.backgroundImage
        var cheating = solvedTest.cheating
        var kind = solvedTest.kind
        var video = solvedTest.video
        var displayVideo = solvedTest.displayVideo
        var cvFile = solvedTest.cvFile
        var creator = solvedTest.creator

        dispatch(actions.setSolvedTest2({
            displayVideo, video, kind, cheating, backgroundImage,
            id, description, testName, time_days, time_hours,
            time_minutes, questions, openTest, cvFile,
            answersArray, grade, studentUserName, creator,
        }))
    }
    return next(action);
};

export const goBack = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GO_BACK') {
        if (getState().funnelReducer.viewTest) {
            window.history.back()
            dispatch(actions.getSolvedTests())
            dispatch(actions.setViewTest(false))
        }
        else {
            if (getState().funnelReducer.backArrow && getState().testReducer.savedStatus) {
                dispatch(actions.getAllTests(false))
                dispatch(actions.setTestListInfo(true))
                dispatch(actions.initialFilteredTest({ testList: getState().funnelReducer.allTests, displayTest: "all" }))
                dispatch(actions.setStatusSaved(false))
                dispatch(actions.backToTestList(false))
            }
            if (getState().funnelReducer.displayTest == "checked" || getState().funnelReducer.displayTest == "deleted") {
                console.log("go back history")
                dispatch(actions.getAllTests(false))
                dispatch(actions.setTestListInfo(true))
                dispatch(actions.initialFilteredTest({ testList: getState().funnelReducer.allTests, displayTest: "all" }))
            }
        }
    }
    return next(action);
};

// export const onLoad = ({ dispatch, getState }) => next => action => {
//     if (action.type === 'ON_LOAD') {
//         dispatch(actions.cons("hhhh"))
//         dispatch(actions.getUserName(window.location.pathname)) //send the /userName as a parameter

//         console.log(window.location.hostname, "window.location.hostname")

//         if (window.location.hostname == "localhost") {
//             let jwtFromCookie =
//                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJveDk4OVlEV3NZUHB6eVVnR2Vqc2NQRnRiV1QyIiwiZW1haWwiOiJ0em9maXlhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYxNDY4NDUyNn0.nITdj7WgFdjM5LZupk7hA-hZ4EjtMnTYu6I_fbjlc-4'
//             //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6ODBkZVBQR0lGWUM0ZzFsdWZQbGJmZFJtMUUzIiwiZW1haWwiOiJzZW5kdG9sZWFkZXJAZ21haWwuY29tIiwiaWF0IjoxNjEzMzAyNjc0fQ.OOMKwdHVBvcSYz3BzzQq585LECI7FaJFWfqqBUjB7Jw'
//             dispatch(actions.setTokenFromCookies(jwtFromCookie));
//         }
//         else {
//             let params = (new URL(document.location)).searchParams;
//             let jwtGlobal = params.get('jwt');
//             if (jwtGlobal) {
//                 let newUrl = window.location.href
//                 newUrl = newUrl.split('?jwt=')
//                 newUrl = newUrl[0]
//                 let date = new Date(Date.now() + 86400e3);
//                 date = date.toUTCString();
//                 var expires = "expires=" + date;
//                 document.cookie = "devJwt" + "=" + jwtGlobal + ";" + expires + ";path=/";
//                 window.location.replace(newUrl)
//                 dispatch(actions.setTokenFromCookies(jwtGlobal));
//             }
//             let url = window.location
//         }
//     }
//     return next(action);
// };