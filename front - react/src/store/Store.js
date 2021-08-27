import { createStore, combineReducers, applyMiddleware } from 'redux';
import { actions } from './actions'
import testReducer from "./Reducers/testReducer"
import studentReducer from "./Reducers/studentReducer"
import teacherReducer from "./Reducers/teacherReducer"
import funnelReducer from "./Reducers/funnelReducer"
import { updateTestsToCheck, setSolvedTest, goBack, mergeSolved } from './MiddleWares/middleFunctions'
//setTestToCheckList
import * as CRUD from './MiddleWares/crud'

const reducer = combineReducers({ testReducer, studentReducer, teacherReducer, funnelReducer });

const store = createStore(reducer, applyMiddleware(
    updateTestsToCheck, CRUD.changeTestList, mergeSolved,
    CRUD.addTestToStudent, CRUD.getTrashTests,
    // setTestToCheckList, deleteToCheckTest,
    CRUD.getSolvedTests, CRUD.getTest, CRUD.getAllTests, CRUD.getSolvedAddContact,
    CRUD.sendEmailWithGrade, CRUD.sendMail,
    setSolvedTest, CRUD.setSolvedTestToStudent,
    CRUD.getStudentUser, CRUD.setUserAsTeacher,
    CRUD.deleteSolvedTest, CRUD.deleteSelectedSolvedTest, CRUD.deleteSelectedTest, CRUD.deleteTest,
    CRUD.addTest, CRUD.updateTest,
    CRUD.copyTest, CRUD.copySelectedTest, CRUD.copySolvedTest,
    CRUD.numOfTested, CRUD.average,
    goBack, CRUD.getTeachersName, CRUD.boxSystemWave,
    CRUD.saveAnonymousDetails, CRUD.createContact, CRUD.toTrash, CRUD.toListFromTrash,
    CRUD.deleteAddContact, CRUD.getUserContactsEmail, CRUD.createContactWithoutCheckPermissin,
    CRUD.uploudFile, CRUD.importImgFromPexels
));

store.dispatch(actions.getUserName(window.location.pathname)) //send the /userName as a parameter

console.log(window.location.hostname, "window.location.hostname")

if (window.location.hostname === "localhost") {
    let jwtFromCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJJV3hwYXFrV3RLYkl5TU1pWUxoSkR0NzVvUjkzIiwiZW1haWwiOiJ0em9maXlhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzMwNjY1NX0.m7H22KfDcMqtNE_OVuJ4-082Yt2T7UhB5zeq9aRUug0"

    store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
}
else {
    let params = (new URL(document.location)).searchParams;
    let jwtGlobal = params.get('jwt');
    if (jwtGlobal) {
        let newUrl = window.location.href
        newUrl = newUrl.split('?jwt=')
        newUrl = newUrl[0]
        let date = new Date(Date.now() + 86400e3);
        date = date.toUTCString();
        var expires = "expires=" + date;
        // document.cookie = "devJwt" + "=" + jwtGlobal + ";" + expires + ";path=/";
        document.cookie = "devJwt" + "=" + jwtGlobal + ";" + expires + ";domain=quiz.leader.codes;path=/";
        window.location.replace(newUrl)
        store.dispatch(actions.setTokenFromCookies(jwtGlobal));
    }
    let url = window.location


    // if (document.cookie) {

    //     let jwtFromCookie = document.cookie.includes('devJwt') ?
    //         document.cookie.split(";")
    //             .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;
    //     console.log(jwtFromCookie, "jwtFromCookie")
    //     store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
    // }
}


window.store = store;
export default store;






