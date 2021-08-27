import React from "react"
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import AddQuestion from "../AddQuestion/AddQuestion"
import { FaSave, FaFilePdf, FaRegEdit } from 'react-icons/fa';
import { BsCheckAll } from 'react-icons/bs';
import { ImPrinter } from 'react-icons/im'
import { RiSurveyLine, RiSuitcaseLine } from 'react-icons/ri';
import { AiOutlineFilePdf } from 'react-icons/ai';
import "./AddTest.css"
import 'react-dropdown/style.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Select from 'react-select'
import { event } from "jquery";
import PDFdocument from '../PDFdocument/PDFdocument';
import { Modal, Button, Form, Container, Col, Row } from "react-bootstrap";
import TextareaAutosize from 'react-textarea-autosize';
import Switch from "react-switch";
import ReactPlayer from 'react-player';
import moment from 'moment';
import Print from "../Print/Print";
import { GiConsoleController } from "react-icons/gi";

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        testListInfo: state.funnelReducer.testListInfo,
        userName: state.funnelReducer.userName,
        sendMailflag: state.funnelReducer.sendMail,
        checkIfSend: state.funnelReducer.checkIfSend,
        numStep: state.funnelReducer.numStep,
        mailsarr: state.funnelReducer.mailsarr,
        checkedMails: state.funnelReducer.checkedMails,
        backgroundImage: state.testReducer.test.backgroundImage,
        modalPDF: state.funnelReducer.modalPDF,
        isFinishTest: state.funnelReducer.isFinishTest,
        toSubmitTest: state.testReducer.toSubmitTest,
        eInfoTestSubmit: state.testReducer.eInfoTestSubmit,
        done: state.testReducer.done,
        backArrow: state.funnelReducer.backArrow,
        savedStatus: state.testReducer.savedStatus,
        saveWithPopUp: state.funnelReducer.saveWithPopUp,
        collapses: state.funnelReducer.collapses,
        contactsEmail: state.funnelReducer.contactsEmail,
        sendTo_email_list: state.testReducer.test.sendTo_email.list,
        noChange: state.testReducer.noChange,
        newContact: state.funnelReducer.newContact,
        AllSelected: state.funnelReducer.AllSelected,
        withoutEOnSave: state.funnelReducer.withoutEOnSave,
        pressFinishBtn: state.funnelReducer.pressFinishBtn,
        listCheckedEmpty: state.funnelReducer.listCheckedEmpty,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTestName: (testName) => dispatch(actions.setTestName(testName)),
    // setDuration: (duration) => dispatch(actions.setDuration(duration)),
    setTimeDays: (time_days) => dispatch(actions.setTimeDays(time_days)),
    setTimeHours: (time_hours) => dispatch(actions.setTimeHours(time_hours)),
    setTimeMinutes: (time_minutes) => dispatch(actions.setTimeMinutes(time_minutes)),
    addQuestion: (event) => dispatch(actions.addQuestion(event)),
    setAllSelected: (value) => dispatch(actions.setAllSelected(value)),
    setDescription: (description) => dispatch(actions.setDescription(description)),
    setTestInfo: (value) => dispatch(actions.setTestInfo(value)),
    addCloseQuestion: (event) => dispatch(actions.addCloseQuestion(event)),
    setEmailBody: (userName) => dispatch(actions.setEmailBody(userName)),
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    addTest: (test) => dispatch(actions.addTest(test)),
    sendMail: (email) => dispatch(actions.sendMail(email)),
    setSendMail: (value, from) => dispatch(actions.setSendMail({ value, from })),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setCheckedMails: (value) => dispatch(actions.setCheckedMails(value)),
    setModalPDF: () => dispatch(actions.setModalPDF()),
    setIsFinishTest: (value) => dispatch(actions.setIsFinishTest(value)),
    setEmail: (list) => dispatch(actions.setEmail(list)),
    setTargetAudience: (targetAudience) => dispatch(actions.setTargetAudience(targetAudience)),
    setEInfoTestSubmit: (e) => dispatch(actions.setEInfoTestSubmit(e)),
    setToSubmitTest: (value) => dispatch(actions.setToSubmitTest(value)),
    updateTest: (testID, updatedTest) => dispatch(actions.updateTest({ testID, updatedTest })),
    setStatus: (status) => dispatch(actions.setStatus(status)),
    setKind: (kind) => dispatch(actions.setKind(kind)),
    setCollapes: (val) => dispatch(actions.setCollapes(val)),
    setOpenTest: (value) => dispatch(actions.setOpenTest(value)),
    setnoChange: (value) => dispatch(actions.setnoChange(value)),
    getUserContactsEmail: () => dispatch(actions.getUserContactsEmail()),
    createContactWithoutCheckPermissin: (mail) => dispatch(actions.createContactWithoutCheckPermissin(mail)),
    setnewContact: (value) => dispatch(actions.setnewContact(value)),
    setAnswerQuestion1: (index, answer) => dispatch(actions.setAnswerQuestion1({ index, answer })),
    setQuestion1: (value) => dispatch(actions.setQuestion1(value)),
    setCorrectAnswer: (value) => dispatch(actions.setCorrectAnswer(value)),
    setWithoutEOnSave: (value) => dispatch(actions.setWithoutEOnSave(value)),
    backToTestList: (value) => dispatch(actions.backToTestList(value)),
    setPressFinishBtn: (value) => dispatch(actions.setPressFinishBtn(value)),
    resetFunnelVarsToReturnToTestList: () => dispatch(actions.resetFunnelVarsToReturnToTestList()),
    resetTestVarsToReturnToTestList: () => dispatch(actions.resetTestVarsToReturnToTestList()),
    setCheckIfSend: (value) => dispatch(actions.setCheckIfSend(value)),
    setListCheckedEmpty: (value) => dispatch(actions.setListCheckedEmpty(value)),
})

