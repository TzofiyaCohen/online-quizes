import React, { useEffect, useState } from 'react';
import { ProgressBar, InputGroup ,FormControl} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Lightbox from "react-awesome-lightbox";
import { connect } from 'react-redux';
import './Configurator.css'
import { actions } from '../../store/actions'
import Select from 'react-select'
import Switch from "react-switch";
import "react-toggle/style.css"
import { BsCheckAll } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineReload, AiOutlineFilePdf } from 'react-icons/ai'
import { HiOutlineSearch } from 'react-icons/hi'
import { FaList, FaSave, FaFilePdf } from 'react-icons/fa';
import { FiEdit3, FiCheckSquare, FiUpload, FiSave } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { confirmAlert } from 'react-confirm-alert';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import { ImPrinter } from 'react-icons/im'
import { BsPlus, BsTrash } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link, withRouter } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'react-dropdown/style.css';
import imgURL from '../../assets/background-img/imgURLs'
import { event } from 'jquery';
import InputColor from 'react-input-color';
import { Modal, Button, Form } from "react-bootstrap";
import Timer from 'react-compound-timer'
import { GiHamburgerMenu } from 'react-icons/gi';
import Print from "../Print/Print";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Collapse,
    Label,
    FormGroup,
    Input,
    Container,
    InputGroupAddon,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledCollapse
} from "reactstrap";
import { queryByTestId } from '@testing-library/dom';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


//#endregion
function mapStateToProps(state) {
    return {
        flagConfig: state.funnelReducer.isOpenConfigurator,
        testInfo: state.funnelReducer.testInfo,
        answerTestInfo: state.funnelReducer.answerTestInfo,
        test: state.testReducer.test,
        checkedMails: state.funnelReducer.checkedMails,
        testListInfo: state.funnelReducer.testListInfo,
        allTests: state.funnelReducer.allTests,
        checkIfSend: state.funnelReducer.checkIfSend,
        checkTest: state.funnelReducer.checkTest,
        viewTest: state.funnelReducer.viewTest,
        userName: state.funnelReducer.userName,
        displayTest: state.funnelReducer.displayTest,
        numStep: state.funnelReducer.numStep,
        updatedStatus: state.funnelReducer.updatedStatus,
        idQuestConfig: state.funnelReducer.idQuestConfig,
        modal: state.funnelReducer.modal,
        modalPDF: state.funnelReducer.modalPDF,
        startTest: state.funnelReducer.startTest,
        cheating: state.testReducer.test.cheating,
        isOpenSearch: state.funnelReducer.isOpenSearch,
        trashTestArray: state.funnelReducer.trashTestArray,
        finishAnswerTest: state.funnelReducer.finishAnswerTest,
        modalMQ: state.funnelReducer.modalMQ,

        isFinishTest: state.funnelReducer.isFinishTest,
        done: state.testReducer.done, //no use?
        missing: state.testReducer.missing, //no use?
        targetOudience: state.testReducer.targetOudience,
        toSubmitTest: state.testReducer.toSubmitTest,
        eInfoTestSubmit: state.testReducer.eInfoTestSubmit,
        student: state.studentReducer.student,
        filteredTests: state.funnelReducer.filteredTests,
        collapses: state.funnelReducer.collapses,
        inTime: state.testReducer.test.inTime,
        studentFinish: state.studentReducer.student.studentFinish,
        questionCollapes: state.funnelReducer.questionCollapes,
        questionItem: state.testReducer.questionItem,
        contactsEmail: state.funnelReducer.contactsEmail,
        newContact: state.funnelReducer.newContact,
        loadedAjax1: state.funnelReducer.loadedAjax1,
        loadedAjax2: state.funnelReducer.loadedAjax2,
        isProgressBar: state.funnelReducer.isProgressBar,
        solvedTestArray: state.funnelReducer.solvedTestArray,
        AllSelected: state.funnelReducer.AllSelected,
        allDivsGrey: state.funnelReducer.allDivsGrey,
        testArrImg: state.testReducer.testArrImg,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTestName: (testName) => dispatch(actions.setTestName(testName)),
    // setDuration: (duration) => dispatch(actions.setDuration(duration)),
    setTimeDays: (time_days) => dispatch(actions.setTimeDays(time_days)),
    setTimeHours: (time_hours) => dispatch(actions.setTimeHours(time_hours)),
    setTimeMinutes: (time_minutes) => dispatch(actions.setTimeMinutes(time_minutes)),
    setDescription: (description) => dispatch(actions.setDescription(description)),
    addOpenQuestion: (event) => dispatch(actions.addOpenQuestion(event)),
    addCloseQuestion: (event) => dispatch(actions.addCloseQuestion(event)),
    setEmail: (value) => dispatch(actions.setEmail(value)),
    setOpenTest: (value) => dispatch(actions.setOpenTest(value)),
    setTimer: (value) => dispatch(actions.setTimer(value)),
    initialFilteredTest: (testList, displayTest) => dispatch(actions.initialFilteredTest({ testList, displayTest })),
    getSolvedTests: () => dispatch(actions.getSolvedTests()),
    getTrashTests: () => dispatch(actions.getTrashTests()),
    goBack: () => dispatch(actions.goBack()),
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    setNumStep: (value) => dispatch(actions.setNumStep(value)),
    deleteMultiAnswer: (event, questionIndex, answerIndex) => dispatch(actions.deleteMultiAnswer({ event, questionIndex, answerIndex })),
    setMandatoryQuestion: (i, type) => dispatch(actions.setMandatoryQuestion({ i, type })),
    setCheckedMails: (value) => dispatch(actions.setCheckedMails(value)),
    setInTime: (value) => dispatch(actions.setInTime(value)),
    setBackgroundImage: (imgURL) => dispatch(actions.setBackgroundImage(imgURL)),
    setModalPDF: () => dispatch(actions.setModalPDF()),
    setIdQuestConfig: (value) => dispatch(actions.setIdQuestConfig(value)),
    handleAnswers: (index, type, value) => dispatch(actions.handleAnswers({ index, type, value })),
    handleMultiAnswers: (questionIndex, answerNumber, value) => dispatch(actions.handleMultiAnswers({ questionIndex, answerNumber, value })),
    setFilteredTests: (tests, from) => dispatch(actions.setFilteredTests({ data: tests, from: from })),
    setIsOpenSearch: (value) => dispatch(actions.setIsOpenSearch(value)),
    setKind: (kind) => dispatch(actions.setKind(kind)),
    toTrash: (id) => dispatch(actions.toTrash(id)),
    setfinishAnswerTest: (value) => dispatch(actions.setfinishAnswerTest(value)),
    setModalMQ: (value) => dispatch(actions.setModalMQ(value)),
    setIsClickUpdate: (val) => dispatch(actions.setIsClickUpdate(val)),
    setIsFinishTest: (value) => dispatch(actions.setIsFinishTest(value)),
    ResetSelectedTest: () => dispatch(actions.ResetSelectedTest()),
    setEInfoTestSubmit: (e) => dispatch(actions.setEInfoTestSubmit(e)),
    setToSubmitTest: (value) => dispatch(actions.setToSubmitTest(value)),
    setTargetAudience: (targetAudience) => dispatch(actions.setTargetAudience(targetAudience)),
    backToTestList: (value) => dispatch(actions.backToTestList(value)),
    addMultiAnswer: (event, questionIndex) => dispatch(actions.addMultiAnswer({ event, questionIndex })),
    setSaveWithPopUp: (value) => dispatch(actions.setSaveWithPopUp(value)),
    setCollapes: (val) => dispatch(actions.setCollapes(val)),
    setQuestionCollapes: (val) => dispatch(actions.setQuestionCollapes(val)),
    setColor: (val) => dispatch(actions.setColor(val)),
    deleteQuestion: (event, questionIndex) => dispatch(actions.deleteQuestion({ event, questionIndex })),
    setFlagToggleCon: (newFlag) => dispatch(actions.setFlagToggleCon(newFlag)),
    uploudFile: (file, type, index) => dispatch(actions.uploudFile({ file, type, index })),
    setQuestionItem: (index) => dispatch(actions.setQuestionItem(index)),
    setnewContact: (value) => dispatch(actions.setnewContact(value)),
    createContactWithoutCheckPermissin: (mail) => dispatch(actions.createContactWithoutCheckPermissin(mail)),
    getUserContactsEmail: () => dispatch(actions.getUserContactsEmail()),
    setDisplayVideo: (value) => dispatch(actions.setDisplayVideo(value)),
    setVideo: (video) => dispatch(actions.setVideo(video)),
    updateFiltered: (restore, id) => dispatch(actions.updateFiltered({ restore, id })),
    setAllSelected: (value) => dispatch(actions.setAllSelected(value)),
    setPressFinishBtn: (value) => dispatch(actions.setPressFinishBtn(value)),
    setCheckIfSend: (value) => dispatch(actions.setCheckIfSend(value)),
    importImgFromPexels: (search) => dispatch(actions.importImgFromPexels(search)),
})

