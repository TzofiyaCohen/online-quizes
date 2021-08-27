import { act } from '@testing-library/react';
import produce from 'immer';
import { actions } from '../actions';
import createReducer from "./reducerUtils";


const initialState = {
    userName: "",
    jwt: "",
    isCheckedTest: false,
    isOpenConfigurator: true,
    thumbtack: false,
    listView: true,
    testInfo: false,
    allTests: [],
    solvedTestArray: [],
    solvedAdd2Contact: [],
    mergedSolved: [],
    trashTestArray: [],
    filteredTests: [],
    displayTest: "all",
    answerTestInfo: false,
    testListInfo: false,
    checkTest: false,
    sendMail: false,
    viewTest: false,
    copyTest: false,
    selectedTest: [],
    numOfTested: [],
    testAverage: [],
    numStep: "1",
    teachersName: [],
    updatedStatus: false,
    contactsEmail: [],
    contactsNames: [],
    checkedMails: [],
    isOpenSearch: false,
    modalPDF: false,
    modalPrint: true,
    modalAnswerTest: true,
    startTest: false,
    idQuestConfig: 0,
    finishAnswerTest: false,
    modalMQ: false,
    isFinishTest: false,
    saveWithPopUp: true,
    hasChangedTest: false,
    isOnPopUp: false,
    collapses: [],
    questionCollapes: [],
    backArrow: false,
    newContact: false,
    loadedAjax1: 5,
    loadedAjax2: 5,
    isProgressBar: false,
    withoutEOnSave: false,
    AllSelected: false,
    allDivsGrey: false,
    isFileBig: false,
    pressFinishBtn: false,
    isHebrewQuest: false,
    isClickUpdate: false,
    checkIfSend: false,
    listCheckedEmpty: false,
    loaderUpload: false,
    popUpAlertMissingInTest: false,
    isInAlertButton: false,
    loaderUploadImg: {
        type: 'quest',
        index: 0,
        questIndex: 0
    },
    backToTestListFromView: false,

}