class AddTest extends React.Component {


    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            isOn: false,
            date: moment(),
            removeOption: [],
            confirmExit: false,
            successSend: false,
            ifEnterInNoContact: false,
        }

    }

    checkValidation = (email) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            alert("please enter valid email")
        }
    }
    // clickEnterAddContact = (e) => {
    //     alert("dddddd ", e)
    //     if (e.keyCode === 13 && this.state.ifEnterInNoContact) {
    //         alert("in enter")
    //         e.preventDefault();
    //         this.checkValidation(e.inputValue)
    //         this.props.createContactWithoutCheckPermissin(e.inputValue);
    //         this.setState({ ifEnterInNoContact: false })
    //     }
        
    // }

    addContactEmail = (e) => {
        this.setState({ ifEnterInNoContact: true })
        if (this.props.newContact) {
            let timer00 = setTimeout(() => {
                this.props.setnewContact(false)
                this.props.getUserContactsEmail()
            }, 1000);
        }
        return (
            <>

                < p > {e.inputValue} Not found</p >
                <button
                    className="btn "
                    onClick={(event) => {
                        event.preventDefault();
                        this.checkValidation(e.inputValue)
                        this.props.createContactWithoutCheckPermissin(e.inputValue);
                    }}
                    style={{ backgroundColor: "#56D4DE", color: "white", boxShadow: "1px 1px" }}>
                    Save
                </button>


            </>
        )
    }

    popUpAddContact = () => {
        return (
            <div style={{ height: "60vh" }}>
                <Modal className="popUpFinishTest" style={{ left: "90%" }} show={this.props.newContact} >
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

    modalSuccessSend = () => {
        let timer00 = setTimeout(() => {
            this.setState({ successSend: false })
        }, 2000);

        return (

            <Modal className="popUpFinishTest" show={this.state.successSend} >
                <Modal.Header >
                    <p style={{ marginBottom: '0.1rem', color: 'rgb(0 0 0 / 74%)', marginTop: "-0.7vh", marginLeft: "4vh" }}>
                        Sending was successful
                        <BsCheckAll style={{ color: 'green', width: '30%', height: "5vh", marginRight: "50vh", marginTop: "-9vh", zIndex: "5" }}></BsCheckAll>
                    </p>
                </Modal.Header>
            </Modal>
        )

    }

    emptyList = () => {
        return (
            <Modal className="popUpAnswerTest" id='popUpAlertId' show={this.props.listCheckedEmpty} style={{ left: "60%", top: "30%" }}>
                <Modal.Header closeButton style={{ zIndex: "999" }} onClick={(e) => this.props.setListCheckedEmpty(false)}>

                </Modal.Header>

                <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                    <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '6vh', fontSize: '1.2rem' }}>
                        The send list is empty</h1>
                    <Button variant="info" style={{ width: "30%" }}
                        onClick={(e) => this.props.setListCheckedEmpty(false)}>
                        ok
                    </Button>
                </Modal.Body >
            </Modal>)
    }

    popUpSaveTest = () => {
        let timer00 = setTimeout(() => {
            this.props.setIsFinishTest(false)
            this.props.numStep === "3" ? this.setState({ isOn: true }) : this.props.setIsFinishTest(false)
        }, 1000);
        /*
        
                    <Modal className="popUpFinishTest" show={this.props.isFinishTest} >
                        <Modal.Header >
                            <p style={{ marginBottom: '0.1rem', color: 'rgb(0 0 0 / 74%)', marginTop: "-0.7vh", marginLeft: "4vh" }}>
                                Success,The Test Is Saved
                                <BsCheckAll style={{ color: 'green', width: '30%', height: "5vh", marginRight: "50vh", marginTop: "-9vh", zIndex: "5" }}></BsCheckAll>
                            </p>
                        </Modal.Header>
                    </Modal>
         */
        return (

            <Modal
                dialogClassName='ModalpopUpUpdateTest'
                className="popUpUpdateTest"
                centered
                size="sm"
                show={this.props.isFinishTest} >
                <Modal.Header >
                    <Container fluid>
                        <Row>
                            <Col style={{ padding: '0' }} >
                                <BsCheckAll style={{ color: 'green', fontSize: 'xx-large', marginRight: '1.5rem' }}></BsCheckAll>
                                <span style={{ fontSize: 'large' }}>Success,The Test Is Saved</span>
                            </Col >
                        </Row>
                    </Container>
                </Modal.Header>
            </Modal>


        )
    }


    async onSubmit(e) {
        if (!this.props.withoutEOnSave) {
            e.preventDefault();
            this.props.setWithoutEOnSave(false)
        }

        if (this.props.saveWithPopUp)
            this.props.setIsFinishTest(true)

        this.props.setTestInfo(false)
        !this.props.noChange && this.props.setTestListInfo(true)
        this.props.setToSubmitTest(false)
        this.props.checkIfDone()

        if (this.props.done)
            this.props.setStatus('completed')
        else {
            this.props.setStatus('inprogress');
        }
        if (this.props.numStep === 3 && this.props.pressFinishBtn) {
            // this.props.setTestInfo(false)
            this.props.backToTestList(true)
            this.props.setPressFinishBtn(false)
        }
        if (this.props.test.questions.length > 1) {
            if (this.props.test.questions[0].question == '')
                await this.props.setQuestion1('How are you today')
            await this.props.test.questions[0]
                .answers.map((answer, index) => {
                    if (answer.answer == '' && index < 3) {
                        switch (index) {
                            case 0: this.props.setAnswerQuestion1(index, 'Okay')
                                break;
                            case 1: this.props.setAnswerQuestion1(index, 'Fine')
                                break;
                            case 2: this.props.setAnswerQuestion1(index, 'Bad')
                                break;
                        }
                    }
                })
        }

        // if (this.props.test.questions[0].correctAnswer == 0)
        //     await this.props.setCorrectAnswer(1)
    }

    componentDidMount() {
        if (this.props.sendTo_email_list)
            this.props.getUserContactsEmail()
        this.props.setKind(this.props.match.params.kind)
        // window.addEventListener("keyup", this.clickEnterAddContact)
        // window.onbeforeunload = this.confirmExit;

    }

    confirmExit = () => {
        return (this.state.confirmExit ? "warning" : null)
    }


    componentDidUpdate(prevProps) {
        if (this.props.test != prevProps.test)
            this.props.setnoChange(false)

        if (prevProps.test.questions[0].question != "" &&
            prevProps.test.questions[0].answers[0] != "" &&
            prevProps.test.questions[0].answers[1] != "" &&
            this.props.test.questions != prevProps.test.questions
            || this.props.test.test_name != prevProps.test.test_name && prevProps.test.test_name != ""
            || this.props.test.description != prevProps.test.description && prevProps.test.description != ""
        ) {
            console.log(this.props.test.questions, prevProps.test.questions)
            console.log("set confirmExit to true")
            this.setState({ confirmExit: true })
        }

        if (this.props.testListInfo == true) {
            const test = {
                questions: this.props.test.questions ? this.props.test.questions : null,
                test_name: this.props.test.test_name ? this.props.test.test_name : `${this.props.test.kind} 00`,
                // duration: this.props.test.duration ? this.props.test.duration : null,
                time_days: this.props.test.time_days ? this.props.test.time_days : 0,
                time_hours: this.props.test.time_hours ? this.props.test.time_hours : 0,
                time_minutes: this.props.test.time_minutes ? this.props.test.time_minutes : 0,
                openTest: this.props.test.openTest,
                description: this.props.test.description ? this.props.test.description : null,
                creator: this.props.userName ? this.props.userName : null,
                backgroundImage: this.props.backgroundImage ? this.props.backgroundImage : null,
                deleted: false,
                targetAudience: this.props.test.targetAudience ? this.props.test.targetAudience : null,
                kind: this.props.test.kind,
                status: this.props.test.status,
                color: this.props.test.color,
                displayVideo: this.props.test.displayVideo,
                video: this.props.test.video,
            }

            if (this.props.saveWithPopUp)
                this.props.setIsFinishTest(true)

            console.log(test);
            //checke if the test not exist
            if (this.props.test.id === "")
                //in crud
                this.props.addTest(test)
            else {
                //in crud
                this.props.updateTest(this.props.test.id, test)
            }
        }

        if (this.props.sendMailflag == true) {
            this.props.setSendMail(false, "from add");
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
            //window.location = `/${this.props.userName}/`;
        }
        if (this.props.test != prevProps.test)
            this.props.checkIfDone()

        if (this.props.toSubmitTest === true)
            this.onSubmit(this.props.eInfoTestSubmit);

        if (!this.props.isFinishTest && !this.props.testListInfo && this.state.isOn && this.props.numStep == "3") {
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
            this.setState({ isOn: false })
            //window.location = `/${this.props.userName}/`;
        }

        if (this.props.backArrow && this.props.savedStatus && !this.props.isFinishTest) {
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
            //window.location = `/${this.props.userName}/`;
        }

        if (this.props.backArrow && this.props.noChange) {
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
            //window.location = `/${this.props.userName}/`;
        }
    }


    showQuestions = () => {
        return this.props.test.questions.map((item, index) => (
            <AddQuestion
                key={index}
                questionNumber={index + 1}
                questionIndex={index}
            />
        ))
    }
    borderviewscroll = () => {
        document.getElementsByClassName(' test_list_title_tests')[0].scrollIntoView({ block: 'start', behavior: "smooth" });

    }

    //setContactName - the name of the selected contacts
    //emails - emails of the selected contacts for send the test
    //checkedMails- array of object that the user selected in json! saved in reducer
    //selectedOption - array of object that the user selected in json!
    handleChange = async (selectedOption) => {
        if (selectedOption != null) {
            console.log(selectedOption, "selectedOption in handleChange") //"{\"name\":\"bjk\",\"email\":\"bjk@cjku.booi\"}"

            //initial checkedMails
            if (this.state.removeOption.length > 0) {
                console.log("need to remove ", this.state.removeOption)
                this.updateCheckMails(selectedOption)
            }
            else
                await this.props.setCheckedMails(selectedOption)

            //initial ths email list
            var emails = []
            for (let i = 0; i < this.props.checkedMails.length; i++) {
                if (this.props.checkedMails[0].value.split(`"`)[1] == "All") {
                    emails = this.props.contactsEmail.filter(mail => mail != "All")
                    // this.props.setCheckedMails(this.props.contactsEmail.filter(mail => mail != "All"))
                    break;
                }
                emails.push(this.props.checkedMails[i].value.split(`"`)[7].split(`\\`)[0])
            }
            this.props.setEmail(emails)

        }
    }

    updateCheckMails = async (selectedOption) => {
        console.log(selectedOption, "selectedOption in updateCheckMails") //value: "{\"name\":\"bhj\",\"email\":\"bhj@cyu.bio\"}"
        var selected = []
        selectedOption.forEach(element => {
            if (!this.state.removeOption.includes(element.value.split(`"`)[7].split(`\\`)[0]))
                selected.push(element)
        });
        await this.props.setCheckedMails(selected)

        //initial ths email list
        var emails = []
        for (let i = 0; i < this.props.checkedMails.length; i++) {
            if (this.props.checkedMails[0].value.split(`"`)[1] == "All") {
                emails = this.props.contactsEmail.filter(mail => mail != "All")
                // this.props.setCheckedMails(this.props.contactsEmail.filter(mail => mail != "All"))
                break;
            }
            emails.push(this.props.checkedMails[i].value.split(`"`)[7].split(`\\`)[0])
        }
        this.props.setEmail(emails)
    }

    modalPDF = () => {
        return (
            <Modal className='modalPDF' show={this.props.modalPDF}>
                <Modal.Header closeButton onClick={() => this.props.setModalPDF()}>
                    {/* <Modal.Title>{this.props.test.test_name} Quiz</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <PDFdocument download={true} content={true} />
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        this.props.setTestListInfo(false)
        this.props.setTestInfo(true)
        console.log(this.props.modalPDF)
        return (
            <>
                {
                    // this.props.test.kind == '' &&
                    // <div className="div-buttons" >
                    //     <p className="body-p mt-2">What would you like to produce?</p>
                    //     {/* <div className="row choose-connect justify-content-between "> */}
                    //     <div className="row choose-connect justify-content-between ">
                    //         <button className=" col col-12 col-md-4 col-sm-4 mt-3 "
                    //             style={{ marginLeft: "10%" }}
                    //             onClick={() => {
                    //                 document.getElementsByClassName('create-btn')[0].style.display = "none"
                    //                 this.props.setKind('quiz')
                    //             }} >
                    //             <div>
                    //                 <FaRegEdit id="icon" />
                    //                 <p className=" mb-1 mt-2">  Create a test</p>
                    //             </div>
                    //         </button>
                    //         <button className=" col col-12 col-md-4 col-sm-4 mt-3"
                    //             style={{ marginRight: "10%" }}
                    //             onClick={() => {
                    //                 document.getElementsByClassName('create-btn')[0].style.display = "none"
                    //                 this.props.setKind('survey')
                    //             }}>
                    //             <div>
                    //                 <RiSurveyLine id="icon" />
                    //                 {/* <RiSurveyLine className="icon-kind" id="icons" /> */}
                    //                 <p className=" mb-1 mt-2">  Create a survey</p>
                    //             </div>
                    //         </button>
                    //     </div>

                    // </div>
                }
                {this.props.test.kind != '' &&
                    < form id="test_form" onSubmit={this.onSubmit}>
                        {this.modalPDF()}
                        <div className={this.props.numStep != "3" ? " test_list_title_tests" : " test_list_title_tests test_list_title_tests3"}
                            onClick={() => this.borderviewscroll()}
                            style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
                            {
                                this.props.numStep != "3" ?
                                    // <div className="div-title-spans">
                                    <>
                                        <div className="add-border-div">
                                            <span >
                                                {this.props.test.questions.length} Questions
                                            </span>
                                            {(this.props.test.kind == "quiz" || this.props.test.kind == "position") && <div>



                                                {/* <input className="input-time-border" type="number"
                                                    onChange={(e) => {
                                                        this.props.setDuration(e.target.value);
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2)
                                                    }}

                                                    value={this.props.test.duration}
                                                />
                                         minutes  */}
                                                <span>Test time-</span>
                                                {/* <div style={{ color: "darkgray" }}>days hours minutes</div> */}

                                                <input
                                                    // days
                                                    type="number"
                                                    className="input-time-config"
                                                    style={{ textAlign: "center", width: "13%", height: "2vh", background: "transparent" }}
                                                    // value={parseInt(props.test.duration / 60)}
                                                    value={parseInt(this.props.test.time_days) < 10 ?
                                                        "0" + parseInt(this.props.test.time_days) : parseInt(this.props.test.time_days)}
                                                    min={0}
                                                    placeholder={"00"}
                                                    onChange={(e) => {
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2);
                                                        if (e.target.value == "") { this.props.setTimeDays(0) }
                                                        else {
                                                            this.props.setTimeDays(e.target.value);
                                                        }
                                                    }
                                                    } />  :

                                                <input
                                                    //hours
                                                    type="number"
                                                    className="input-time-config"
                                                    style={{ textAlign: "center", width: "13%", height: "2vh", background: "transparent" }}
                                                    // value={parseInt(props.test.duration) - parseInt(props.test.duration / 60) * 60}
                                                    value={parseInt(this.props.test.time_hours) < 10 ?
                                                        "0" + parseInt(this.props.test.time_hours) :
                                                        parseInt(this.props.test.time_hours)}

                                                    min={0}
                                                    max={23}
                                                    placeholder={"00"}
                                                    onChange={(e) => {
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2);
                                                        if (e.target.value == "") { this.props.setTimeHours(parseInt(0)) }
                                                        else {

                                                            this.props.setTimeHours(e.target.value)

                                                        }

                                                    }
                                                    } />  :
                                                <input
                                                    //minutes
                                                    type="number"
                                                    className="input-time-config"
                                                    style={{ textAlign: "center", width: "13%", height: "2vh", background: "transparent" }}
                                                    // value={parseInt(props.test.duration) - parseInt(props.test.duration / 60) * 60}
                                                    value={parseInt(this.props.test.time_minutes) < 10 ?
                                                        "0" + parseInt(this.props.test.time_minutes) :
                                                        parseInt(this.props.test.time_minutes)}
                                                    max={59}
                                                    min={0}
                                                    placeholder={"00"}
                                                    onChange={(e) => {
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2);
                                                        if (e.target.value == "") { this.props.setTimeMinutes(parseInt(0)) }
                                                        else {

                                                            this.props.setTimeMinutes(e.target.value)

                                                        }

                                                    }
                                                    } />
                                            </div>}
                                            <div>

                                                <span style={{ paddingRight: '0.3rem' }} className="m-0">Internet blocking</span>
                                                <Switch className="switchTimer switch-border"
                                                    checked={!(this.props.test.openTest)}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    offHandleColor="#dee2e6"
                                                    onHandleColor="#56D4DE"
                                                    onChange={() => {
                                                        this.props.setOpenTest(this.props.test.openTest);
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2)
                                                    }}
                                                    height={13}
                                                    width={31}
                                                    offColor={'#888'}
                                                    onColor={'#888'}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="targetAudience" >
                                            <input
                                                className="ml-2"
                                                style={{ float: "left", fontSize: "1.1vw", background: "none" }}
                                                type="text"
                                                placeholder="Target Audience"
                                                value={this.props.test.targetAudience}
                                                onChange={(e) => this.props.setTargetAudience(e.target.value)}
                                            />
                                        </div> */}
                                        {/* <textarea

                                    placeholder="The name of the test"
                                    // className="test-name test-name-area mb-0"
                                    value={this.props.test.test_name}
                                    onChange={(e) => {
                                        this.props.setTestName(e.target.value)
                                    }}
                                // maxRows={2}
                                // style={{ fontSize: "2.6vw" }}

                                > </textarea> */}
                                        {
                                            <div className="wrapper-test-name">
                                                <p style={{
                                                    marginBottom: '0',
                                                    textAlign: 'end',
                                                    paddingRight: '1%',
                                                    // fontSize: '10px',
                                                    position: "absolute",
                                                    marginLeft: "90%",
                                                    marginTop: "2%",
                                                    fontSize: '1.3vw',
                                                    fontFamily:'fangsong'
                                                }}>  {this.state.date.format('MM.DD.YYYY')}</p>
                                                <TextareaAutosize aria-label="empty textarea"
                                                    placeholder={
                                                        `The name of the ${this.props.test.kind}`}
                                                    className="test-name test-name-area mb-0 mt-2 text-descraption-title"
                                                    value={this.props.test.test_name}
                                                    onChange={(e) => {
                                                        this.props.setTestName(e.target.value)
                                                        !this.props.collapses.includes(2) && this.props.setCollapes(2)
                                                    }
                                                    }
                                                    aria-setsize="false"
                                                    style={{ fontSize: "2.4vw", lineHeight: "100%" }}
                                                    // style={{ fontSize: "2.6vw" }}
                                                    data-gramm_editor="false"
                                                    maxRows={2}
                                                    onHeightChange={() => {
                                                        // document.getElementsByClassName("config-time")[0].style.setProperty("--seconds", test.timer + 's')
                                                        // document.getElementsByClassName('test-name-area')[0].style.setProperty("fontSize", "1vw")
                                                    }}
                                                />
                                                {/* <span className="tooltip-border-1">
                                                    {this.props.test.kind == "quiz" ? "test name" : "survey name"}
                                                </span> */}
                                            </div>
                                        }
                                        {/* <input className="test-name mb-0" type="text" placeholder="The name of the test"

                                    onChange={(e) => this.props.setTestName(e.target.value)}
                                    value={this.props.test.test_name}
                                    style={{ width: "98%" }}
                                    maxLength={70}
                                /> */}

                                        <div className="wrapper-test-description">
                                            <TextareaAutosize aria-label="empty textarea"
                                                placeholder={
                                                    this.props.test.kind == "quiz" ?
                                                        "Test Description" :
                                                        this.props.test.kind == "survey" ?
                                                            "Survey Description" :
                                                            "Position Description"
                                                }
                                                className="area-test-description mb-2 text-descraption-title"
                                                value={this.props.test.description}
                                                onChange={(e) => {
                                                    this.props.setDescription(e.target.value);
                                                    !this.props.collapses.includes(2) && this.props.setCollapes(2)
                                                }}
                                                style={{ fontSize: "1.5vw" }}
                                                aria-setsize="false"
                                                data-gramm_editor="false"
                                                maxRows={2}
                                            />
                                            {/* <span className="tooltip-border-2">
                                                {this.props.test.kind == "quiz" ? "test description" : "survey description"}
                                            </span> */}
                                        </div>
                                        {this.props.test.video != '' && this.props.test.displayVideo &&
                                            <div style={{ width: '50%', height: '45%', marginLeft: '25%', top: "-2vh" }} className="wrapper-test-description">
                                                <ReactPlayer className='videoPlayer w-100 h-100'
                                                    style={{ width: '100%', height: '100%' }}
                                                    url={this.props.test.video}
                                                    controls={true}
                                                    muted={false}
                                                    loop={true}
                                                />
                                            </div>
                                        }
                                        {/* < input className="test-description mb-2" type="text" placeholder="Test Description"

                                    onChange={(e) => {
                                        this.props.setDescription(e.target.value);
                                    }

                                    }
                                    value={this.props.test.description}
                                    style={{ width: "98%" }}
                                    maxLength={70}
                                /> */}

                                        {/* <p className="test-description">{this.props.test.description == "" ? 'Test description' : this.props.test.description}</p> */}
                                        <PDFdocument />
                                    </>
                                    :

                                    <div className="savesendtitle">Save and send</div>
                            }
                        </div>
                        {
                            this.props.numStep != "3" ?
                                <div className="wrapper mt-2 mb-2">
                                    <div className="question-wrapper">
                                        {this.showQuestions()}
                                        {/* {this.props.addCloseQuestion()} */}
                                    </div>

                                </div>
                                :

                                <div className="into-progress-4">
                                    <div className="dropdown-send">
                                        <div >
                                            {/* <h4>Send to:</h4> */}
                                            <div className="d-flex">

                                                <Select className="selectmail"
                                                    closeMenuOnSelect={false}
                                                    menuIsOpen={true}
                                                    isMulti
                                                    // openMenuOnClick
                                                    // hideSelectedOptions
                                                    onChange={this.handleChange}
                                                    noOptionsMessage={this.addContactEmail}
                                                    options={this.props.AllSelected ? [] : this.props.contactsEmail.map((email, index) => {
                                                        return {
                                                            label: <span className="d-flex-{row flex-row-reverse row mr-0 justified-content-between"
                                                                style={{ textAlign: "left", height: "3vh", fontSize: "0.7rem" }}
                                                                onClick={async (e) => { email == "All" && await this.props.setAllSelected(true) }}>
                                                                <span className="col-4 btn"
                                                                    style={{ textAlign: "end", paddingRight: "0px" }}>
                                                                    <button
                                                                        style={{ zIndex: "99999", fontFamily: "monospace", width: "4vh", marginTop: "-4vh", fontSize: "0.8rem" }}
                                                                        className="btn"
                                                                        name={email.email}  // email is  {email:"", name:""} obj
                                                                        onClick={async (e) => {
                                                                            e.preventDefault();
                                                                            await this.setState({ removeOption: this.state.removeOption.concat([e.target.name]) });
                                                                            console.log(this.state.removeOption, "removeOption")
                                                                            console.log(this.props.checkedMails, "this.props.checkedMails")
                                                                            this.updateCheckMails(this.props.checkedMails)
                                                                        }}>X</button>
                                                                </span>
                                                                <span className="col-8" style={{ paddingTop: "4%", height: "20%" }}>
                                                                    <p style={{ marginTop: "-4.5vh" }}>{email.name} ------- {email.email}</p></span>
                                                            </span>,
                                                            value: email == "All" ? JSON.stringify([this.props.contactsEmail]) : JSON.stringify(email)
                                                            // value: JSON.stringify([this.props.contactsEmail])
                                                        };
                                                    })}
                                                />
                                                <div></div>

                                                <div className="bottom-div-menu" style={{ marginTop: "37vh", width: "70%", height: "6vh", marginLeft: "5%" }}>
                                                    {this.props.checkedMails.map(obj =>
                                                        <>
                                                            <label className="label-contact" style={{ float: "left" }}>
                                                                <button
                                                                    style={{ border: "none", color: "#3D4853", marginLeft: "6%", marginRight: "2%", float: "left", background: "inherit" }}
                                                                    onClick={async (e) => {
                                                                        e.preventDefault();
                                                                        await this.setState({ removeOption: this.state.removeOption.concat([obj.value.split(`"`)[7].split(`\\`)[0]]) });
                                                                        console.log(this.state.removeOption, "removeOption  second")
                                                                        console.log(this.props.checkedMails, "checkedMails second")
                                                                        this.updateCheckMails(this.props.checkedMails)
                                                                    }}
                                                                >
                                                                    x</button>
                                                                <span style={{ border: "none", fontSize: "0.7rem", right: "30%", fontFamily: "sans-serif" }}>
                                                                    {obj.value.split(`"`)[3].split(`\\`)[0]}
                                                                </span>
                                                            </label>
                                                        </>
                                                    )
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row" style={{ width: "85%", margin: "auto" }}>
                                        <div className="icons-progress-4 row">
                                            {/* <button className="col"><FaSave id="icon" /></button> */}
                                            <button style={{ marginRight: "-45%" }} onClick={(e) => { e.preventDefault(); this.props.setModalPDF() }}>
                                                <AiOutlineFilePdf style={{ marginRight: "4vh" }} id="icon" /></button>
                                            <button className="col" onClick={() => this.props.setModalPDF()}>
                                                {/* <ImPrinter id="icon" onClick={() => window.print()} /> */}
                                                <Print onClick={(e) => { e.preventDefault(); }}></Print>
                                            </button>
                                        </div>
                                        <div className="d-flex flex-row" style={{ marginTop: "3.5vh", width: "30%", marginLeft: "70%" }}>
                                            <div style={{ width: "40%", height: "3.8vh", backgroundColor: "inherit" }}>
                                                <button style={{ width: "100%", borderRadius: "3px", height: "inherit", backgroundColor: "inherit", border: "solid #3D4853 1px" }}>Cancel</button>
                                            </div>
                                            <div style={{ width: "40%", height: "3.8vh", marginLeft: "5%" }}>
                                                <button style={{ width: "100%", borderRadius: "3px", height: "inherit", backgroundColor: "#3D4853", border: "solid #3D4853 1px", color: "white" }}
                                                    onClick={(e) => {
                                                        this.props.test.sendTo_email.list.length > 0 ?
                                                            e.preventDefault() && this.props.setCheckIfSend(true) && this.props.setPressFinishBtn(true) && this.setState({ successSend: true }) : this.props.setListCheckedEmpty(true) && e.preventDefault()
                                                    }}
                                                >Send</button>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <div className="icons-progress-4 row">
                                        <button className="col"><FaSave id="icon" /></button>
                                        <button className="col mx-3" onClick={(e) => { e.preventDefault(); this.props.setModalPDF() }}>
                                            <FaFilePdf id="icon" /></button>
                                        <button className="col" onClick={(e) => e.preventDefault()}>
                                            <ImPrinter id="icon" onClick={() => window.print()} />
                                            <Print onClick={(e) => { e.preventDefault(); }}></Print>
                                        </button>
                                    </div> */}
                                </div>
                        }
                        {this.props.isFinishTest && this.popUpSaveTest()}
                        {this.props.newContact && this.popUpAddContact()}
                        {this.props.numStep == "3" && this.props.listCheckedEmpty && this.emptyList()}
                        {this.props.numStep == "3" && this.state.successSend && this.modalSuccessSend()}
                    </form>}
            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTest)

