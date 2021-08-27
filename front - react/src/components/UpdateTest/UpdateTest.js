import React from "react"
import AddQuestion from "../AddQuestion/AddQuestion"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom'
import "./updateTest.css"
import 'reactjs-popup/dist/index.css';
import Dropdown from 'react-bootstrap/Dropdown'
import { FaSave } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi'
import { BsCheckAll } from 'react-icons/bs';
import { ImPrinter } from 'react-icons/im'
import { VscClose } from 'react-icons/vsc'
import Select from 'react-select'
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import PDFdocument from "../PDFdocument/PDFdocument";
import TextareaAutosize from 'react-textarea-autosize';
import Switch from "react-switch";
import ReactPlayer from 'react-player'
import ReactToPrint from "react-to-print";
import Print from "../Print/Print";
import { CgNametag } from "react-icons/cg";
// import { scale } from "react-native-size-matters";
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        userName: state.funnelReducer.userName,
        checkIfSend: state.funnelReducer.checkIfSend,
        numStep: state.funnelReducer.numStep,
        mailsarr: state.funnelReducer.mailsarr,
        checkedMails: state.funnelReducer.checkedMails,
        backgroundImage: state.testReducer.test.backgroundImage,
        modalPDF: state.funnelReducer.modalPDF,
        sendMailflag: state.funnelReducer.sendMail,
        isFinishTest: state.funnelReducer.isFinishTest,
        targetAudience: state.testReducer.targetAudience,
        allTests: state.funnelReducer.allTests,
        toSubmitTest: state.testReducer.toSubmitTest,
        eInfoTestSubmit: state.testReducer.eInfoTestSubmit,
        testListInfo: state.funnelReducer.testListInfo,
        done: state.testReducer.done,
        backArrow: state.funnelReducer.backArrow,
        savedStatus: state.testReducer.savedStatus,
        saveWithPopUp: state.funnelReducer.saveWithPopUp,
        hasChangedTest: state.funnelReducer.hasChangedTest,
        collapses: state.funnelReducer.collapses,
        contactsEmail: state.funnelReducer.contactsEmail,
        sendTo_email_list: state.testReducer.test.sendTo_email.list,
        newContact: state.funnelReducer.newContact,
        withoutEOnSave: state.funnelReducer.withoutEOnSave,
        AllSelected: state.funnelReducer.AllSelected,
        noChange: state.testReducer.noChange,
        pressFinishBtn: state.funnelReducer.pressFinishBtn,
        listCheckedEmpty: state.funnelReducer.listCheckedEmpty,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTestName: (testName) => dispatch(actions.setTestName(testName)),
    setContactName: (name) => dispatch(actions.setContactName(name)),
    setTimeDays: (time_days) => dispatch(actions.setTimeDays(time_days)),
    setTimeHours: (time_hours) => dispatch(actions.setTimeHours(time_hours)),
    setTimeMinutes: (time_minutes) => dispatch(actions.setTimeMinutes(time_minutes)),
    addQuestion: (event) => dispatch(actions.addQuestion(event)),
    setAllSelected: (value) => dispatch(actions.setAllSelected(value)),
    setDescription: (description) => dispatch(actions.setDescription(description)),
    setTestInfo: (value) => dispatch(actions.setTestInfo(value)),
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    setCheckIfSend: (value) => dispatch(actions.setCheckIfSend(value)),
    getTest: (test) => dispatch(actions.getTest(test)),
    sendMail: (email) => dispatch(actions.sendMail(email)),
    updateTest: (testID, updatedTest) => dispatch(actions.updateTest({ testID, updatedTest })),
    addTestToStudent: (test, email) => dispatch(actions.addTestToStudent({ test, email })),
    updatedStatus: (value) => dispatch(actions.updatedStatus(value)),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setSendMail: (value, from) => dispatch(actions.setSendMail({ value, from })),
    setCheckedMails: (value) => dispatch(actions.setCheckedMails(value)),
    setModalPDF: () => dispatch(actions.setModalPDF()),
    setIsFinishTest: (value) => dispatch(actions.setIsFinishTest(value)),
    setTargetAudience: (targetAudience) => dispatch(actions.setTargetAudience(targetAudience)),
    setEInfoTestSubmit: (e) => dispatch(actions.setEInfoTestSubmit(e)),
    setToSubmitTest: (value) => dispatch(actions.setToSubmitTest(value)),
    setStatus: (status) => dispatch(actions.setStatus(status)),
    getAllTests: (copy) => dispatch(actions.getAllTests({ copy })),
    initialFilteredTest: (testList, displayTest) => dispatch(actions.initialFilteredTest({ testList, displayTest })),
    setStatusSaved: (value) => dispatch(actions.setStatusSaved(value)),
    setDate: (value) => dispatch(actions.setDate(value)),
    setHasChangedTest: (value) => dispatch(actions.setHasChangedTest(value)),
    setCollapes: (val) => dispatch(actions.setCollapes(val)),
    setEmail: (list) => dispatch(actions.setEmail(list)),
    setOpenTest: (value) => dispatch(actions.setOpenTest(value)),
    setWithoutEOnSave: (value) => dispatch(actions.setWithoutEOnSave(value)),
    setnewContact: (value) => dispatch(actions.setnewContact(value)),
    createContactWithoutCheckPermissin: (mail) => dispatch(actions.createContactWithoutCheckPermissin(mail)),
    getUserContactsEmail: () => dispatch(actions.getUserContactsEmail()),
    setAnswerQuestion1: (index, answer) => dispatch(actions.setAnswerQuestion1({ index, answer })),
    setQuestion1: (value) => dispatch(actions.setQuestion1(value)),
    setCorrectAnswer: (value) => dispatch(actions.setCorrectAnswer(value)),
    setModalPrint: () => dispatch(actions.setModalPrint()),
    setnoChange: (value) => dispatch(actions.setnoChange(value)),
    backToTestList: (value) => dispatch(actions.backToTestList(value)),
    setNumStep: (value) => dispatch(actions.setNumStep(value)),
    setPressFinishBtn: (value) => dispatch(actions.setPressFinishBtn(value)),
    resetFunnelVarsToReturnToTestList: () => dispatch(actions.resetFunnelVarsToReturnToTestList()),
    resetTestVarsToReturnToTestList: () => dispatch(actions.resetTestVarsToReturnToTestList()),
    setListCheckedEmpty: (value) => dispatch(actions.setListCheckedEmpty(value)),
})