const funnel = {
    //     const changeCollapse = (collapse) => {
    //         if (props.collapses.includes(collapse)) {
    //                props.setCollapes(props.collapses.filter((prop) => prop !== collapse));
    //         } else {  
    //            props.setCollapes([...props.collapses, collapse]);
    //         }
    // };
    setPopUpAlertMissingInTest(state, action) {
        state.popUpAlertMissingInTest = action.payload
    },
    setIsInAlertButton(state, action) {
        state.isInAlertButton = action.payload
    },
    setBackToTestListFromView(state, action) {
        state.backToTestListFromView = action.payload
    },
    setAllSelected(state, action) {
        state.AllSelected = action.payload
    },
    isLoaderUploadImg(state, action) {
        state.loaderUploadImg.type = action.payload.type
        state.loaderUploadImg.index = action.payload.index
        if (action.payload.questIndex)
            state.loaderUploadImg.questIndex = action.payload.questIndex
        //state.loaderUploadImg[2] = action.payload.val
    },
    isLoaderUpload(state, action) {
        state.loaderUpload = action.payload
    },
    setIsClickUpdate(state, action) {
        state.isClickUpdate = action.payload
    },
    setIsHebrewQuest(state, action) {
        state.isHebrewQuest = action.payload
    },
    setPressFinishBtn(state, action) {
        state.pressFinishBtn = action.payload
    },
    setQuestionCollapes(state, action) {
        if (state.questionCollapes.includes(action.payload)) {
            state.questionCollapes = state.questionCollapes.filter((prop) => prop !== action.payload)
        }
        else {
            state.questionCollapes = [...state.questionCollapes, action.payload]
        }
    },
    setCollapes(state, action) {
        // if (state.collapses.includes(action.payload)) {
        //     state.collapses = state.collapses.filter((prop) => prop !== action.payload)
        // }
        // else {
        //     state.collapses = [...state.collapses, action.payload]
        // }
        if (state.collapses.includes(action.payload)) {
            state.collapses = []
        }
        else {
            state.collapses = [action.payload]
        }

    },
    ResetSelectedTest(state, action) {
        state.selectedTest = [];
    },
    startTest(state, action) {
        state.startTest = true
    },
    setIsProgressBar(state, action) {
        state.isProgressBar = action.payload
    },
    setIsFileBig(state, action) {
        state.isFileBig = action.payload
    },
    setAllDivsGrey(state, action) {
        state.allDivsGrey = action.payload
    },
    setWithoutEOnSave(state, action) {
        state.withoutEOnSave = action.payload
    },
    setLoadedAjax1(state, action) {
        state.loadedAjax1 = action.payload
    },
    setLoadedAjax2(state, action) {
        state.loadedAjax2 = action.payload
    },
    setHasChangedTest(state, action) {
        state.hasChangedTest = action.payload
    },
    setIsOnPopUp(state, action) {
        state.isOnPopUp = action.payload
    },
    setSaveWithPopUp(state, action) {
        state.saveWithPopUp = action.payload
    },
    setModaAnswerTest(state, action) {
        state.modalAnswerTest = !state.modalAnswerTest
    },
    setModalPDF(state, action) {
        state.modalPDF = !state.modalPDF
    },
    setModalPrint(state, action) {
        state.modalPrint = !state.modalPrint
    },
    setCheckedMails(state, action) {
        state.checkedMails = action.payload
        console.log(state.checkedMails)
    },
    setIsOpenSearch(state, action) {
        state.isOpenSearch = !action.payload
    },
    setTeachersName(state, action) {
        state.teachersName = action.payload
        state.teachersName.push("All Teachers")
    },
    setTokenFromCookies(state, action) {
        state.jwt = action.payload
    },
    setViewTest(state, action) {
        state.viewTest = action.payload
    },
    setCopyTest(state, action) {
        state.copyTest = action.payload
    },
    changeStatus(state, action) {
        state.status = action.payload
    },
    setTestListInfo(state, action) {
        state.testListInfo = action.payload
    },
    setAllTests(state, action) {
        var tests = action.payload
        // tests.reverse()
        state.allTests = tests
    },
    setFilteredTests(state, action) {
        state.filteredTests = action.payload.data
        console.log("in setFilteredTests from ", action.payload.from)
    },
    setSortTestsCopy(state) {
        state.filteredTests.forEach((testCopy, index) => {
            if (testCopy.copied) {
                var find = 0;
                var copy = 0;
                state.filteredTests.forEach((testId, index) => {
                    if (testCopy.copied == testId._id) {
                        copy = index;
                        find = 1;
                    }
                })
                if (find) {
                    state.filteredTests.splice(copy + 1, 0, testCopy)
                    testCopy.copied = undefined;
                    state.filteredTests.splice(index + 1, 1);
                }
            }

        })
    },
    initialFilteredTest(state, action) {
        state.filteredTests = action.payload.testList
        state.displayTest = action.payload.displayTest
    },
    setMergedSolved(state, action) {
        state.mergedSolved = action.payload
    },
    setContactsEmail(state, action) {
        state.contactsEmail = action.payload  //contains object! {email,name}
    },
    setContactName(state, action) {
        state.contactsNames = action.payload
    },
    setnewContact(state, action) {
        state.newContact = action.payload
        console.log(` newContact is ${state.newContact}`)
    },
    setcheckTest(state, action) {
        state.checkTest = action.payload
    },
    setFlagToggleCon(state, action) {
        state.isOpenConfigurator = action.payload;
    },
    setFlagthumbtack(state, action) {
        state.thumbtack = action.payload;
    },
    changeTestView(state, action) {
        state.listView = !state.listView;
    },
    setTestInfo(state, action) {
        state.testInfo = action.payload;
    },
    setAnswerTestInfo(state, action) {
        state.answerTestInfo = action.payload;
    },
    updateFiltered(state, action) {
        if (action.payload.restore)
            state.allTests = state.allTests.concat(state.filteredTests.filter(el => el._id == action.payload.id))
        state.filteredTests = state.filteredTests.filter(el => el._id != action.payload.id)
    },
    updateMerged(state, action) {
        state.solvedTestArray = state.filteredTests.filter(el => el._id != action.payload)
        state.mergedSolved = state.filteredTests.filter(el => el._id != action.payload)
    },
    updateAllTests(state, action) {
        state.allTests = state.allTests.filter(el => el._id != action.payload)
    },
    updateTrashedTest(state, action) {
        state.trashTestArray = state.trashTestArray.filter(el => el._id !== action.payload)
    },
    updateSolvedTest(state, action) {
        state.solvedTestArray = state.solvedTestArray.filter(el => el._id !== action.payload)
    },
    getUserName(state, action) {
        console.log(action.payload.split("/")[1])
        state.userName = action.payload.split("/")[1] //make sure we take just the userName
    },
    selectTest(state, action) {
        console.log(action.payload.testID, action.payload.add)
        if (action.payload.add)
            state.selectedTest.push(action.payload.testID)
        else
            state.selectedTest = state.selectedTest.filter(testID => testID !== action.payload.testID)
    },
    selectAllTest(state, action) {
        if (action.payload) {
            var allTestId = []
            state.filteredTests.forEach(test => {
                console.log(test._id)
                allTestId.push(test._id)
            });
            state.selectedTest = allTestId
        }
        else
            state.selectedTest = []
    },
    setNumOfTested(state, action) {
        state.numOfTested = action.payload //[{testID:"", all:,tested:}]
    },
    setTestAverage(state, action) {
        state.testAverage = action.payload //[{testID:"", average:}]
    },
    setSendMail(state, action) {
        console.log("action.payload", action.payload)
        state.sendMail = action.payload.value
        console.log("sendMail is", state.sendMail, action.payload.from)
    },
    setSolvedTestReducerArray(state, action) {
        state.solvedTestArray = action.payload
    },
    setSolvedAdd2ContactReducer(state, action) {
        state.solvedAdd2Contact = action.payload
    },
    setTrashTestReducerArray(state, action) {
        state.trashTestArray = action.payload
    },
    setNumStep(state, action) {
        state.numStep = action.payload
    },
    updatedStatus(state, action) {
        state.updatedStatus = action.payload
    },
    setIdQuestConfig(state, action) {
        state.idQuestConfig = action.payload
    },

    setfinishAnswerTest(state, action) {
        state.finishAnswerTest = action.payload
    },

    setModalMQ(state, action) {
        state.modalMQ = action.payload
    },


    setIsFinishTest(state, action) {
        state.isFinishTest = action.payload
    },


    cons(state, action) {
        console.log(action.payload)
    },
    backToTestList(state, action) {
        state.backArrow = action.payload
    },
    setCheckIfSend(state, action) {
        state.checkIfSend = action.payload
    },
    setListCheckedEmpty(state, action) {
        state.listCheckedEmpty = action.payload
    },
    setIsCheckedTest(state, action){
        state.isCheckedTest=action.payload
    },

    resetFunnelVarsToReturnToTestList(state, action) {
        state.isFinishTest = false
        state.testListInfo = false
        state.backArrow = false
        state.listView = true
        state.withoutEOnSave = false
        state.pressFinishBtn = false
        state.isClickUpdate = false
        state.sendMail = false
        state.numStep = "1"
        state.viewTest = false
        state.checkedMails = []
        state.backToTestListFromView = false
    },


}
export default produce((state, action) => createReducer(state, action, funnel), initialState);


