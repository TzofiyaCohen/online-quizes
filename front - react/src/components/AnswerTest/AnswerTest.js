import React from "react"
import AnswerQuestion from "../AnswerQuestion/AnswerQuestion"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import "./answerTest.css"
import 'reactjs-popup/dist/index.css';
import { Modal, Button } from "react-bootstrap";
import { FaUserTie, FaUserSecret } from "react-icons/fa"
import { AiOutlineClockCircle } from "react-icons/ai"
import { GiWireframeGlobe } from "react-icons/gi"
import TextareaAutosize from 'react-textarea-autosize';
import ReactPlayer from 'react-player'
import { FiUpload } from 'react-icons/fi';
import Switch from "react-switch";





function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student,
        teacher: state.teacherReducer.teacher,
        backgroundImage: state.testReducer.test.backgroundImage,
        modalAnswerTest: state.funnelReducer.modalAnswerTest,
        finishAnswerTest: state.funnelReducer.finishAnswerTest,
        // testStudent:state.studentReducer.test,
        setArrayMQ: state.studentReducer.student.test.setArrayMQ,
        // email: state.testReducer.test.sendTo_email.list
        studentFinish: state.studentReducer.student.studentFinish
    };
}

const mapDispatchToProps = (dispatch) => ({
    calculateGrade: () => dispatch(actions.calculateGrade()),
    updateTestsToCheck: (email, name) => dispatch(actions.updateTestsToCheck({ email, name })),
    setAnswerTestInfo: (value) => dispatch(actions.setAnswerTestInfo(value)),
    getTest: (testID) => dispatch(actions.getTest(testID)),
    setModaAnswerTest: () => dispatch(actions.setModaAnswerTest()),
    startTest: () => dispatch(actions.startTest()),
    detectedCheating: () => dispatch(actions.detectedCheating()),
    saveAnonymousDetails: () => dispatch(actions.saveAnonymousDetails()),
    createContact: () => dispatch(actions.createContact()),
    setfinishAnswerTest: (value) => dispatch(actions.setfinishAnswerTest(value)),
    setArrayMQ: (arr) => dispatch(actions.setArrayMQ(arr)),
    createContactWithoutCheckPermissin: (email) => dispatch(actions.createContactWithoutCheckPermissin(email)),
    setAllDivsGrey: (value) => dispatch(actions.setAllDivsGrey(value)),
    setCvFile: (file) => dispatch(actions.setCvFile(file)),
    uploudFile: (file, type, index) => dispatch(actions.uploudFile({ file, type, index })),
})