class EditTest extends React.Component {
    pdfExportComponent

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            isOn: false,
            removeOption: [],
            // confirmExit: false,
            textCatch: false,
            successSend: false,
        }
    }

    componentDidMount() {
        this.props.setTestInfo(true)
        //in crud
        this.props.getTest(this.props.match.params.id)
        // this.props.setDate(((this.props.allTests.filter(quiz => quiz._id == this.props.match.params.id)[0]).lastOpened).slice(0, 10))
        this.props.getUserContactsEmail()

        // window.onbeforeunload = this.confirmExit;

    }


    // confirmExit = () => {
    //     return (this.state.confirmExit ? "warning" : null)
    //     // let exit = confirm("Are you the boss?");
    // }

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


    popUpSaveTest = (text) => {

        let timer00 = setTimeout(() => {
            this.props.setIsFinishTest(false)
            this.props.numStep === "3" ? this.setState({ isOn: true }) : this.props.setIsFinishTest(false)
        }, 1000);

        return (
            <div>
                <Modal
                    dialogClassName='ModalpopUpUpdateTest'
                    className="popUpUpdateTest"
                    centered
                    show={this.props.isFinishTest}
                    size="sm" >
                    <Modal.Header>
                        {/* <Modal.Title id="example-modal-sizes-title-sm"> */}
                        <Container fluid>
                            <Row>
                                <Col style={{ padding: '0' }} >
                                    <BsCheckAll
                                        style={{ color: 'green', fontSize: 'xx-large', marginRight: '1.5rem' }}
                                    >
                                    </BsCheckAll>
                                    {/* </Col>
                                    <Col xs={10} md={8} style={{ fontSize: 'large', padding: '0' }} > */}
                                    <span style={{ fontSize: 'large' }}>Success,The Test Is Saved</span>
                                </Col >
                            </Row>
                        </Container>
                        {/* </Modal.Title> */}
                    </Modal.Header>

                </Modal>
            </div>
        )
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
    componentDidUpdate(prevProps) {
        if (this.props.test != prevProps.test) {
            this.props.setnoChange(false)
        }

        // if (prevProps.test.questions[0].question != "" &&
        //     prevProps.test.questions[0].answers[0] != "" &&
        //     prevProps.test.questions[0].answers[1] != ""
        //     && this.props.test.questions != prevProps.test.questions && prevProps.test.questions[0].questionIndex != undefined
        //     || this.props.test.test_name != prevProps.test.test_name && prevProps.test.test_name != ""
        //     || this.props.test.description != prevProps.test.description && prevProps.test.description != ""
        // ) {
        //     console.log(this.props.test.questions, prevProps.test.questions)
        //     console.log("set confirmExit to true")
        //     this.setState({ confirmExit: true })
        // }


        if (this.props.test != prevProps.test)
            this.props.checkIfDone()


        if (this.props.sendMailflag == true) {
            this.props.setSendMail(false, "from add");
            this.props.history.push((`/${this.props.userName}/`))
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            //window.location = `/${this.props.userName}/`;
        }

        if (!this.props.isFinishTest && !this.props.testListInfo && this.state.isOn && this.props.numStep == "3") {
            // window.location = `/${this.props.userName}/`;
            this.props.history.push((`/${this.props.userName}/`))
            this.props.setNumStep("1")
        }

        if (this.props.toSubmitTest === true)
            this.onSubmit(this.props.eInfoTestSubmit);

        if (this.props.backArrow && this.props.savedStatus && !this.props.isFinishTest) {
            this.props.history.push((`/${this.props.userName}/`))
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            //window.location = `/${this.props.userName}/`;
            // window.history.back()
            // this.props.setNumStep(1)
        }

        if (this.props.test.color != prevProps.test.color) {
            document.getElementById('body').style.setProperty('--colorStyle',
                this.props.test.color
            )
        }

    }

    async onSubmit(e) {
        // if (!this.props.hasChangedTest) {
        if (this.props.test.id) {
            if (!this.props.withoutEOnSave) {
                e.preventDefault();
                this.props.setWithoutEOnSave(false)
            }

            if (this.props.saveWithPopUp)
                this.props.setIsFinishTest(true)
            this.props.updatedStatus(false)
            if (this.props.numStep === "3" && this.props.pressFinishBtn) {
                // this.props.setTestInfo(false)
                // this.props.backToTestList(true)
                this.props.setPressFinishBtn(false)
            }
            this.props.setTestListInfo(true)
            this.props.setToSubmitTest(false)

            //this.setState({ isOn: true })

            this.props.checkIfDone()
            if (this.props.done)
                this.props.setStatus('completed');
            else
                this.props.setStatus('inprogress');


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

            // if (this.props.test.questions[0].correctAnswer == 0)
            //     await this.props.setCorrectAnswer(1)
            const UpdatedTest = {
                questions: this.props.test.questions ? this.props.test.questions : null,
                test_name: this.props.test.test_name ? this.props.test.test_name : `${this.props.test.kind} draft 00`,
                // duration: this.props.test.duration ? this.props.test.duration : null,
                time_days: this.props.test.time_days ? this.props.test.time_days : 0,
                time_hours: this.props.test.time_hours ? this.props.test.time_hours : 0,
                time_minutes: this.props.test.time_minutes ? this.props.test.time_minutes : 0,
                openTest: this.props.test.openTest,
                description: this.props.test.description ? this.props.test.description : null,
                backgroundImage: this.props.backgroundImage ? this.props.backgroundImage : null,
                targetAudience: this.props.test.targetAudience ? this.props.test.targetAudience : null,
                kind: this.props.test.kind,
                status: this.props.done ? "completed" : "inprogress",
                color: this.props.test.color,
                displayVideo: this.props.test.displayVideo,
                video: this.props.test.video,
            }
            console.log(UpdatedTest)

            //in crud
            this.props.updateTest(this.props.match.params.id, UpdatedTest)
        }
        //this.props.setHasChangedTest(false)
        // }

        //in crud

        // this.props.sendMail(this.props.test.sendTo_email)
        // this.props.addTestToStudent(this.props.test, this.props.test.sendTo_email.list)

    }

    checkValidation = (email) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            alert("please enter valid email")
        }
    }

    addContactEmail = (e) => {
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
    borderviewscroll = () => {
        document.getElementsByClassName(' test_list_title_tests')[0].scrollIntoView({ block: 'start', behavior: "smooth" });

    }
    render() {
        this.props.setTestListInfo(false)
        this.props.updatedStatus(true)
        return (
            < form id="test_form" onSubmit={this.onSubmit}>

                {this.modalPDF()}

                <div className={this.props.numStep != "3" ? " test_list_title_tests" : " test_list_title_tests test_list_title_tests3"}

                    onClick={() => this.borderviewscroll()}
                    style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
                    {/* <div className="absul-div-pargament"> */}
                    {this.props.numStep != "3" ?
                        <>
                            <div className="span-div-quest" style={{ zIndex: "5" }}>
                                {/* <span>  {this.props.test.date}</span> */}
                                <br />
                                <span>
                                    {this.props.test.questions.length} Questions</span>
                                {(this.props.test.kind == "quiz" || this.props.test.kind == "position") && <div>



                                    {/* <input className="no-spinner" type="number"
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
                                    <Switch className=" switchTimer switch-border"
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
                                        // style={{ transform: [{ scaleX:  moderateScale(1, 0.2) }, { scaleY:  
                                        //     moderateScale(1, 0.2) }] }}
                                        offColor={'#888'}
                                        onColor={'#888'}
                                    />
                                </div>
                            </div>

                            {<div className="wrapper-test-name">
                                <p style={{
                                    marginBottom: '0',
                                    textAlign: 'end',
                                    paddingRight: '1%',
                                    // fontSize: '10px',
                                    position: "absolute",
                                    marginLeft: "90%",
                                    marginTop: "2%",
                                    fontSize: '1.3vw',
                                    fontFamily: 'fangsong'
                                }}>  {this.props.test.date}</p>
                                <div className={this.state.textCatch ? "textCatch" : ''}>
                                    <TextareaAutosize aria-label="empty textarea"
                                        placeholder={
                                            `The name of the ${this.props.test.kind}`}
                                        className="test-name test-name-area mb-0 mt-2"
                                        onClick={() => {
                                            this.setState({ textCatch: !this.state.textCatch })
                                        }}
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
                                            document.getElementsByClassName('test-name-area')[0].style.setProperty("fontSize", "1vw")
                                        }}

                                    /></div>
                                {/* <span className="tooltip-border-1">
                                    {this.props.test.kind == "quiz" ? "test name" : "survey name"}
                                </span> */}

                            </div>}
                            {/* <input className="test-name mb-0" type="text" placeholder="The name of the test"

                                onChange={(e) => this.props.setTestName(e.target.value)}
                                value={this.props.test.test_name}
                                style={{ width: "98%" }}
                                maxLength={70}
                            />
                            <input className="test-description mb-2" type="text" placeholder="Test Description"
                                onChange={(e) => this.props.setDescription(e.target.value)}
                                value={this.props.test.description}
                                style={{ width: "98%" }}yy
                                maxLength={70}
                            /> */}

                            {
                                <div className="wrapper-test-description">
                                    <TextareaAutosize aria-label="empty textarea"
                                        placeholder={
                                            this.props.test.kind == "quiz" ?
                                                "Test Description" :
                                                this.props.test.kind == "survey" ?
                                                    "Survey Description" :
                                                    "Position Description"
                                        }
                                        className="area-test-description mb-2"
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
                            }

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
                        </>
                        :
                        <div className="savesendtitle">Save and send</div>
                    }
                    {/* </div> */}
                </div>
                {
                    this.props.numStep != "3" ?
                        <div className="wrapper"

                        >
                            <div className="question-wrapper mt-2 mb-2">
                                {this.showQuestions()}
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
                                                        onClick={async (e) => {
                                                            email == "All" && await this.props.setAllSelected(true)
                                                        }}>
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
                                                };
                                            })}
                                        />

                                        {/* <div> <HiOutlineSearch id="icon" className="search-icon" style={{ marginTop: "1%", marginLeft: "5%" }} /></div> */}

                                        {/* <div className="bottom-div-menu" style={{ marginTop: "37vh", marginLeft: "6vh" }}>
                                            {this.props.checkedMails ? this.props.checkedMails.map(x =>
                                                (JSON.parse(x.value))[0] + ', ') : ""}
                                        </div> */}

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
                                    {/* <div style={{ width: "40%", height: "3.8vh", backgroundColor: "inherit" }}>
                                        <button style={{ width: "100%", borderRadius: "3px", height: "inherit", backgroundColor: "inherit", border: "solid #3D4853 1px" }}>Cancel</button>
                                    </div> */}
                                    <div style={{ width: "40%", height: "3.8vh", marginLeft: "5%" }}>
                                        <button style={{ width: "100%", borderRadius: "3px", height: "inherit", backgroundColor: "#3D4853", border: "solid #3D4853 1px", color: "white" }}
                                            onClick={(e) => {
                                                this.props.test.sendTo_email.list.length > 0 ?
                                                    this.props.setCheckIfSend(true) && this.props.setPressFinishBtn(true) && this.setState({ successSend: true }) && e.preventDefault() : this.props.setListCheckedEmpty(true) && e.preventDefault()
                                            }}
                                        >Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                {this.props.isFinishTest && this.popUpSaveTest()}
                {this.props.newContact && this.popUpAddContact()}
                {this.props.numStep == "3" && this.props.listCheckedEmpty && this.emptyList()}
                {this.props.numStep == "3" && this.state.successSend && this.modalSuccessSend()}

            </form >
            // <form id="test_form" onSubmit={this.onSubmit}>

            //     <div className="d-flex flex-row" style={{ justifyContent: "space-between", padding: "10px", paddingTop: "30px", paddingLeft: "0px" }}>

            //         <span id="span" className="input-group tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
            //             <AutosizeInput
            //                 value={this.props.test.test_name == " " ? "Type Test Name" : this.props.test.test_name}
            //                 inputStyle={{ border: "none", minWidth: "350px" }}
            //                 onChange={(e) => this.props.setTestName(e.target.value)}
            //                 placeholder="Type Test Name"
            //                 required />

            //             <span class="tooltiptext">Test Name</span>
            //         </span>

            //         <span className="d-flex flex-row " >
            //             <span id="span" className="d-flex row tooltip2" style={{ width: "50%", marginRight: "10px", height: "38px", alignItems: "center" }}>
            //                 <AiFillClockCircle id="icon" style={{}} />
            //                 <input
            //                     className="input_style"
            //                     type="number"
            //                     onChange={(e) => this.props.setDuration(e.target.value)}
            //                     value={this.props.test.duration == " " ? "Test Time" : this.props.test.duration}
            //                     style={{ width: "50%" }}
            //                     required
            //                 />
            //                 <span class="tooltiptext">Test Time</span>
            //             </span>

            //         </span>
            //     </div>

            //     <div id="span" className="input-group mt-2 tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
            //         <AutosizeInput
            //             value={this.props.test.description == " " ? "please enter some description" : this.props.test.description}
            //             placeholder="please enter some description"
            //             inputStyle={{ border: "none", minWidth: "350px" }}
            //             onChange={(e) => this.props.setDescription(e.target.value)}
            //             required />
            //         <span class="tooltiptext">Test Description</span>
            //     </div>


            //     { this.showQuestions()}

            //     {/* <input style={onSubmitStyle} type="submit" value="submit" className="btn" /> */}

            //     {/* <div className="tooltip3" style={{ textAlign: "-webkit-right", padding: "10px" }}>
            //         <button style={btnStyle} className="btn rounded-circle" onClick={(e) => this.props.addQuestion(e)}>
            //             <p style={{ lineHeight: 1.3 }}>+</p>
            //         </button>
            //         <span class="tooltiptext">Add Question</span>
            //     </div> */}
            // </form >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTest)