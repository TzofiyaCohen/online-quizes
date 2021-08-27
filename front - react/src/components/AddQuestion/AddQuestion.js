import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import AddMultiQuestion from "../AddMultiQuestion/AddMultiQuestion"
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import { RiFileCopyLine } from 'react-icons/ri';
import { BsTrash, BsImage } from 'react-icons/bs'
import "./addQuestion.css";
import 'react-dropdown/style.css';
import { Modal, Button, Image ,Container,Row,Col} from "react-bootstrap";
import Switch from "react-switch";
import TextareaAutosize from 'react-textarea-autosize';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import loaderupload from '../../assets/image-loader.gif'
import $ from "jquery";
import Draggable from 'react-draggable';
// import HelpBlock from 'react-bootstrap/HelpBlock';

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        idQuestConfig: state.funnelReducer.idQuestConfig,
        collapses: state.funnelReducer.collapses,
        userName: state.funnelReducer.userName,
        jwt: state.funnelReducer.jwt,
        loadedAjax1: state.funnelReducer.loadedAjax1,
        loadedAjax2: state.funnelReducer.loadedAjax2,
        // isProgressBarImage: state.funnelReducer.isProgressBarImage,
        allDivsGrey: state.funnelReducer.allDivsGrey,
        loaderUpload: state.funnelReducer.loaderUpload,
        loaderUploadImg: state.funnelReducer.loaderUploadImg,
        questionItem: state.testReducer.questionItem,
        isClickPlus: state.testReducer.isClickPlus,
    };
}
const mapDispatchToProps = (dispatch) => ({
    deleteQuestion: (event, questionIndex) => dispatch(actions.deleteQuestion({ event, questionIndex })),
    handleAnswers: (index, type, value) => dispatch(actions.handleAnswers({ index, type, value })),
    addMultiAnswer: (event, questionIndex) => dispatch(actions.addMultiAnswer({ event, questionIndex })),
    setOpenQuestion: (questionIndex, openQuestion) => dispatch(actions.setOpenQuestion({ questionIndex, openQuestion })),
    addQuestion: (event) => dispatch(actions.addQuestion(event)),
    copyQuestion: (event, questionIndex) => dispatch(actions.copyQuestion({ event, questionIndex })),
    addCloseQuestion: (event) => dispatch(actions.addCloseQuestion(event)),
    setIdQuestConfig: (value) => dispatch(actions.setIdQuestConfig(value)),
    setMandatoryQuestion: (i, type) => dispatch(actions.setMandatoryQuestion({ i, type })),
    inputImageQuestion: (index, value) => dispatch(actions.inputImageQuestion({ index, value })),
    uploudFile: (file, type, index) => dispatch(actions.uploudFile({ file, type, index })),
    setQuestionItem: (val) => dispatch(actions.setQuestionItem(val)),
    setCollapes: (val) => dispatch(actions.setCollapes(val)),
    setIsClickPlus: (val) => dispatch(actions.setIsClickPlus(val)),
    CheckEmptyLastQuestion: (val) => dispatch(actions.CheckEmptyLastQuestion(val)),
})

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //  activeDrags: 0,
            uploadFile: "",
            showPicture: false,
            showTrashImg: false,
            modalDeleteQuestion: false,
            //question: this.props.test.questions[this.props.test.questions.length - 1].question,
        }
        this.inputFile = React.createRef(null)
    }

    multiAnswers = () => {

        // https://codesandbox.io/s/8m6yjy8yj?file=/src/index.js
        const answersArray = this.props.test.questions[this.props.questionIndex].answers
        return answersArray.map((item, index) => (
            <AddMultiQuestion
                key={index}
                answerNumber={index + 1}
                questionIndex={this.props.questionIndex}
                toNotChange={this.props.toNotChange}
            />
        )
        )
    }
    addQuestionFunc = async (e, index) => {
        await this.props.addCloseQuestion(e)

        document.getElementsByClassName('div-question')[this.props.test.questions.length - 1].
            scrollIntoView({ block: 'center', behavior: "smooth" });
        this.props.setIdQuestConfig(this.props.test.questions.length - 1);
    }
    coppyQuestionFunc = async (e, index) => {
        await this.props.copyQuestion(e, this.props.questionIndex)

        // document.getElementsByClassName('border-l')[0].
        //     scrollIntoView({ block: 'center', behavior: "smooth" })

        // document.getElementsByClassName('div-question')[this.props.test.questions.length - 1].
        //     scrollIntoView({ block: 'center', behavior: "smooth" });
        // this.props.setIdQuestConfig(this.props.test.questions.length - 1);
        document.getElementsByClassName('div-question')[this.props.questionIndex + 1].
            scrollIntoView({ block: 'center', behavior: "smooth" });
        this.props.setIdQuestConfig(this.props.questionIndex + 1);

    }
    deleteQuestionFunc = async (e, index) => {
        if (this.props.test.questions.length > 1 && index != 0) {
            await document.getElementsByClassName('div-question')[index - 1].
                scrollIntoView({ block: 'center', behavior: "smooth" });
            this.props.setIdQuestConfig(index - 1);
        }
        if (index == 0) {
            this.props.setIdQuestConfig(0);
        }
        !this.props.questionItem == 0 && this.props.setQuestionItem(this.props.questionItem - 1)
        this.props.deleteQuestion(e, index)
    }

    addAnswerFunc = async (e, index) => {
        await this.props.addMultiAnswer(e, index)
        document.getElementsByClassName('div-question')[this.props.questionIndex].getElementsByClassName('ans-input')
        [document.getElementsByClassName('div-question')[this.props.questionIndex].getElementsByClassName('ans-input').length - 1].focus()
    }


    putInUploadFile = (value) => {
        this.setState({ uploadFile: value });
        // this.uploadMulti(value);
        this.props.uploudFile(value, 'image', this.props.questionIndex)
    }

    // addQuestionImgFunc = () => {
    //     this.inputFile.click();
    // }
    clearFileInput = () => {
        this.inputFile.current.value = null;
    }

    IsLastquestionEmpty = (index) => {
        index = this.props.test.questions.length - 1;
        let empty = false;
        if (this.props.test.questions[index].question == '') {
            this.props.setIsClickPlus(true);
            return false;
        }

        this.props.test.questions[index].answers.map((answer) => {
            if (answer.answer == '') {
                this.props.setIsClickPlus(true);
                empty = true
            }
        })
        if (empty)
            return false
        if (!empty)
            this.props.setIsClickPlus(false);
        return true
    }

    ifDeleteQues = () => {
        return (

            <Modal className="popUpAnswerTest" id='popUpAlertId' show={this.state.modalDeleteQuestion} style={{ left: "60%", top: "30%" }}>
                <Modal.Header closeButton style={{ zIndex: "999" }} onClick={(e) => { this.setState({ modalDeleteQuestion: false }) }}>

                </Modal.Header>

                <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                    <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '6vh', fontSize: '1.2rem' }}>
                        Are you sure that you want to delete this question?</h1>
                    <Button variant="secondary" style={{ marginRight: "10%", width: "30%" }}
                        onClick={(e) => { this.setState({ modalDeleteQuestion: false }) }}>
                        no
                    </Button>
                    <Button variant="info" style={{ width: "30%" }}
                        onClick={(e) => { this.deleteQuestionFunc(e, this.props.questionIndex); this.setState({ modalDeleteQuestion: false }) }}>
                        yes
                    </Button>
                </Modal.Body >
            </Modal>)
    }


    render() {
        const open = "false";
        // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (

            <div style={{ Draggable: "true" }}
                className={this.props.idQuestConfig == this.props.questionIndex ?
                    "div-question my-4 border-l" : "div-question my-4"}
            >
                <div className="inner-question pt-1" >
                    <div className="in-quest-click" style={{marginTop:"2vh"}} onClick={async () => {
                        await this.props.setIdQuestConfig(this.props.questionIndex);
                        // setTimeout(() => {
                        document.getElementsByClassName('div-question')[this.props.questionIndex].
                            scrollIntoView({ block: "start", behavior: "smooth" })
                        // }, 1);
                    }}>
                        <span className="require-quest" style={{
                            left: '20px',
                            color: 'red',
                            top: '4%',
                            display: !this.props.test.questions[this.props.questionIndex].mandatoryQuestion ? 'none' : true
                        }}>* </span>
                        <span className="num-quest">{this.props.questionIndex + 1}. </span>
                        <TextareaAutosize aria-label="empty textarea" placeholder="Empty "
                            className={!this.props.toNotChange ? "title_span" : "title_span2"}
                            name="question"
                            disabled={this.props.toNotChange}
                            placeholder={Number(this.props.questionIndex + 1) == 1 ? "How are you today?" :
                                'Question number ' + Number(this.props.questionIndex + 1)
                            }
                            value={this.props.test.questions[this.props.questionIndex].question}
                            onChange={(e) => {
                                this.props.handleAnswers(this.props.questionIndex, 'question', e.target.value)
                                this.setState({ question: e.target.value });
                                //this.props.setIsClickPlus(false);
                                if (e.target.value < 1)
                                    this.props.CheckEmptyLastQuestion();
                                !this.props.collapses.includes(1) && this.props.setCollapes(1);

                                this.props.setQuestionItem(this.props.questionIndex)
                            }
                            }
                            // required
                            aria-setsize="false"
                        />
                        {this.props.test.questions[this.props.test.questions.length - 1].question == '' &&
                            this.props.isClickPlus &&
                            this.props.questionIndex == this.props.test.questions.length - 1 &&
                            <p style={{ color: 'red' }} className="err-msg">
                                Please fill in the question
                            </p>}
                        {/* <input type="file" accept="image/*,.pdf">
                            <FiUpload/>
                        </input> */}
                        <label style={{ visibility: "hidden", marginBottom: '0', display: 'table-column' }} className="custom-file-uplod">
                            {/* <input type="file" style={{display:"none"}} /> */}
                            <input type="file" style={{ visibility: "hidden" }}
                                ref={this.inputFile}
                                onClick={this.clearFileInput}
                                onChange={(e) => {
                                    this.setState({ showPicture: false })
                                    this.putInUploadFile(e.target.files);
                                    this.props.setQuestionItem(this.props.questionIndex)
                                    !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                }}
                                accept="image/*"

                            />
                            {/* {<label style={{ marginRight: '1em' }}>Upload Picture</label>} */}
                            {/* <FiUpload style={{ width: "2.2%" }} id="icon" className="icon-up-load" ></FiUpload> */}
                        </label>
                        <label>
                            {this.props.loaderUpload && this.props.loaderUploadImg.type == 'quest' &&
                                this.props.loaderUploadImg.index == this.props.questionIndex &&
                                <img src={loaderupload} alt="loading..." style={{ color: "white", width: '6vh', borderRadius: '190px', marginLeft: '6em' }} />

                            }
                            {(this.props.test.questions[this.props.questionIndex].image) &&
                                <div
                                    onMouseEnter={() => this.setState({ showTrashImg: true })}
                                    onMouseLeave={() => this.setState({ showTrashImg: false })}
                                >
                                    {/* <div style={{ position: 'absolute' ,width:'30vh'}} className='image-question divImg pointer'
                                        onClick={() => {
                                            this.setState({ showPicture: true })
                                        }}
                                    > */}
                                        {this.state.showTrashImg && <BsTrash id="icon" className="iconTrash pointer"
                                            onClick={(e) => {
                                                this.setState({ showPicture: false })
                                                this.props.inputImageQuestion(this.props.questionIndex, '');
                                                // this.props.setQuestionItem(this.props.questionIndex);
                                                !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                            }} />}
                                    {/* </div> */}
                                    <Image resizeMode='contain' id='imgQuest' className="image-question pointer imghover"

                                        onClick={() => {
                                            this.setState({ showPicture: true })
                                        }}

                                        src={this.props.test.questions[this.props.questionIndex].image} />

                                </div>
                            }
                        </label>
                        {/* {this.props.test.questions[this.props.questionIndex].isProgressBarImage && <ProgressBar
                            className='progressBarVideo'
                            variant="success"
                            active="true"
                            animated
                            now={this.props.loadedAjax1 + this.props.loadedAjax2}
                            label={`${Math.round(this.props.loadedAjax1) +
                                Math.round(this.props.loadedAjax2)
                                }%`}
                        />} */}
                        {/* <input className="title_span"
                            autoComplete="off"
                            name="question"
                            type="text"
                            placeholder={'Question number ' + Number(this.props.questionIndex + 1)}
                            value={this.props.test.questions[this.props.questionIndex].question}
                            onChange={(e) => this.props.handleAnswers(this.props.questionIndex, 'question', e.target.value)}
                            required
                        >
                        </input> */}
                        {(this.props.test.questions[this.props.questionIndex].image) && <br />}
                        {/* <input className="description_span title_span"
                            autoComplete="off"
                            name="description"
                            type="text"
                            placeholder={'Question description '}
                            value={this.props.test.questions[this.props.questionIndex].questionDescription}
                            onChange={(e) => this.props.handleAnswers(this.props.questionIndex, 'questionDescription', e.target.value)}
                            required
                        >
                        </input> */}
                        {/* <span className="description_span">Description of the question</span> */}
                        {/* <div className="d-flex flex-row mt-4"> */}
                        {/* <label style={{ color: "#5A5A81", width: "30px", height: "19px", textAlign: "center", font: "normal normal bold 16px/18px Lato", padding: "7px" }}>{this.props.questionIndex + 1}</label> */}

                        {/* <div id="qa_input" className="d-flex flex-row mt-4" style={{ backgroundColor: "#EEE5FC", borderRadius: "8px", alignItems: "center", width: "95%", height: "60px", padding: "10px", justifyContent: "space-between" }}>
                        <input
                            name="question"
                            type="text"
                            placeholder="Your Question"
                            value={this.props.test.questions[this.props.questionIndex].question}
                            className="form-control"
                            onChange={(e) => this.props.handleAnswers(this.props.questionIndex, 'question', e.target.value)}
                            required />
                    </div> */}

                        {/* </div> */}
                        <div className="ans-div mt-2" >
                            {this.multiAnswers()}
                        </div>

                        {/* {
                        this.props.test.questions[this.props.questionIndex].openQuestion ? null :
                            <div id="qa_input" style={{ backgroundColor: "#E5FBFC", alignItems: "baseline", padding: "15px", borderRadius: "8px" }}>
                                <button id="addQuestion" className="d-felx row ml-2 w-100"
                                    onClick={(e) => this.props.addMultiAnswer(e, this.props.questionIndex)}>
                                    <p style={{ lineHeight: 1.3 }}>Add Option</p>
                                </button>
                            </div>
                    } */}
                        {
                            // this.props.test.questions[this.props.questionIndex].openQuestion ? null :
                            //     <div id="qa_input" style={{ backgroundColor: "#E5FBFC", alignItems: "baseline", padding: "15px", borderRadius: "8px" }}>
                            //         <button id="addQuestion" className="d-felx row ml-2 w-100"
                            //             onClick={(e) => this.props.addMultiAnswer(e, this.props.questionIndex)}>
                            //             <p style={{ lineHeight: 1.3 }}>Add Option</p>
                            //         </button>
                            //     </div>
                            this.props.test.questions[this.props.questionIndex].openQuestion ? null :
                                !this.props.toNotChange && <div className="add-answer-card my-2">
                                    <p className="plus-p in-card-ans">+ </p>
                                    <button id="addQuestion" className="in-card-ans"
                                        onClick={(e) => {
                                            this.addAnswerFunc(e, this.props.questionIndex);
                                            this.props.setQuestionItem(this.props.questionIndex);
                                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                        }
                                        }>
                                        <p>Add an answer</p>
                                    </button>

                                </div>
                        }

                        {/* <div className="select-div">

                            <Dropdown
                                options={[1, 2, 3, 4]}
                                placeholder="The correct answer"
                                headerTitle="nnn"
                            />
                           
                        </div> */}
                    </div>
                </div>


                {/* </div> */}
                {
                    !this.props.toNotChange &&
                    <div className=" d-felx row" style={{ alignItems: "baseline" }}
                        className="bottom-quest py-2 input-group d-flex">
                        <div className="d-flex">
                            <div className="wrap-tooltip1">
                                <BsImage id="icon" className="mr-2" onClick={(e) => {
                                    // this.addQuestionImgFunc();
                                    this.inputFile.current.click();
                                    // $('#myInput').click();
                                    !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                }
                                } />
                                <p className="tooltip-text-area">Add Image</p>
                            </div>
                            <div className="wrap-tooltip1">
                                <BsTrash id="icon" className="mr-2" onClick={(e) => {
                                    // this.deleteQuestionFunc(e, this.props.questionIndex);
                                    this.setState({ modalDeleteQuestion: true });
                                    !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                }
                                    // this.props.deleteQuestion(e, this.props.questionIndex)


                                } />
                                <p className="tooltip-text-area">Delete Question</p>
                            </div>
                            <div className="wrap-tooltip1">
                                <RiFileCopyLine id="icon" className="mr-2"
                                    onClick={(e) => {
                                        this.coppyQuestionFunc(e, this.props.questionIndex);
                                        this.props.setQuestionItem(this.props.questionIndex + 1)
                                        !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                    }} />
                                <p className="tooltip-text-area">Copy Question</p>
                            </div>
                            {!this.props.toNotChange &&
                                <div className="obligatoire ml-3">

                                    <span>required</span>
                                    <Switch className="mx-2 switch"
                                        // defaultValue={true}
                                        checked={this.props.test.questions[this.props.questionIndex].mandatoryQuestion}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        offHandleColor="#FFFFFF"
                                        onHandleColor="#56D4DE"
                                        // onHandleColor={"rgb(" + this.props.test.color + ")"}
                                        // onHandleColor={this.props.test.color}
                                        height={18}
                                        width={36}
                                        onChange={() => {
                                            console.log("color: " + this.props.test.color);
                                            this.props.setMandatoryQuestion(this.props.questionIndex, this.props.test.questions[this.props.questionIndex].mandatoryQuestion);
                                            this.props.setQuestionItem(this.props.questionIndex);
                                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                        }}
                                    ></Switch>

                                </div>
                            }
                        </div>

                    </div>
                }
                {
                    !this.props.toNotChange &&
                    <div className="wrap-tooltip">
                        <div className="btn-add" onClick={(e) => {
                            // this.IsLastquestionEmpty(this.props.questionIndex) &&
                            this.addQuestionFunc(e, this.props.questionIndex);
                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                        }}>+</div>
                        <p className="tooltip1">add question</p>
                    </div>
                }
                {!this.props.toNotChange && <div className="btn-add2"> </div>}
                {(this.props.test.questions[this.props.questionIndex].image) && this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].image}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>}
                {this.state.modalDeleteQuestion && this.ifDeleteQues()}
            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)