function Configurator(props) {
    const [search, setSearch] = useState("");
    const arrimg = [imgURL.p1, imgURL.p2, imgURL.p3, imgURL.p4, imgURL.p5,
    imgURL.p6, imgURL.p7, imgURL.p8,
    imgURL.p9, imgURL.p10, imgURL.p11, imgURL.p12,
    imgURL.p13, imgURL.p14, imgURL.p15, imgURL.p16
    ];
    const { flagConfig, testInfo, answerTestInfo, test, displayTest, updatedStatus,
        testListInfo, allTests, checkTest, viewTest, cheating, numStep, startTest } = props

    function handleChangeSearchImh(event) {
        const search = event.target.value;
        setSearch(search);
    }

    function changeBackgroundImg(img) {
        document.getElementsByClassName('test_list_title_tests')[0].style.backgroundImage = `url(${img})`;
        document.getElementsByClassName('test_list_title_tests')[0].style.backgroundSize = "cover";
        props.setBackgroundImage(img)
    }
    function putInUploadFile(video) {
        props.uploudFile(video, 'video');
    }

    useEffect(() => {
        props.importImgFromPexels('view')
    }, [])

    function backBackgroundImg() {
        document.getElementsByClassName('test_list_title_tests')[0].style.backgroundImage = `url(${imgURL.Artboard2})`;
        props.setBackgroundImage(`url(${imgURL.Artboard2})`)
    }

    function scrollQuestion(id) {
        if (window.innerWidth > 1024)
            setTimeout(() => {
                document.getElementsByClassName('div-question')[id].
                    scrollIntoView({ block: "start", behavior: "smooth" })
            }, 1);

    }
    //emails - emails list for send the test
    //checkedMails- values of user selections - display the selected list
    //selectedOption - all what the user select
    async function handleChange(selectedOption) {
        if (selectedOption != null) {
            console.log(selectedOption)

            //initial checkedMails
            if (removeOption.length > 0) {
                console.log("need to remove ", removeOption)
                updateCheckMails(selectedOption)
            }
            else
                await props.setCheckedMails(selectedOption)

            //initial ths email list
            var emails = []
            for (let i = 0; i < props.checkedMails.length; i++) {
                if (props.checkedMails[0].value.split(`"`)[1] == "All") {
                    emails = props.contactsEmail.filter(mail => mail != "All")
                    // this.props.setCheckedMails(this.props.contactsEmail.filter(mail => mail != "All"))
                    break;
                }
                emails.push(props.checkedMails[i].value.split(`"`)[1])
            }
            props.setEmail(emails)
        }
    }

    function deleteTest(id) {
        if (props.displayTest == "all")
            props.toTrash(id)
        if (props.displayTest == "checked")
            props.deleteSolvedTest(id)

        props.updateFiltered(false, id)
    }

    async function updateCheckMails(selectedOption) {
        var selected = []
        selectedOption.forEach(element => {
            if (!removeOption.includes(element.value.split(`"`)[1]))
                selected.push(element)
        });
        await props.setCheckedMails(selected)

        //initial ths email list
        var emails = []
        for (let i = 0; i < props.checkedMails.length; i++) {
            if (props.checkedMails[0].value.split(`"`)[1] == "All") {
                emails = props.contactsEmail.filter(mail => mail != "All")
                // this.props.setCheckedMails(this.props.contactsEmail.filter(mail => mail != "All"))
                break;
            }
            emails.push(props.checkedMails[i].value.split(`"`)[1])
        }
        props.setEmail(emails)
    }

    function addContactEmail(e) {
        if (props.newContact) {
            let timer00 = setTimeout(() => {
                props.setnewContact(false)
                props.getUserContactsEmail()
            }, 1000);
        }

        return (
            <>

                < p > {e.inputValue} not found</p >
                <button
                    className="btn"
                    onClick={(event) => {
                        event.preventDefault();
                        props.createContactWithoutCheckPermissin(e.inputValue);
                    }}
                    style={{ border: "solid 1px darkred", color: "darkred", boxShadow: "1px 1px" }}>
                    create new contact
                </button>
            </>
        )
    }

    function popUpAddContact() {
        return (
            <div style={{ height: "60vh" }}>
                <Modal className="popUpFinishTest" style={{ left: "90%" }} show={props.newContact} >
                    <Modal.Header >
                        <p style={{ marginBottom: '0.1rem', color: 'rgb(0 0 0 / 74%)', marginTop: "-0.7vh", marginLeft: "4vh" }}>
                            Contact added
                            <BsCheckAll style={{ color: 'green', width: '30%', height: "5vh", marginRight: "50vh", marginTop: "-9vh", zIndex: "5" }}></BsCheckAll>
                        </p>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }

    function deleteQuestionCinfigurator(e, index) {
        if (props.test.questions.length > 1 && index != 0) {
            // await document.getElementsByClassName('div-question')[index - 1].
            //     scrollIntoView({ block: 'center', behavior: "smooth" });
            props.setIdQuestConfig(index - 1);
        }
        if (index == 0) {
            props.setIdQuestConfig(0);
        }
        props.deleteQuestion(e, index)
    }

    function popUpMQ() {
        return <Modal className="popUpAnswerTest" id='popUpAlertId' show={true} style={{ left: "60%", top: "30%" }}>
            <Modal.Header closeButton style={{ zIndex: "999" }} onClick={(e) => { props.setModalMQ(false) }}>
            </Modal.Header>

            <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                {/* you didnt answer on required question:  {props.student.test.ArrayMQ}</h1> */}
                <h1 className="modal-mandetory-q" style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '6vh' }}>
                    you didnt answer on required question: </h1>
                {arrayModalMQ.map(ques =>
                    <span> {ques}, </span>
                )}
            </Modal.Body >
        </Modal>
    }


    function checkedPopUp() {
        if (props.student.test.ArrayMQ.length == 0)//בדיקה שהמערך של השאלות חובה לא ריק
            return props.setfinishAnswerTest(true);
        else {
            if (props.student.test.answersArray.length == 0)//אם המערך של התשובות ריק מדפיס את מערך שאלות חובה
            {
                setArrayModalMQ(props.student.test.ArrayMQ);
                return props.setModalMQ(true);
            }

            //  alert("you didnt answer on required question:  " + props.student.test.ArrayMQ);
            else {
                if (props.student.test.answersArray.length == props.student.test.questions.length)//בדיקה שהתלמיד ענה על כל השאלות במבחן
                    return props.setfinishAnswerTest(true);
                else {
                    var ArrayPU = [];
                    props.student.test.ArrayMQ.forEach(question => {
                        var flag = 0;
                        props.student.test.answersArray.forEach(answer => {
                            if (question == answer.questionNumber)
                                flag = 1;
                            // ArrayPU.push(answer.questionNumber);

                        })
                        if (!flag)
                            ArrayPU.push(question);

                    })
                    if (ArrayPU.length > 0) {
                        setArrayModalMQ(ArrayPU);
                        return props.setModalMQ(true);
                    }
                    // return alert("you didnt answer on required question:  " + ArrayPU);
                    else
                        return props.setfinishAnswerTest(true);

                }
            }
        }


    }

    async function addAnswerFunc(e, index) {
        await props.addMultiAnswer(e, index)
        // if(window.innerWidth>1024)
        // document.getElementsByClassName('div-question')[index].getElementsByClassName('ans-input')
        // [document.getElementsByClassName('div-question')[index].getElementsByClassName('ans-input').length - 1].focus()
        // else{
        //     document.getElementsByClassName('div-conf-ans')[index].getElementsByClassName('ans-input')
        //     [document.getElementsByClassName('div-conf-ans')[index].getElementsByClassName('ans-input').length-1].focus()

        // }
        document.getElementsByClassName('div-conf-ans')[index].getElementsByClassName('ans-input')
        [document.getElementsByClassName('div-conf-ans')[index].getElementsByClassName('ans-input').length - 1].focus()

    }

    async function addQuestionFunc(e, index) {
        await props.addCloseQuestion(e)
        if (window.innerWidth > 1024)
            document.getElementsByClassName('div-question')[props.test.questions.length].
                scrollIntoView({ block: 'center', behavior: "smooth" });
        props.setIdQuestConfig(props.test.questions.length);
    }

    function moveCursorToEnd(e) {
        var el = e.target;
        el.focus()

        // el.scrollLeft = el.scrollWidth;
        // if (typeof el.selectionStart == "number") {
        //     el.selectionStart = el.selectionEnd = el.value.length;
        // } else if (typeof el.createTextRange != "undefined") {
        //     var range = el.createTextRange();
        //     range.collapse(false);
        //     range.select();
        // }
        // https://stackoverflow.com/questions/49041751/javascript-dont-toggleclass-if-clicked-again
    }

    // var h = parseInt(test.timer / 60 / 60);
    // var m = parseInt((test.timer / 60) % 60);
    // var s = 0;
    // if (startTest) {
    //     const testTimer = setInterval(showTime, 1000);
    //     showTime()
    //     function showTime() {
    //         if (s < 0) {
    //             s = 59;
    //             m -= 1;
    //             if (m < 0) {
    //                 m = 59;
    //                 h -= 1;
    //                 if (h < 0) {
    //                     clearInterval(testTimer);
    //                 }
    //             }
    //         }
    //         if (document.getElementById('timer')
    //             && (s != -1 && m != -1 && h != -1)
    //         ) {
    //             document.getElementById('timer').innerHTML = checkDigits(h) + ":" + checkDigits(m) + ":" + checkDigits(s);
    //             if (m < 5) {
    //                 document.getElementById('timer').className = "almost_finish";
    //             }
    //         }
    //         s--
    //         if (!s && !m && !h) {
    //             setTimeout(() => {
    //                 props.setTimer(0);
    //                 props.setInTime(false);
    //             }, 2000);
    //         }
    //     }
    // }

    // function checkDigits(x) {
    //     return x < 10 ? "0" + x : x;
    // }

    // function search(result) {
    //     if (result != "") {
    //         console.log(result);
    //         searchConversations(result)
    //     }
    //      else {
    //         if (props.displayTest == "all")
    //             props.setFilteredTests(props.allTests,"search all")
    //         else {
    //             if (props.displayTest == "deleted")
    //                 props.setFilteredTests(props.trashTestArray,"search deleted")
    //             else if(props.displayTest == "checked")
    //                 props.setFilteredTests(props.solvedTestArray,"search solved")
    //         }
    //     }
    // }

    // function searchConversations(searchText) {
    //     let filteredtests = [];
    //     props.setFilteredTests(filteredtests,"search conversation")

    //     if (props.displayTest == "all")
    //         var tests = props.allTests
    //     else {
    //         if (props.displayTest == "deleted")
    //             var tests = props.trashTestArray
    //         else
    //             var tests = props.solvedTestArray
    //     }

    //     tests.forEach(item => {

    //         if (item.test_name != undefined && item.test_name.toLowerCase().indexOf(searchText) > -1) {
    //             console.log(item.test_name);
    //             filteredtests.push(item);
    //             props.setFilteredTests(filteredtests,"search conversation 2")
    //         }
    //     });

    //     console.log(filteredtests);
    // }

    function modalSuccessSend() {
        let timer00 = setTimeout(() => {
            setSuccessSend(false)
        }, 2000);

        return (

            <Modal className="popUpFinishTest" show={successSend} >
                <Modal.Header >
                    <p style={{ marginBottom: '0.1rem', color: 'rgb(0 0 0 / 74%)', marginTop: "-0.7vh", marginLeft: "4vh" }}>
                        Sending was successful
                        <BsCheckAll style={{ color: 'green', width: '30%', height: "5vh", marginRight: "50vh", marginTop: "-9vh", zIndex: "5" }}></BsCheckAll>
                    </p>
                </Modal.Header>
            </Modal>
        )

    }

    function popupIfSend() {
        return (
            <Modal className="popUpAnswerTest" id='popUpAlertId' show={ifNotSend} style={{ left: "60%", top: "30%" }}>
                <Modal.Header closeButton style={{ zIndex: "999" }} onClick={(e) => { setIfNotSend(false) }}>

                </Modal.Header>

                <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                    <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '6vh', fontSize: '1.2rem' }}>
                        The test was not sent
                        Do you want to send it? </h1>
                    <Button variant="secondary" style={{ marginRight: "10%", width: "30%" }}
                        onClick={(e) => { props.backToTestList(true); setIfNotSend(false) }}>
                        no
                    </Button>
                    <Button variant="info" style={{ width: "30%" }}
                        onClick={(e) => { props.setPressFinishBtn(true); setIfNotSend(false); props.setCheckIfSend(true); setSuccessSend(true) }}>
                        yes
                    </Button>
                </Modal.Body >
            </Modal>)
    }
    function checkDigits(x) {
        return x < 10 ? "0" + x : x;
    }
    var checkIfDoneMsg = ""
    for (let i = 0; i < props.missing.length; i++) {
        if (props.missing[i] != "")
            checkIfDoneMsg += ` ${props.missing[i]}`
    }

    // useEffect(() => {
    //     if (test.timer <= 300) {
    //         setTimerColor('red')
    //         console.log(test.timer, "test.timer")
    //         console.log(timerColor, "timerColor")
    //     }
    // }, [test.timer])



    const [timerColor, setTimerColor] = useState('white');
    const [ifNotSend, setIfNotSend] = useState(false);
    const [color, setColor] = useState({});
    const [createbtn, setCreatebtn] = useState(false);
    const [searchQuestnumber, setSearchQuestnumber] = useState("")
    const [open, setOpen] = useState(false)
    const [removeOption, setRemoveOption] = useState([])
    const [openQues, setOpenQues] = useState(false)
    const [showPicture, setShowPicture] = useState(false)
    const [arrayModalMQ, setArrayModalMQ] = useState([])
    const [successSend, setSuccessSend] = useState(false)
    // const [ifPopup, setIfPopup] = useState(false)
    // const [inputTime1, setInputtime1] = useState(parseInt(props.test.duration / 60))
    // const [inputTime2, setInputtime2] = useState(parseInt(props.test.duration) - parseInt((props.test.duration) / 60) * 60)
    // const [inputTime3, setInputtime3] = useState(0)
    if (props.studentFinish) props.setFlagToggleCon(false)

    return (
        <>
            {flagConfig &&
                <div id="wrap-configurator" className=" config-time" >
                    <GiHamburgerMenu className="burg-icon burg-icon-config pointer ml-1" id="icon"
                        onClick={() =>
                            document.getElementById('wrap_center').scrollIntoView({ block: 'end', behavior: "smooth" })
                        } />


                    {/* {testInfo && !viewTest &&

                        < div className="back-arrow" >

                            <IoIosArrowBack id="icon" onClick={(e) => {
                                testInfo && props.backToTestList(true)
                                testInfo && props.setToSubmitTest(true)
                                testInfo && props.setEInfoTestSubmit(e)
                                testInfo && props.setSaveWithPopUp(false)
                                props.goBack()
                                setCreatebtn(false)
                            }} />
                            <span style={{ fontSize: '1.0rem', paddingLeft: '0.4rem' }}
                                onClick={(e) => {
                                    testInfo && props.backToTestList(true)
                                    testInfo && props.setToSubmitTest(true)
                                    testInfo && props.setEInfoTestSubmit(e)
                                    testInfo && props.setSaveWithPopUp(false)
                                    props.goBack()
                                    setCreatebtn(false)
                                }}
                            >All Tests</span>
                        </div>
                    } */}
                    {
                        //  {testInfo && numStep == "1" &&
                        //  <div className="dropdown-div dropdown-creates">
                        //      <Dropdown>
                        //          <Dropdown.Toggle>Create new</Dropdown.Toggle>
                        //          <Dropdown.Menu>
                        //              <Dropdown.Item onClick={() => props.setKind('quiz')}>quiz</Dropdown.Item>
                        //              <Dropdown.Item onClick={() => props.setKind('survey')}>survey</Dropdown.Item>
                        //          </Dropdown.Menu>
                        //      </Dropdown>
                        //  </div>
                        // }
                        <div className="w3-panel w3-border-bottom menu-config" style={{ marginTop: "1.5rem" }} >
                            {
                                // ((testListInfo && displayTest == "all") || testInfo) && !updatedStatus &&
                                //     ((testListInfo) || testInfo) && !updatedStatus &&
                                //     <div className="create-btn pointer"
                                //         onClick={() => setCreatebtn(true)}
                                //     >
                                //         Create New
                                //        <div className="row-create-btn"><IoIosArrowForward id="icons" />
                                //     </div>
                                //         {createbtn &&
                                //             <div className="create-btn2">
                                //                 <div onClick={() => {
                                //                     document.getElementsByClassName('create-btn')[0].style.display = "none"
                                //                     props.setKind('quiz')
                                //                 }
                                //                 }>
                                //                     <Link to={`/${props.userName}/add`} className="create_link">
                                //                         New Test
                                //                     </Link>
                                //                 </div>
                                //                 <div onClick={() => {
                                //                     document.getElementsByClassName('create-btn')[0].style.display = "none"
                                //                     props.setKind('survey')
                                //                 }}>
                                //                     <Link to={`/${props.userName}/add`} className="create_link">
                                //                         New Survey
                                //                      </Link>
                                //                 </div>
                                //             </div>}
                                // </div>


                                testListInfo &&
                                //  || testInfo) && !updatedStatus &&

                                < Dropdown
                                    style={{ backgroundColor: "transparent", display: "flex", justifyContent: "center" }}
                                    className="pointer create-btn">
                                    <div onClick={() => (setOpen(!open))} className="create-new">

                                        <Dropdown.Toggle className="dropdown-toggle-create"
                                            style={{ padding: "0px", boxShadow: "none", overflow: "none", border: "none", backgroundColor: "white", width: "inherit" }}
                                            className="pointer ml-3 create-btn" >
                                            {/* Create New */}
                                            {/* onClick={()=>(setOpen(!open))} */}

                                            <div className="div-dropdown" style={{ lineHeight: "5vh", height: "5vh", color: "#3A4552" }} >Create New</div>
                                            <div className="row-create-btn create-new-btn"
                                                style={{ height: "5vh", padding: "0px", color: "#56D4DE", marginTop: "-5vh" }}>
                                                {!open && <IoIosArrowForward id="icons" />}
                                                {open && <IoIosArrowDown id="icons" />}
                                            </div>

                                        </Dropdown.Toggle>
                                    </div>
                                    <Dropdown.Menu style={{ backgroundColor: "transparent" }}>
                                        <Dropdown.Item className="dropdown-create-new" style={{ marginTop: "0vh", height: "90%" }} onClick={() => {
                                            document.getElementsByClassName('create-btn')[0].style.display = "none"
                                            props.setKind('quiz')
                                        }}
                                            as={Link}
                                            to={`/${props.userName}/add/quiz`}
                                        >

                                            <Link to={`/${props.userName}/add/quiz`} className="create_link">
                                                New Test
                                            </Link>

                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-create-new" style={{ height: "90%" }} onClick={() => {
                                            document.getElementsByClassName('create-btn')[0].style.display = "none"
                                            props.setKind('survey')
                                        }}
                                            as={Link}
                                            to={`/${props.userName}/add/survey`}
                                        >
                                            <Link to={`/${props.userName}/add/survey`} className="create_link">
                                                New Survey
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-create-new" style={{ height: "90%" }} onClick={() => {
                                            document.getElementsByClassName('create-btn')[0].style.display = "none"
                                            props.setKind('position')
                                        }}
                                            as={Link}
                                            to={`/${props.userName}/add/position`}
                                        >
                                            <Link to={`/${props.userName}/add/position`} className="create_link">
                                                New Position
                                            </Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>





                                // <div className="dropdown-div dropdown-creates">
                                //     <Dropdown style={{ border: "0" }}>
                                //         <Dropdown.Toggle className="over-toggel" style={{ paddingTop: "0" }}>
                                //             <FiEdit3 id="icon" className="mb-1 ml-1" style={{ color: "#B50E0E" }}></FiEdit3>
                                //             <p className="ml-1 create-p-btn">
                                //                 {/* <Link to={`/${props.userName}/add`} className="p_link"> */}
                                //                     Create new
                                //                 {/* </Link> */}
                                //             </p>

                                //         </Dropdown.Toggle>
                                //         <Dropdown.Menu>
                                //             <Dropdown.Item onClick={() => props.setKind('quiz')}>
                                //                 <Link to={`/${props.userName}/add`} className=" p_link">
                                //                     quiz
                                //                 </Link>
                                //             </Dropdown.Item>
                                //             <Dropdown.Item onClick={() => props.setKind('survey')}>
                                //                 <Link to={`/${props.userName}/add`} className=" p_link">
                                //                     survey
                                //                 </Link>
                                //             </Dropdown.Item>
                                //         </Dropdown.Menu>
                                //     </Dropdown>
                                // </div>
                                // <div>
                                //     <FiEdit3 id="icon" className="mb-1 ml-3"></FiEdit3>
                                //     <p>
                                //         <button className="new-btn ml-3">
                                //             <Link to={`/${props.userName}/add`}> New</Link>
                                //         </button></p>
                                // </div>
                            }

                            {/* {updatedStatus
                                &&
                                <div className="focus-config">
                                    <FiEdit3 id="icon" className="mb-1 ml-3"></FiEdit3>
                                    <p className="ml-3">
                                        {props.test.kind == "quiz" ?
                                            "Updating Test" : "Updating Survey"
                                        }

                                    </p>
                                </div>

                            } */}
                            {
                                // (testListInfo && displayTest == "all") 
                                (testListInfo)
                                &&
                                <div
                                    className={testListInfo && displayTest == "all" ? "mt-3 focus-config pointer" : "mt-3 pointer"}
                                    onClick={() => props.initialFilteredTest(allTests, "all")}
                                >
                                    <FaList id="icon" style={{ marginTop: "0.9vh" }} className="mb-1 pb-1 ml-3" > </FaList>

                                    <p onClick={() => props.initialFilteredTest(allTests, "all")} className="ml-3 pointer">
                                        <Link to={`/${props.userName}`} className="p_link">
                                            Test List ({props.allTests.length}) </Link></p>
                                </div>
                            }
                            {
                                // (testListInfo || displayTest == "checked") && displayTest != "deleted"
                                testListInfo
                                && !viewTest &&
                                <div
                                    className={testListInfo && displayTest == "checked" ? "mt-1 focus-config" : "mt-1 pointer"}
                                    onClick={() => {
                                        props.getSolvedTests()
                                        props.ResetSelectedTest()
                                    }}
                                >
                                    <FiCheckSquare id="icon" className="mb-1 ml-3 pointer"></FiCheckSquare>
                                    <p onClick={() => {
                                        props.getSolvedTests()
                                        props.ResetSelectedTest()
                                    }}

                                        className="ml-3 pointer">
                                        <Link className="p_link">
                                            Solved test ({props.solvedTestArray.length}) </Link>
                                    </p>
                                </div>
                            }
                            {
                                // (testListInfo || displayTest == "deleted") && displayTest != "checked" &&
                                (testListInfo) &&
                                <div
                                    className={testListInfo && displayTest == "deleted" ? "mt-1 focus-config" : "mt-1 pointer"}
                                    onClick={() => {
                                        props.getTrashTests()
                                        props.ResetSelectedTest()
                                    }
                                    }

                                >
                                    <RiDeleteBinLine id="icon" style={{ marginTop: "-0.1vh" }} className="mb-1 ml-3 pointer"></RiDeleteBinLine>
                                    <p onClick={() => {
                                        props.getTrashTests()
                                        props.ResetSelectedTest()
                                    }
                                    } className="ml-3 pointer">
                                        <Link className="p_link">
                                            Deleted tests ({props.trashTestArray.length}) </Link>
                                    </p>
                                </div>
                            }

                            {/* <p onClick={() => props.setTestToCheckList()}>Solved Test List</p> */}
                        </div>
                    }
                    {/* {(testListInfo) &&
                        <div className="mt-3 div-con-search">
                            <p className="ml-4 mb-0">search:</p>
                            <div className="search-test search-test-config pt-2">

                                <HiOutlineSearch id="icon" className="search-icon" onClick={() => props.setIsOpenSearch(props.isOpenSearch)} />
                                <div >
                                     {props.isOpenSearch == false ? search('') : ""}
                                    {props.isOpenSearch &&
                                        <input className="search-input"
                                            type="text" onChange={(e) => search(e.target.value)}></input>
                                    }
                                </div>
                            </div>
                        </div >

                    } */}
                    {
                        testInfo && numStep == "1" &&
                        (props.test.kind != "" || updatedStatus) &&
                        <div className="mt-3 test_info_config">



                            <div className="collapse-panel" id="footerHead">
                                <Card className="card-refine card-plain border-card">
                                    <CardHeader className="filter_title color-card" id="headingTwo" role="tab"

                                    >

                                        <h6 className="mb-0">
                                            <a
                                                className="text-info d-flex justify-content-between"
                                                aria-expanded={props.collapses.includes(2)}
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    props.setCollapes(2);
                                                }}
                                            >
                                                {props.test.kind == "quiz" ?
                                                    'Test details' :
                                                    props.test.kind == "survey" ?
                                                        'Survey setting' :
                                                        'Position details'

                                                    /* Test setting{" "} */

                                                }
                                                {props.collapses.includes(2) ?
                                                    <IoIosArrowDown className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} /> :
                                                    <IoIosArrowForward className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} />
                                                    // <BiMinus id="icon" /> :
                                                    // <BsPlus id="icon" />
                                                }
                                                {/* <FontAwesomeIcon icon={['fas', collapses.includes(2) ? 'minus' : 'plus']}></FontAwesomeIcon> */}
                                            </a>
                                        </h6>
                                    </CardHeader>
                                    <Collapse isOpen={props.collapses.includes(2)} style={{ background: "#0F1322 0% 0%" }}>
                                        <CardBody className="pl-0 pr-0">
                                            {props.test.date && props.updatedStatus ?
                                                <span className="dateSpan mb-2 marginTop" style={{ marginLeft: "1.3rem" }}> {props.test.date}</span>
                                                : ''}
                                            <input className="input_info input-xx  mb-2 input-config" type="text"
                                                placeholder={props.test.kind == "quiz" ? "Test Name" : props.test.kind == "survey" ? "Survey Name" : "Position Name"}
                                                onChange={(e) => props.setTestName(e.target.value)}
                                                value={props.test.test_name}
                                            />
                                            {/* <span>Test description</span> */}
                                            <input className="input_info input-xx mb-1 input-config" style={{ height: "5vh" }} type="text"
                                                placeholder={props.test.kind == "quiz" ? "Test Description" : props.test.kind == "survey" ? "Survey Description" : "Position Description"}

                                                onChange={(e) => props.setDescription(e.target.value)}
                                                value={props.test.description}
                                            />

                                            {

                                                (props.test.kind != "survey") &&
                                                <div className="mt-3" style={{ marginLeft: "1.3rem" }}>
                                                    <h6 className="info " style={{ marginRight: "1vh", color: "white" }}>Test Time</h6>
                                                    {/* <input className="input_info" type="number"
                                                        onChange={(e) => props.setDuration(e.target.value)}
                                                        value={props.test.duration} />
                                                             minutes */}
                                                    <div style={{ color: "darkgray" }}>
                                                        <span style={{ marginRight: "1rem" }}>days</span><span style={{ marginRight: "1rem" }}>hours</span><span>minutes</span>
                                                    </div>
                                                    <input
                                                        // days
                                                        type="number"
                                                        className="input-time-config"
                                                        style={{ textAlign: "center" }}
                                                        // value={parseInt(props.test.duration / 60)}
                                                        value={parseInt(props.test.time_days) < 10 ?
                                                            "0" + parseInt(props.test.time_days) : parseInt(props.test.time_days)}
                                                        min={0}
                                                        placeholder={"00"}
                                                        onChange={(e) => {
                                                            if (e.target.value == "") { props.setTimeDays(0) }
                                                            else {
                                                                props.setTimeDays(e.target.value);
                                                            }
                                                        }
                                                        } />

                                                    <input
                                                        //hours
                                                        type="number"
                                                        className="input-time-config"
                                                        style={{ textAlign: "center" }}
                                                        // value={parseInt(props.test.duration) - parseInt(props.test.duration / 60) * 60}
                                                        value={parseInt(props.test.time_hours) < 10 ?
                                                            "0" + parseInt(props.test.time_hours) :
                                                            parseInt(props.test.time_hours)}

                                                        min={0}
                                                        max={23}
                                                        placeholder={"00"}
                                                        onChange={(e) => {
                                                            if (e.target.value == "") { props.setTimeHours(parseInt(0)) }
                                                            else {

                                                                props.setTimeHours(e.target.value)

                                                            }

                                                        }
                                                        } />
                                                    <input
                                                        //minutes
                                                        type="number"
                                                        className="input-time-config"
                                                        style={{ textAlign: "center" }}
                                                        // value={parseInt(props.test.duration) - parseInt(props.test.duration / 60) * 60}
                                                        value={parseInt(props.test.time_minutes) < 10 ?
                                                            "0" + parseInt(props.test.time_minutes) :
                                                            parseInt(props.test.time_minutes)}
                                                        max={59}
                                                        min={0}
                                                        placeholder={"00"}
                                                        onChange={(e) => {
                                                            if (e.target.value == "") { props.setTimeMinutes(parseInt(0)) }
                                                            else {

                                                                props.setTimeMinutes(e.target.value)

                                                            }

                                                        }
                                                        } />
                                                </div>
                                            }
                                            {/* <br></br> */}
                                            <span style={{ paddingRight: '0.3rem', lineHeight: "4", marginLeft: "1.3rem" }} >Internet blocking</span>
                                            <Switch className="switchTimer switch-border"
                                                checked={!(props.test.openTest)}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                offHandleColor="#dee2e6"
                                                onHandleColor="#56D4DE"
                                                onChange={() => props.setOpenTest(props.test.openTest)}
                                                height={13}
                                                width={30}
                                                offColor={'#888'}
                                                onColor={'#888'}
                                            />

                                            {/* // onChange={(e) => props.setOpenTest(e.target.checked)} /> */}
                                            {/* <Toggle
                                checked={!(props.test.openTest)}
                                icons={false}
                                onChange={(e) => props.setOpenTest(e.target.checked)} /> */}

                                            <input className="input_info input-config mb-3 marginTop input-xx" type="text" style={{ marginLeft: "1.3rem" }}
                                                placeholder={props.test.kind == "quiz" ? "Target Audience" : "Target Audience"}
                                                onChange={(e) => props.setTargetAudience(e.target.value)}
                                                value={props.test.targetAudience}
                                            />
                                            <div style={{ marginLeft: "1.3rem" }}>Delete Test:{" "}
                                                <BsTrash id="icon" className=" pb-1 pointer" style={{ marginRight: "3%", color: "white" }} onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <div className="back-box">
                                                                    <div className='custom-ui'>
                                                                        <IoClose className="xicon" id="icons"
                                                                            onClick={() => onClose()}
                                                                        />
                                                                        <p>Do You Want To Remove The Test To Trash?</p>
                                                                        <button className="cancel" onClick={onClose}>Cancel</button>
                                                                        <button className="delete" onClick={(e) => {
                                                                            deleteTest(props.test.id)
                                                                            onClose()
                                                                            testInfo && props.backToTestList(true)
                                                                            testInfo && props.setToSubmitTest(true)
                                                                            testInfo && props.setEInfoTestSubmit(e)
                                                                            testInfo && props.setSaveWithPopUp(false)
                                                                            // props.goBack()
                                                                            setCreatebtn(false)
                                                                        }}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })

                                                }} ></BsTrash>
                                            </div>


                                        </CardBody>

                                    </Collapse>
                                </Card>

                                <CardBody className="p-0">
                                    <Card className="card-refine card-plain border-card">
                                        <CardHeader className={props.collapses.includes(1) ? "fixed-div-collapse filter_title color-card" : "filter_title color-card"} id="headingOne" role="tab"
                                        //   style={{position:props.collapses.includes(1)?"fixed":""}}
                                        >
                                            <h6 className="mb-0">
                                                <a
                                                    className="text-info d-flex justify-content-between"
                                                    aria-expanded={props.collapses.includes(1)}
                                                    data-toggle="collapse"
                                                    data-parent="#accordion"
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.setCollapes(1);
                                                    }}
                                                >
                                                    {
                                                        'Questions'
                                                    }
                                                    {props.collapses.includes(1) ?
                                                        <IoIosArrowDown className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} /> :
                                                        <IoIosArrowForward className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} />
                                                        // <BiMinus id="icon" /> :
                                                        // <BsPlus id="icon" />
                                                    }
                                                    {/* <FontAwesomeIcon icon={['fas', collapses.includes(1) ? 'minus' : 'plus']}></FontAwesomeIcon> */}
                                                </a>
                                            </h6>
                                        </CardHeader>
                                        <Collapse isOpen={props.collapses.includes(1)} style={{ background: "#0F1322 0% 0%" }}>
                                            <CardBody className="body-p-collapse pl-0 pr-0">
                                                {/* ------------------------------------------------------ */}

                                                {/* <span>Test name</span> */}

                                                <span className="spanquest">
                                                    {/* <input type="text" onChange={ (e)=>
                                setSearchQuestnumber(e.target.value)
                                }></input> */}
                                                    <button style={{ borderRadius: "5px", fontSize: "small", fontWeight: "bolder", height: "4.2vh", width: "15vh", marginLeft: "1.3rem" }}
                                                        onClick={(e) => addQuestionFunc(e, props.idQuestConfig)}>Add New +</button>
                                                </span>




                                                <div className="dropdown-div dropdown-questions">
                                                    {
                                                        // props.test.questions.map((ques, index) =>
                                                        <CardBody className="intocardconfigurator p-0">
                                                            <Card className="card-question-config">
                                                                <CardHeader className="filter_title card-header py-2 pr-0" >
                                                                    <div onClick={() => (setOpenQues(!openQues))}>
                                                                        <Dropdown>
                                                                            {/* <div> */}
                                                                            <Dropdown.Toggle style={{ backgroundColor: "transparent", borderColor: "transparent", boxShadow: "none" }}>
                                                                                {/* <div> */}
                                                                                Select Questions
                                                                                <div className="row-create-btn "
                                                                                    style={{ padding: "0px", color: "#56D4DE", marginTop: "-6vh" }}>
                                                                                    {!openQues && <IoIosArrowForward id="icons" style={{ transform: "translate(750%, 110%)", color: "grey" }} />}
                                                                                    {openQues && <IoIosArrowDown id="icons" style={{ transform: "translate(750%, 110%)", color: "grey" }} />}
                                                                                </div>
                                                                                {/* </div> */}
                                                                            </Dropdown.Toggle>
                                                                            {/* </div> */}
                                                                            <Dropdown.Menu style={{ minWidth: "89%", borderRadius: "0px" }}>
                                                                                {props.test.questions.map((ques, index) =>
                                                                                    <Dropdown.Item style={{ backgroundColor: "#232634", marginRight: "5vh", padding: "7px" }}
                                                                                        onClick={() => (props.setQuestionItem(index))}
                                                                                    >
                                                                                        <div style={{ textOverflow: "ellipsis", overflow: "auto", overflowX: "hidden" }}>
                                                                                            {index + 1}. {ques.question}
                                                                                        </div>
                                                                                    </Dropdown.Item>
                                                                                )}
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                    {/* <a
                                                                            className="text-info"
                                                                            aria-expanded={props.questionCollapes.includes(index)}
                                                                            data-toggle="collapse"
                                                                            data-parent="#accordion"
                                                                            href="#pablo"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                props.setQuestionCollapes(index);
                                                                            }}
                                                                        >{index + 1}. {props.test.questions[index].question}
                                                                            <div className="icons-questions-config">
                                                                                <BsTrash className="delete-quest-config mx-1 pointer" id="icons"
                                                                                    onClick={
                                                                                        async (e) => {
                                                                                            await props.setQuestionCollapes(index);
                                                                                            deleteQuestionCinfigurator(e, index)
                                                                                        }
                                                                                    }
                                                                                />
                                                                                {props.questionCollapes.includes(index) ?
                                                                                    <IoIosArrowDown className="mx-1 iconCollapse" id="icon" /> :
                                                                                    <IoIosArrowForward className="mx-1 iconCollapse" id="icon" />
                                                                                }
                                                                            </div>
                                                                        </a> */}
                                                                </CardHeader>
                                                                {/* <Collapse isOpen={props.questionCollapes.includes(index)}> */}


                                                                <CardBody className="collapes-into-question px-0 pb-0 pt-1">
                                                                    <div className="card-header" style={{ paddingTop: "0px" }}>
                                                                        <span className="require-quest"
                                                                            style={{
                                                                                // left: '-6',
                                                                                color: 'red',
                                                                                display: !props.test.questions[props.questionItem].mandatoryQuestion ? 'none' : true
                                                                            }}>*
                                                                        </span>
                                                                        <input className="input_info input-xx mb-3 mt-1" type="text" style={{ marginLeft: "0.5rem", background: "#232634", borderBottom: "none" }}
                                                                            // <input className="input_info input-xx  mb-2 input-config" type="text" style={{ marginLeft: "0.5rem",background:"#263038",borderBottom:"none",width:"93%"}}
                                                                            placeholder={Number(props.questionItem + 1) == 1 ? "How are you today?" : "Question"}
                                                                            onChange={(e) => props.handleAnswers(props.questionItem, 'question', e.target.value)}
                                                                            value={props.test.questions[props.questionItem].question}
                                                                            onClick={moveCursorToEnd}
                                                                        />

                                                                        <span className="d-flex flex-col mq">
                                                                            <span style={{ paddingRight: '0.3rem', paddingLeft: '0.1rem', marginTop: "1vh" }} className="m-0">required</span>

                                                                            <Switch className="mx-2"
                                                                                // defaultValue={true}
                                                                                checked={props.test.questions[props.questionItem].mandatoryQuestion}
                                                                                uncheckedIcon={false}
                                                                                checkedIcon={false}
                                                                                offHandleColor="#FFFFFF"
                                                                                onHandleColor="#56D4DE"
                                                                                height={18}
                                                                                width={36}
                                                                                onChange={() => {
                                                                                    props.setMandatoryQuestion(props.questionItem, props.test.questions[props.questionItem].mandatoryQuestion)
                                                                                }}
                                                                            ></Switch>
                                                                        </span>
                                                                        <br />
                                                                        <span className="spanquest">Answers
                                                                            <button onClick={(e) => addAnswerFunc(e, props.questionItem)} style={{ border: "transparent", backgroundColor: "transparent", color: "white", paddingTop: "0px" }}>+</button>

                                                                        </span>
                                                                        <div className="div-conf-ans">
                                                                            {props.test.questions[props.questionItem].answers.map((ans, answerIndex) =>
                                                                                // <div className="icons-questions-config ">
                                                                                <div className="d-flex flex-row mr-0">
                                                                                    <span className="in-card-ans mr-1">
                                                                                        {props.test.kind === "quiz" &&
                                                                                            < input
                                                                                                style={{ marginRight: "1vh" }}
                                                                                                type="radio"
                                                                                                checked={props.test.questions[props.questionItem].correctAnswer == ans.answerNumber}
                                                                                                id={ans.answerNumber}
                                                                                                name={"select_answer" + props.questionItem}
                                                                                                onChange={(e) => props.handleAnswers(props.questionItem, 'correctAnswer', e.target.id)}
                                                                                            />}</span>
                                                                                    <span className="in-card-ans" > {answerIndex + 1}. </span>
                                                                                    <div >
                                                                                        <input className={props.test.questions[props.questionItem].correctAnswer == ans.answerNumber ? "in-card-ans ans-input  right-ans" : "in-card-ans ans-input "}
                                                                                            autoComplete="off"
                                                                                            name={ans.answerNumber}
                                                                                            type="text"
                                                                                            placeholder={
                                                                                                Number(props.questionItem + 1) == 1 ?
                                                                                                    ans.answerNumber == 1 ? "Okay" : ans.answerNumber == 2 ? "Fine" : ans.answerNumber == 3 ? "Bad"
                                                                                                        : "Answer.." :
                                                                                                    "Answer"}
                                                                                            value={ans.answer}
                                                                                            onChange={(e) => props.handleMultiAnswers(props.questionItem, e.target.name, e.target.value)}
                                                                                            onClick={moveCursorToEnd}
                                                                                        >
                                                                                        </input>
                                                                                    </div>
                                                                                    <div>
                                                                                        <BsTrash className="delete-quest-config mx-1 pointer" id="icons" style={{ marginTop: "11" }}
                                                                                            onClick={(e) => props.deleteMultiAnswer(e, props.questionItem, answerIndex)} />
                                                                                    </div>

                                                                                </div>
                                                                                // </div>
                                                                            )}
                                                                        </div>



                                                                        {/* <input className="input_info input-xx mb-3 mt-1" type="text"
                                                                                placeholder={Number(index + 1) == 1 ? "How are you today?" : "Question"}
                                                                                onChange={(e) => props.handleAnswers(index, 'question', e.target.value)}
                                                                                value={props.test.questions[index].question}
                                                                                onClick={moveCursorToEnd}
                                                                            />
                                                                            <br />
                                                                            <span className="spanquest">Answers
                                                                             <button onClick={(e) => addAnswerFunc(e, index)}>+</button>
                                                                            </span>
                                                                            <div className="div-conf-ans">
                                                                                {props.test.questions[index].answers.map((ans, i) =>
                                                                                    <div className="icons-questions-config">
                                                                                        <div className="d-flex flex-row">
                                                                                            <span className="in-card-ans mr-1">
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    checked={props.test.questions[index].correctAnswer == ans.answerNumber}
                                                                                                    id={ans.answerNumber}
                                                                                                    name={"select_answer" + index}
                                                                                                    onChange={(e) => props.handleAnswers(index, 'correctAnswer', e.target.id)}
                                                                                                /></span>
                                                                                            <span className="in-card-ans"> {i + 1}.</span>
                                                                                            <input className={props.test.questions[index].correctAnswer == ans.answerNumber ? "in-card-ans ans-input  right-ans" : "in-card-ans ans-input "}
                                                                                                autoComplete="off"
                                                                                                name={ans.answerNumber}
                                                                                                type="text"
                                                                                                placeholder={
                                                                                                    Number(index + 1) == 1 ?
                                                                                                        ans.answerNumber == 1 ? "Okay" : ans.answerNumber == 2 ? "Fine" : ans.answerNumber == 3 ? "Bad"
                                                                                                            : "Answer.." :
                                                                                                        "Answer"}
                                                                                                value={ans.answer}
                                                                                                onChange={(e) => props.handleMultiAnswers(index, e.target.name, e.target.value)}
                                                                                                onClick={moveCursorToEnd}
                                                                                            />
                                                                                            <BsTrash className="delete-quest-config mx-1 pointer" id="icons" style={{ marginTop: "11" }}
                                                                                                onClick={(e) => props.deleteMultiAnswer(e, props.test.questions[index].correctAnswer, props.answerNumber - 1)} />
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div> */}
                                                                    </div>
                                                                </CardBody>
                                                                {/* </Collapse> */}
                                                            </Card>
                                                        </CardBody>
                                                        // )
                                                    }



                                                    {/* <Dropdown>
                                <BsTrash className="delete-quest-config pointer" id="icons"
                                onClick={(e)=>deleteQuestionCinfigurator(e,props.idQuestConfig) }
                                />

                              
                                    <Dropdown.Toggle>Question number {props.idQuestConfig + 1}</Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: "40px" }}>
                                        {props.test.questions.map(quest =>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    props.setIdQuestConfig(props.test.questions.indexOf(quest));
                                                    scrollQuestion(props.test.questions.indexOf(quest))
                                                }}
                                                style={{ color: props.idQuestConfig == props.test.questions.indexOf(quest) ? "red" : "white" }}
                                            >
                                                Question {props.test.questions.indexOf(quest) + 1}
                                             </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown> */}

                                                </div>

                                                {/* <input className="input_info input-xx mb-3 mt-1" type="text"
                             placeholder={Number(props.idQuestConfig + 1) == 1 ? "How are you today?" :"Question"}
                                onChange={(e) => props.handleAnswers(props.idQuestConfig, 'question', e.target.value)}
                                value={props.test.questions[props.idQuestConfig].question}
                                onClick={moveCursorToEnd}
                            /> */}

                                                {/* <br/>
                            <span className="spanquest">Answers
                            <button onClick={(e)=>addAnswerFunc(e,props.idQuestConfig)}>+</button>
                            </span> */}
                                                {/* <div className="div-conf-ans">
                                
                                {console.log(props.test.questions[props.idQuestConfig].answers)}
                                {props.test.questions[props.idQuestConfig].answers.map(ans =>
                                    <div className="mb-2">
                                        <span className="in-card-ans mr-1">
                                        <input 
                                        type="radio"
                                        checked={props.test.questions[props.idQuestConfig].correctAnswer == ans.answerNumber}
                                        id={ans.answerNumber}
                                        name={"select_answer" + props.idQuestConfig}
                                        onChange={(e) => props.handleAnswers(props.idQuestConfig, 'correctAnswer', e.target.id)}
                                        /></span>
                                        <span className="in-card-ans">
                                        {ans.answerNumber}.
                                    </span>
                                        <input className={props.test.questions[props.idQuestConfig].correctAnswer == ans.answerNumber ? "in-card-ans ans-input  right-ans" : "in-card-ans ans-input "}
                                            autoComplete="off"
                                            name={ans.answerNumber}
                                            type="text"
                                            placeholder={
                                                Number(props.idQuestConfig + 1) == 1 ?
                                                ans.answerNumber == 1 ? "Okay" : ans.answerNumber == 2 ? "Fine" : ans.answerNumber == 3 ? "Bad"
                                                : "Answer..":
                                                "Answer"}
                                            value={ans.answer}
                                            onChange={(e) => props.handleMultiAnswers(props.idQuestConfig, e.target.name, e.target.value)}
                                            onClick={moveCursorToEnd}
                                        />
                                    </div>
                                )


                                }
                            </div> */}

                                                {/* ------------------------------------------------------ */}

                                            </CardBody>
                                        </Collapse>
                                    </Card>


                                    <Card className="card-refine card-plain border-card">
                                        <CardHeader className="filter_title color-card" id="headingTwo" role="tab"
                                        >
                                            <h6 className="mb-0">
                                                <a
                                                    className="text-info d-flex justify-content-between"
                                                    aria-expanded={props.collapses.includes(3)}
                                                    data-toggle="collapse"
                                                    data-parent="#accordion"
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.setCollapes(3);
                                                    }}
                                                >
                                                    {props.test.kind == "quiz" ?
                                                        'Video' : 'Video'

                                                    }
                                                    {props.collapses.includes(3) ?
                                                        <IoIosArrowDown className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} /> :
                                                        <IoIosArrowForward className="mx-1 iconCollapse" id="icon" style={{ width: "16px", height: "19px", color: "white" }} />
                                                    }
                                                </a>
                                            </h6>
                                        </CardHeader>
                                        <Collapse isOpen={props.collapses.includes(3)} style={{ background: "#0F1322 0% 0%" }}>
                                            <CardBody className="pl-0 pr-0">
                                                <div className="d-flex flex-row" style={{ marginLeft: "1.3rem" }}>
                                                    <span style={{ paddingRight: '0.3rem' }} className="m-0">Show video</span>
                                                    <Switch className=" switchTimer switch-border"
                                                        checked={props.test.displayVideo}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onChange={() => props.setDisplayVideo(!props.test.displayVideo)}
                                                        height={13}
                                                        width={31}
                                                        offColor={'#888'}
                                                        onColor={'#080'}
                                                    />
                                                    {props.test.video == '' && <label className="custom-file-uplod">
                                                        <input
                                                            type="file"
                                                            accept=".mp4"
                                                            onChange={(e) => putInUploadFile(e.target.files)}
                                                            style={{ display: 'none' }}
                                                        />
                                                        {props.test.video != '' && ReactPlayer.canPlay(props.test.video)}
                                                        <FiUpload id="icon" className="icon-up-load uploadFile" />
                                                    </label>}
                                                </div>
                                                <div className="d-flex flex-row">

                                                    <input
                                                        style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }}
                                                        value={props.test.video}
                                                    ></input>
                                                    {props.test.video != '' && <BsTrash className="icon-up-load trashFile" id="icons" style={{ cursor: "pointer" }}
                                                        onClick={() => props.setVideo('')}
                                                    />}



                                                </div>
                                                {props.isProgressBar && <ProgressBar
                                                    className='progressBarVideo'
                                                    variant="success"
                                                    active="true"
                                                    animated
                                                    now={props.loadedAjax1 + props.loadedAjax2}
                                                    label={`${Math.round(props.loadedAjax1) +
                                                        Math.round(props.loadedAjax2)
                                                        }%`}
                                                />}

                                            </CardBody>

                                        </Collapse>
                                    </Card>
                                </CardBody>
                            </div>
                        </div>
                    }
                    {
                        testInfo && numStep == "2" &&
                        <div className="mt-4 test_info_config">
                            <div className="pref mb-4">
                                <p>Image</p>
                                <AiOutlineReload id="icon" className="mt-1 pointer" onClick={() => backBackgroundImg()} />
                            </div>
                            {/* <div className="uploaddiv mb-5">
                                <FiUpload id="icon" />
                            </div> */}
                            {
                                <div className="wrapper-color my-3">
                                    <span className="info">color: </span>
                                    <input type="color"
                                        className="pointer" style={{ background: "none", border: "none" }}
                                        defaultValue="#56D4DE"
                                        onChange={(e) => {
                                            var x = parseInt(e.target.value.substr(1, 2), 16) + ',' +
                                                parseInt(e.target.value.substr(3, 2), 16) + ',' +
                                                parseInt(e.target.value.substr(5, 2), 16)
                                            console.log(e.target.value)
                                            document.getElementById('body').style.setProperty('--colorStyle', x)
                                            props.setColor(x)
                                        }}
                                    />
                                </div>
                            }
                            {
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Search.."
                                        aria-label="Search.."
                                        aria-describedby="Search.."
                                        onChange={handleChangeSearchImh}
                                    />
                                    <Button variant="outline-secondary" id="button-addon2"
                                    onClick={() => props.importImgFromPexels(search)}
                                    >
                                        <BiSearch></BiSearch>
                                    </Button>
                                </InputGroup>
                                // <div style={{ paddingBottom: '1rem' }} className="main-search">
                                //     <div className="row">
                                //         <div className="col">
                                //             <input style={{ backgroundColor: '#fff' }} onChange={handleChangeSearchImh} className="form-control" placeholder="Search.." type="text" />
                                //         </div>
                                //         <div className="col">
                                //             <Button variant="secondary"
                                //                 onClick={() => props.importImgFromPexels(search)}
                                //             >search</Button>

                                //         </div>
                                //     </div>
                                // </div>
                            }
                            {props.testArrImg.length > 0 ?
                                < div className="container imgs-div">
                                    <div className="con-img mr-2">
                                        <div className="row">
                                            {console.log(props.testArrImg)}
                                            {props.testArrImg.map(p =>
                                                <div className=" col-5 mr-2 mb-2 pointer"
                                                    style={{
                                                        backgroundImage: `url(${p.src.portrait})`
                                                    }}
                                                    onClick={() => changeBackgroundImg(p.src.portrait)}
                                                >
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                : < div className="container imgs-div">
                                    <div className="con-img mr-2">
                                        <div className="row">
                                            {console.log(props.testArrImg)}
                                            {arrimg.map(p =>
                                                <div className=" col-5 mr-2 mb-2 pointer"
                                                    style={{
                                                        backgroundImage: `url(${p})`
                                                    }}
                                                    onClick={() => changeBackgroundImg(p)}
                                                >
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>}


                            {/* <p style={{ fontSize: "15px" }}>Internet blocking</p>
                             <Toggle
                                checked={!(props.test.openTest)}
                                 icons={false}
                                 onChange={(e) => props.setOpenTest(e.target.checked)} /> */}

                            {/* {
                                (props.test.kind == "quiz") &&
                                <>
                                    <h6 className="info mt-3">Test Time</h6>
                                    <input className="input_info" type="number" min={0}
                                        onChange={(e) => props.setDuration(e.target.value)}
                                        value={props.test.duration} />
                                        minutes
                                </>

                            } */}

                            {
                                //     <>
                                //     <InputColor
                                //     initialValue="#C90A0A"
                                //     placement="right"
                                //     onChange={ setColor}
                                //     />
                                //     <div>jnjnk{color.rgba}</div>
                                //    </>
                                // <div className="wrapper-color mt-4">
                                //     <span className="info">color: </span>
                                //     <input type="color"
                                //         className="pointer"
                                //         // value="#C90A0A"
                                //         defaultValue="#C90A0A"
                                //         onChange={(e) => {
                                //             console.log(e.target.value)
                                //             document.getElementById('body').style.setProperty('--colorStyle',
                                //                 parseInt(e.target.value.substr(1, 2), 16) + ',' +
                                //                 parseInt(e.target.value.substr(3, 2), 16) + ',' +
                                //                 parseInt(e.target.value.substr(5, 2), 16)
                                //             )
                                //         }}
                                //     />
                                // </div>
                            }
                        </div>
                    }
                    {/* {
                        testInfo && numStep == "3" &&
                        <div className="mt-4 test_info_config">
                            <p style={{ fontSize: "15px" }}>Internet blocking</p>
                            <Toggle
                                checked={!(props.test.openTest)}
                                icons={false}
                                onChange={(e) => props.setOpenTest(e.target.checked)} />
                            {
                                props.test.kind == 'quiz' &&
                                <>
                                    <h6 className="info mt-3">Test Time</h6>
                                    <input className="input_info" type="number"
                                        onChange={(e) => {props.setDuration(e.target.value)}}
                                        value={props.test.duration} min={0} />
                                </>
                            }
 */}

                    {/* <p style={{ marginTop: "10px", color: "#CBCCB;", fontSize: "15px" }}>Add question:</p>
                            <button className="btn btn-primary mr-2 ml-3" onClick={(e) => props.addCloseQuestion(e)}>Add Question</button>
                            <button className="btn btn-primary" onClick={(e) => props.addOpenQuestion(e)}>Open</button> */}
                    {/* </div>
                    } */}
                    {
                        testInfo && numStep == "3" &&
                        <div className="mt-4 test_info_config container">
                            Export
                            <div className="active-icons row ">
                                {/* <button className="col"><FiSave id="icon" style={{ width: '25px', height: '32px' }}                          /></button> */}
                                <button className="col mx-3">
                                    {/* <PDFdocument /> */}
                                    <AiOutlineFilePdf id="icon"
                                        style={{ width: '27px', height: '32px' }}
                                        onClick={() => props.setModalPDF()} />
                                </button>
                                <button className="col" onClick={(e) => e.preventDefault()}>
                                    <Print onClick={(e) => { e.preventDefault(); }}></Print>
                                </button>
                            </div>
                            <div className="send-div">
                                <div>
                                    {/* <div>
                                        <p>Send to:</p>
                                        <input type="email" id="email" className="input_info"
                                            onChange={(e) => props.setEmail(e.target.value)}
                                        />
                                    </div> */}

                                    {/* <div className="conf-select">
                                        Choose Contact:
                                         <Select className="selectmail"
                                            isMulti
                                            closeMenuOnSelect={false}
                                            onChange={handleChange}
                                            noOptionsMessage={addContactEmail}
                                            options={props.AllSelected ? [] : props.contactsEmail.map((email, index) => {
                                                return {
                                                    label: <span className="d-flex-row flex-row-reverse row mr-0 justified-content-between"
                                                        onClick={async (e) => { email == "All" && await props.setAllSelected(true) }}>
                                                        <span className="col-4 btn"
                                                            style={{ textAlign: "end", paddingRight: "0px" }}>
                                                            <button
                                                                style={{ zIndex: "99999", fontFamily: "monospace", width: "4vh" }}
                                                                className="btn"
                                                                name={email}
                                                                onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    await setRemoveOption(removeOption.concat([e.target.name]));
                                                                    console.log(removeOption, "removeOption")
                                                                    updateCheckMails(props.checkedMails)
                                                                }}>X</button>
                                                        </span>
                                                        <span className="col-8" style={{ paddingTop: "4%" }}>
                                                            <p style={{ paddingTop: "4%" }}>{email}</p></span>
                                                    </span>,
                                                    value: email == "All" ? JSON.stringify([props.contactsEmail]) : JSON.stringify([email])
                                                };
                                            })}
                                        /> 
                                    </div>*/}
                                </div>
                                {/* <input form="test_form" type="submit" value="Submit"
                                    className="btn btn-primary submit" /> */}
                            </div>

                        </div>
                    }
                    {
                        answerTestInfo &&

                        <div className="anser-test-info-div">
                            {console.log(test.timer)}
                            {/* {document.getElementsByClassName("config-time")[0].style.setProperty("--seconds", '60s')} */}

                            {
                                // alert(document.getElementsByClassName("config-time")[0].style.getPropertyValue("--seconds"))
                                document.getElementsByClassName("config-time")[0] ?
                                    document.getElementsByClassName("config-time")[0].style.setProperty("--seconds", test.timer + 's')
                                    : ""
                            }
                            {startTest && props.test.kind != 'survey' && (props.test.time_days > 0 || props.test.time_hours > 0 || props.test.time_minutes > 0) &&
                                <div class="wrapper-anim">
                                    <div class="pie spinner"></div>
                                    <div class="pie filler"></div>
                                    <div class="mask"><div></div></div>
                                    <div className="border-circle">
                                        <div className="circle-time">
                                            {/* <button onClick={()=>alert(test.timer)}></button> */}
                                            {<p id="timer"
                                            //  className={test.timer < 300 ? "almost_finish" : null}
                                            >
                                                {/* {test.timer <= 300 ? setTimerColor('red') : ''} */}
                                                <Timer
                                                    initialTime={test.timer * 1000}
                                                    direction="backward"
                                                    // onStart={alert('kjk')}
                                                    // onStop={alert("kmkm") }
                                                    checkpoints={[
                                                        {
                                                            time: 0,
                                                            callback: () => props.setTimer(0)
                                                        },
                                                        {
                                                            time: 500000,
                                                            callback: () => setTimerColor('blue')
                                                        }]}
                                                >
                                                    {({ start, resume, pause, stop, reset, timerState }) => (
                                                        <React.Fragment>
                                                            <div style={{ color: `${timerColor}` }}>
                                                                {/* {timerState} */}
                                                                <Timer.Hours formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                                                                :<Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                                                                :<Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />

                                                            </div>

                                                        </React.Fragment>
                                                    )}
                                                </Timer>
                                                {/* {parseInt((test.timer / 60) / 60) < 10 ?
                                                "0" + parseInt((test.timer / 60) / 60) : parseInt((test.timer / 60) / 60)(test.timer / 60)}:
                            {parseInt((test.timer / 60) % 60) < 10 ?
                                                "0" + parseInt((test.timer / 60) % 60) : parseInt((test.timer / 60) % 60)}:
                            {(test.timer - parseInt(test.timer / 60) * 60) < 10 ?
                                                "0" + (test.timer - parseInt(test.timer / 60) * 60) : (test.timer - parseInt(test.timer / 60) * 60)} */}
                                            </p>}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {
                        viewTest && !testListInfo &&
                        <div className="div-view-test">
                            <div className="student-name">{`Solved By: `}
                                <div> {test.studentUserName}</div>
                            </div>

                            <div className="grade pt-1">

                                {props.test.kind == "quiz" && <span>
                                    {parseInt(test.grade) + "%"}
                                </span>}
                                {/* <div>Duration of the test: </div>
                                <div> {test.time_days} days, {test.time_hours} hours and {test.time_minutes} minutes</div> */}
                                {cheating && <p style={{ color: "red" }}>The system detected cheating</p>}
                            </div>
                            <div className="descript my-5">
                                {/* <div>{`name of profession: ${test.test_name} `}</div> */}
                                <div>{`Created by: ${test.creator}`}</div>
                                {test.cvFile && <div className="student-name">CV File</div>}
                                {test.cvFile ?
                                    <a class="iframe" href={test.cvFile} target="_blank"><iframe className="image-iframe" src={test.cvFile} /></a>
                                    : ''}
                                {/* {test.cvFile && showPicture &&
                                    <Lightbox image={test.cvFile}
                                        onClose={() => {
                                            setShowPicture(false)
                                        }}
                                        title="Image Title"></Lightbox>
                                } */}

                                {test.cvFile && <a class="iframe iframeLink" href={test.cvFile} target="_blank">show CV File</a>}

                            </div>


                        </div>
                    }
                    {
                        (testInfo || answerTestInfo || checkTest) && //||viewTest
                        <div className="bottom_configurtor ">

                            <div className=" bottom-items ">


                                {testInfo && numStep == "3" ?
                                    <div style={{ height: "6vh" }}>
                                        {/* <button className="div-bottom-box col-md-6 "
                                            onClick={() => props.setNumStep((Number(numStep) - 1))}>
                                            Prev
                                        </button> */}
                                        <input style={{ marginLeft: '23%' }} form="test_form" type="submit" value="Finish"
                                            className="div-bottom-box col-md-6"
                                            onClick={(e) => {

                                                // !props.checkIfSend ?
                                                //     setIfNotSend(true) : props.backToTestList(true)
                                                // props.setPressFinishBtn(true);
                                                props.test.sendTo_email.list.length > 0 ?
                                                    props.checkIfSend ?
                                                        props.backToTestList(true) && props.setCheckIfSend(false) : setIfNotSend(true) : props.backToTestList(true)

                                            }}
                                        />
                                    </div> :
                                    (answerTestInfo || checkTest) ?
                                        <input form="answer_test_form" type="button"
                                            onClick={() => (checkedPopUp())} value="Submit The Test" className={props.allDivsGrey ? "ansSubmit div-bottom-box" : "div-bottom-box"} style={{ width: "75%", marginLeft: "1.8rem" }}
                                        // onClick={() => (props.setfinishAnswerTest(true))} value="Submit The Test" className="div-bottom-box col-md-12"
                                        />
                                        ://<input form="answer_test_form" type="button" onClick={() => (props.setfinishAnswerTest(true))} value="Submit The Test" className="div-bottom-box col-md-12"///>
                                        //:
                                        <div d-flex flex-row style={{ width: "100%" }}>
                                            {/* className="Row d-flex justify-content-center" */}

                                            {/* <button className="div-bottom-box div-bottom-box-s col-2 mx-1"
                                                onClick={() => testInfo && (numStep == "2" || numStep == "3") ?
                                                    props.setNumStep((Number(numStep) - 1)) :
                                                    viewTest ? props.goBack() : ""

                                                }>
                                                <div>
                                                    <IoIosArrowBack id="icon" />
                                                </div> */}
                                            {/* {testInfo && (numStep == "1" || numStep == "2" || numStep == "3") ? "Prev" :
                                                numStep == "2" && testInfo && props.done ? alert(`${checkIfDoneMsg}`) :
                                                viewTest ? "Solved Tests" : ""

                                                }
                                                <div className="into-div-bottom-box">
                                                    <div>
                                                        <IoIosArrowUp id="icon" />
                                                    </div>
                                                </div> */}
                                            {/* </button> */}

                                            <input form="test_form" type="submit" value="Update" className="div-bottom-box update-input" onClick={() => props.setIsClickUpdate(true)} />

                                            {/* <BsTrash id="icon" className=" pb-1 pointer" style={{ marginRight: "3%", color: "white" }} onClick={() => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <div className="back-box">
                                                                <div className='custom-ui'>
                                                                    <IoClose className="xicon" id="icons"
                                                                        onClick={() => onClose()}
                                                                    />
                                                                    <p>Do You Want To Remove The Test To Trash?</p>
                                                                    <button className="cancel" onClick={onClose}>Cancel</button>
                                                                    <button className="delete" onClick={(e) => {
                                                                        deleteTest(props.test.id)
                                                                        onClose()
                                                                        testInfo && props.backToTestList(true)
                                                                        testInfo && props.setToSubmitTest(true)
                                                                        testInfo && props.setEInfoTestSubmit(e)
                                                                        testInfo && props.setSaveWithPopUp(false)
                                                                        // props.goBack()
                                                                        setCreatebtn(false)
                                                                    }}>Delete</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })

                                            }} ></BsTrash> */}
                                            {/* {testInfo && !viewTest &&

                                                // < div className="back-arrow" >

                                                <div className="wrap-tooltip1" style={{ background:"#131D26 0% 0% no-repeat padding-box"}}>
                                                    <FaList id="icon" className="pointer pb-1" style={{ color: "white", marginTop: "-8.5vh", marginLeft: "87%" }}
                                                        onClick={(e) => {
                                                            testInfo && props.backToTestList(true)
                                                            testInfo && props.setToSubmitTest(true)
                                                            testInfo && props.setEInfoTestSubmit(e)
                                                            testInfo && props.setSaveWithPopUp(false)
                                                            // props.goBack()
                                                            setCreatebtn(false)
                                                        }} />
                                                    <p className="tooltip-text-area" style={{ marginTop: "-4vh", width: "35%", marginRight: "5%" }}>Home Page</p>
                                                </div>
                                                // </div>
                                            } */}

                                            {/* <button className="div-bottom-box div-bottom-box-s  col-2 mx-1"
                                                onClick={() => testInfo && (numStep == "1" || numStep == "2") ?
                                                    props.setNumStep((Number(numStep) + 1)) :
                                                    viewTest ? props.goBack() : ""
                                                }
                                            > */}

                                            {/* <div>
                                                    <IoIosArrowForward id="icon" />
                                                </div> */}

                                            {/* {testInfo && (numStep == "1" || numStep == "2" || numStep == "3") ? "Next" :
                                                    //  testInfo && numStep == "3" ? "Finish" :
                                                    viewTest ? "Solved Tests" : ""
                                                }

                                                <div className="into-div-bottom-box">
                                                    <div>
                                                        <IoIosArrowUp id="icon" />
                                                    </div>
                                                </div> */}
                                            {/* </button> */}

                                        </div>

                                }


                            </div>

                            {/* {testInfo &&
                            <div className="d-flex row justified-content-between w-100 h-100">
                                <input form="test_form" type="submit" value="Submit"
                                    className="btn btn-primary submit" />
                                <input type="email" id="email" placeholder="SEND TO..."
                                    onChange={(e) => props.setEmail(e.target.value)} />
                            </div>
                        }
                    */}


                        </div>

                    }
                    {viewTest && !testListInfo &&
                        <input form="view" type="submit" value="Back" className="div-bottom-box col-6" style={{ top: "49%", left: "25%" }} />
                    }

                    {answerTestInfo &&
                        props.modalMQ ? popUpMQ() : null}
                    {testInfo && numStep == "3" &&
                        ifNotSend && popupIfSend()}
                    {testInfo && numStep == "3" && successSend && modalSuccessSend()}

                </div>
            }

        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Configurator)