class AnswerTest extends React.Component {
    constructor() {
        super();
        this.state = {
            modalAnonymous: true,
            anonymous: false,
            leader: true,  //false if anonymous option returns
            userDetails: true,
            name: "",
            email: "",
            phone: "",
            address: "",
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        //in crud
        this.props.getTest(this.props.match.params.id)
        window.addEventListener("blur", this.onFocus)
        this.props.setAllDivsGrey(true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.student.test.questions !== prevProps.student.test.questions) {
            this.props.setArrayMQ(this.props.student.test.questions);
        }
        if (this.props.test.color !== prevProps.test.color) {
            document.getElementById('body').style.setProperty('--colorStyle',
                this.props.test.color
            )
        }
    }
    onFocus = (e) => {
        if (!this.props.test.openTest) //if use in the net is forbidden 
        {
            // window.close()
            // this.onSubmit(e)
            this.props.detectedCheating()
        }
    }

    popUpfinishAnswerTest = () => {
        return (

            <Modal className="popUpAnswerTest" id='popUpAlertId' show={true} style={{ left: "60%", top: "30%" }}>
                <Modal.Header closeButton style={{ zIndex: "999" }} onClick={(e) => { this.props.setfinishAnswerTest(false) }}>

                </Modal.Header>

                <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                    <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '6vh', fontSize: '1.2rem' }}>
                        Are you sure that you want to finish?</h1>
                    <Button variant="secondary" style={{ marginRight: "10%", width: "30%" }}
                        onClick={(e) => { this.props.setfinishAnswerTest(false) }}>
                        no
                    </Button>
                    <Button variant="info" style={{ width: "30%" }}
                        onClick={(e) => { this.borderviewscroll(); this.props.setfinishAnswerTest(false); this.onSubmit(e) }}>
                        yes
                    </Button>
                </Modal.Body >
            </Modal>)
    }


    onSubmit(e) {
        e.preventDefault();
        //show correct data in configurator

        this.props.setAnswerTestInfo(false)
        //calculate the grade
        this.props.calculateGrade()
        // if (this.props.match.params.email) this.props.updateTestsToCheck(this.props.match.params.email) //add the quiz to student and inform him with the grade
        this.props.updateTestsToCheck(this.state.email, this.state.name) //add the quiz to student and inform him with the grade
    }

    modalAnonymous = () => {
        return (
            <Modal id="anonymousHeader" show={this.state.modalAnonymous} >
                <Modal.Header className="anonymousHeader"
                    style={{ backgroundImage: `url(${this.props.backgroundImage})` }}
                >
                    {/* closeButton onClick={() => this.setState({ modalAnonymous: false })}> */}
                    <Modal.Title style={{ width: "100%" }}>
                        <p className="modal-test-title">
                            {this.props.test.test_name}
                        </p>
                        {/* 
                        <p className="modal-teacher-title">
                            teacher name
                    </p> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-5">
                    <p className="body-p-modal mt-2">How would you like to connect?</p>
                    <div className="row choose-connect justify-content-between ">
                        <button className=" col col-12 col-sm-5 mt-3"
                            onClick={(e) => { this.setState({ modalAnonymous: false, anonymous: false, leader: true }) }}>
                            <div >
                                <FaUserTie id="icon" />
                                <p className=" mb-1 mt-2"> Leader's User</p>
                            </div>
                        </button>
                        <button className="col col-12 col-sm-5 mt-3"
                            onClick={(e) => {
                                this.props.saveAnonymousDetails();
                                this.setState({ modalAnonymous: false, anonymous: true, leader: false, email: 'anonymous@gmail.com' });
                                this.props.createContactWithoutCheckPermissin('anonymous@gmail.com')
                            }}>
                            <div>
                                <FaUserSecret id="icon" />
                                <p className=" mb-1 mt-2">Anonymous</p>
                            </div>
                        </button>
                    </div>
                </Modal.Body>

            </Modal >)
    }


    checkContinue = () => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        console.log(this.state.userDetails)
        console.log(pattern.test(this.state.email), " email")

        if (!pattern.test(this.state.email))
            return false
        // if (this.state.eamil != "" && this.state.name != "")
        //     return true
        else
            return true
    }
    putInUploadFile = (file) => {
        this.props.uploudFile(file, 'cv');
    }

    modalUserDetails = () => {
        return (
            <Modal show={this.state.userDetails} className="modal-user"  >
                <Modal.Header style={{ marginLeft: '2.5rem' }}>
                    <p className="body-p-modal mt-2">Please Entar Details</p>
                </Modal.Header>
                <Modal.Body className="mt-5 modalBodyDeteils">
                    <div className="d-flex-col col">
                        <label className="row" style={{ marginTop: "7%", marginLeft: "1%" }}>* email:</label>
                        <input type="email" required className="input-sort"
                            onChange={(e) => { this.setState({ email: e.target.value }); console.log(this.state.email) }} />
                    </div>
                    <div className="d-flex-col col">
                        <label className="row" style={{ marginLeft: "1%" }}>name:</label>
                        <input type="text" className="input-sort"
                            onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </div>
                    <div className="d-flex-col col">
                        <label className="row" style={{ marginLeft: "1%" }}>phone:</label>
                        <input type="text" className="input-sort"
                            onChange={(e) => { this.setState({ phone: e.target.value }) }} />
                    </div>
                    <div className="d-flex-col col">
                        <label className="row" style={{ marginLeft: "1%" }}>address:</label>
                        <input type="text" className="input-sort"
                            onChange={(e) => { this.setState({ address: e.target.value }) }} />
                    </div>
                    <br />
                    {this.props.test.kind == "position" &&
                        <div>
                            <label className="custom-file-uplod">
                                {/* <input type="file" style={{display:"none"}} /> */}
                                <input type="file" style={{ display: "none" }}
                                    onChange={(e) => {
                                        this.putInUploadFile(e.target.files);
                                    }}
                                    accept=".pdf"
                                />
                                {/* {(this.props.test.questions[this.props.questionIndex].image) && */}
                                <p style={{ textAlign: 'center', marginBottom: '0%', marginLeft: '1em' }}>Upload Cv File</p>
                                {/* <iframe style={{ marginLeft: '3rem' }} className="image-question" src={this.props.student.test.cvFile} /> */}
                                <FiUpload id="icon" className="iconUpload icon-up-load" />
                            </label>
                        </div>}
                    <div className="row choose-connect justify-content-between ">
                        <Button style={{ marginTop: '0' }} variant="primary" className="btn-start-color"
                            onClick={(e) => {
                                if (this.checkContinue()) {
                                    this.props.setAllDivsGrey(false);
                                    this.props.createContactWithoutCheckPermissin(this.state.email)
                                    this.setState({ userDetails: false })
                                }
                                else
                                    alert("please enter valid email")
                            }}>
                            Enter
                        </Button>
                    </div>
                </Modal.Body>
            </Modal >
        )
    }

    modalTestInstructions = () => {
        return (
            <div style={{ width: "100%", height: "100%", background: "grey" }}>
                <Modal className='modal-fullscreen'
                    dialogClassName='modalInstraction'
                    show={this.props.modalAnswerTest}
                >

                    <Modal.Header className="ansTestInstraction" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}
                    // closeButton onClick={() => this.props.setModaAnswerTest()}
                    >
                        <Modal.Title className="instructions-title" >
                            <div className="instructions-title-div">
                                Test instructions
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="instructions-div-body mt-5">
                            <ul >
                                <li className="my-4 row">
                                    {/* <BsAlarm id="icon" /> */}
                                    <AiOutlineClockCircle id="icon" className="col-2" />
                                    <div className="col-9" style={{ color: "black" }}>
                                        {this.props.test.timer / 60 == 0 ?
                                            <p>Test time - unlimited</p> :
                                            <p>Test time - {this.props.test.timer / 60} minutes</p>}

                                        <br />
                                        <p>After this time the test will close automatically
                                            and you will not be able to return to it
                                        </p>
                                    </div>

                                </li>
                                {!this.props.test.openTest &&
                                    <li className="my-4 row">
                                        <GiWireframeGlobe id="icon" className="col-2" />
                                        <div className="col-9">
                                            <p>Test without internet</p>
                                            <br />
                                            <p>Do not open the Internet during the test,
                                                a tab you open will  notify the examiners</p>
                                        </div>
                                    </li>
                                }

                            </ul>
                            {/* btn-start */}
                            <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '20vh' }}>
                                <Button className="my-4" variant='info' onClick={(e) => { this.props.setModaAnswerTest(); this.props.startTest() }}>
                                    Continue to the test
                                </Button>
                            </Modal.Footer>
                        </div>


                        {/* <p>The test contains {this.props.test.questions.length} questions</p>
                    {!this.props.test.openTest && <p>Please note that internet use is not allowed during the test.</p>}
                    {!this.props.test.openTest && <p>If you enter the Internet, the system will notify the examiners.</p>}
                    <p>Good Luck!</p>
                    <Button variant="secondary" onClick={(e) => { this.props.setModaAnswerTest(); this.props.startTest() }}>
                        Start
        </Button> */}
                    </Modal.Body>
                </Modal>
            </div>)
    }

    borderviewscroll = () => {
        document.getElementsByClassName('test_list_title_tests')[0].scrollIntoView({ block: 'start', behavior: "smooth" });

    }


    render() {

        this.props.setAnswerTestInfo(true)

        return (
            <>
                {this.state.leader && this.state.userDetails && this.modalUserDetails()}
                <div
                    className={this.state.leader && this.state.userDetails ? "grey answerTest" : "answerTest"}>

                    {/* {this.modalAnonymous()} */}

                    {/* if anonymous - start and save user details. 
                 if leader - ask for email and create contact */}

                    {/* {this.state.leader && this.state.userDetails && this.modalUserDetails()} */}

                    {(this.state.anonymous || (this.state.leader && !this.state.userDetails)) && this.modalTestInstructions()}

                    <div className="test_list_title_tests"
                        onClick={() => this.borderviewscroll()}
                        style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
                        {this.state.leader && this.state.userDetails ? '' :
                            <span className="span-num-quest ml-2">
                                {this.props.test.questions.length} Questions
                            </span>}
                        {this.state.leader && this.state.userDetails ? '' : <span className='toggleStudent'>
                            <span style={{ paddingRight: '0.3rem' }} className="m-0">Internet blocking</span>
                            <Switch className=" switchTimer switch-border"
                                checked={!(this.props.test.openTest)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={13}
                                width={31}
                                offColor={'#888'}
                                onColor={'#080'}
                                disabled
                            />
                        </span>}
                        <div className="wrapper-test-name" >

                            <TextareaAutosize aria-label="empty textarea"
                                disabled={true}

                                className="test-name test-name-area mb-0 mt-2"
                                value={this.props.test.test_name}

                                aria-setsize="false"
                                style={{ fontSize: "2.4vw" }}
                                data-gramm_editor="false"
                                maxRows={2}
                            />

                            <div className="wrapper-test-description">
                                <TextareaAutosize aria-label="empty textarea"
                                    disabled={true}
                                    className="area-test-description mb-2"
                                    value={this.props.test.description}
                                    style={{ fontSize: "1.5vw" }}
                                    aria-setsize="false"
                                    data-gramm_editor="false"
                                    maxRows={2}
                                />
                            </div>
                            {this.props.test.video != '' && this.props.test.displayVideo && !this.props.studentFinish &&
                                <div style={{ width: '50%', height: '45%', marginLeft: '25%' }} className="wrapper-test-description">
                                    <ReactPlayer className='videoPlayer w-100 h-100'
                                        style={{ width: '100%', height: '100%' }}
                                        url={this.props.test.video}
                                        controls={true}
                                        muted={false}
                                        loop={true}
                                    />
                                </div>
                            }
                        </div>
                    </div>


                    <form id="answer_test_form" onSubmit={this.onSubmit}>
                        {/* first row */}
                        {/* <div className="d-flex flex-row" style={{ justifyContent: "space-between", padding: "10px", paddingTop: "30px", paddingLeft: "0px" }}> */}

                        {/* <span id="span" className="input-group tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                            <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                                {this.props.test.test_name}
                            </div>
                            <span class="tooltiptext">Test Name</span>
                        </span>

                        <span className="d-flex flex-row " >
                            <span id="span" className="d-flex row tooltip2" style={{ width: "50%", marginRight: "10px", height: "38px", alignItems: "center" }}>

                                <AiFillClockCircle id="icon" style={{}} />
                                <input
                                    className="input_style"
                                    
                                    value={this.props.test.duration}
                                    style={{ width: "50%" }}
                                />
                                <span class="tooltiptext">Test Time</span>
                            </span>

                        </span>
                    </div>

                    <div id="span" className="input-group mt-2 tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                        <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                            {this.props.test.description}
                        </div>
                        
                        <span class="tooltiptext">Test Description</span>
                    </div> */}

                        {!this.props.studentFinish ? <div className={this.state.leader && this.state.userDetails ? "displayNone question-wrapper question-wrapper-view mt-2 mb-2" : "question-wrapper question-wrapper-view mt-2 mb-2"}
                            onClick={() => {
                                document.getElementsByClassName('question-wrapper')[0].
                                    scrollIntoView({ block: 'start', behavior: "smooth" })
                            }
                            }
                        >

                            {this.props.test.questions.map((item, index) => (
                                <>
                                    <AnswerQuestion
                                        key={index}
                                        questionNumber={index + 1}
                                        questionIndex={index}
                                        question={item}
                                    />
                                </>
                            ))
                            }

                        </div>
                            :
                            <>
                                <div className="finishTest">
                                    <h3 className="p-1">Thank you for taking the {this.props.test.kind}</h3>
                                    {/* <h3 style={{ textAlign: 'center', fontSize: '2rem', color: '#3D4853', fontWeight: '700', fontFamily: 'Roboto' }}>Thanks for solving the test</h3> */}
                                    {/* <h4 style={{ textAlign: 'center', fontSize: '1.7rem', color: '#3D4853', fontFamily: 'Roboto' }}>Have a nice day</h4> */}
                                    <h4>Have a nice day</h4>
                                    {/* <a href='https://google.com'> */}
                                    {/* <Button className='btnExit' variant="secondary" style={{ marginTop: "45%" }} onClick={() => this.props.history.push('/https://google.com')}> */}
                                    {/* <Button className='btnExit' variant="secondary" style={{ marginTop: "45%" }}> */}
                                    {/* <a href={`https://quiz.leader.codes/`}></a> */}
                                    {/* Exit
                             </Button>
                                 </a> */}
                                </div>
                            </>}‏
                    </form>
                    {this.props.finishAnswerTest && this.popUpfinishAnswerTest()}

                </div>
            </>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AnswerTest)