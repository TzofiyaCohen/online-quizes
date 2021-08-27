import React from "react"
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import { FaEllipsisV, FaEdit } from 'react-icons/fa';
import { RiFileCopyLine } from 'react-icons/ri';
import { BsTrash, BsImage } from 'react-icons/bs'
import { Image } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./addMultiQuestion.css"
import TextareaAutosize from 'react-textarea-autosize';
import { DragDropContext } from 'react-beautiful-dnd';
import Lightbox from "react-awesome-lightbox";
import { FiUpload } from 'react-icons/fi';
import loaderupload from '../../assets/image-loader.gif'

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        collapses: state.funnelReducer.collapses,
        isClickPlus: state.testReducer.isClickPlus,
        loaderUpload: state.funnelReducer.loaderUpload,
        loaderUploadImg: state.funnelReducer.loaderUploadImg,

    };
}

const mapDispatchToProps = (dispatch) => ({
    handleMultiAnswers: (questionIndex, answerNumber, value) => dispatch(actions.handleMultiAnswers({ questionIndex, answerNumber, value })),
    deleteAnswer: (event, questionIndex, answerIndex) => dispatch(actions.deleteMultiAnswer({ event, questionIndex, answerIndex })),
    handleAnswers: (index, type, value) => dispatch(actions.handleAnswers({ index, type, value })),
    copyAnswer: (event, questionIndex, answerIndex) => dispatch(actions.copyAnswer({ event, questionIndex, answerIndex })),
    setCollapes: (val) => dispatch(actions.setCollapes(val)),
    setQuestionItem: (val) => dispatch(actions.setQuestionItem(val)),
    setIsClickPlus: (val) => dispatch(actions.setIsClickPlus(val)),
    CheckEmptyLastQuestion: (val) => dispatch(actions.CheckEmptyLastQuestion(val)),
    uploudFile: (file, type, index, ansIndex) => dispatch(actions.uploudFile({ file, type, index, ansIndex })),
    AnswerPicture: (questIndex, ansIndex, value) => dispatch(actions.AnswerPicture({ questIndex, ansIndex, value })),
})

class AddMultiAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false,
            showPicture: false,
            showTrashImg: false,
            style: 'image-question',
            answer: this.props.test.questions[this.props.test.questions.length - 1]
                .answers[this.props.test.questions[this.props.test.questions.length - 1]
                    .answers.length - 1].answer,
        }
        this.inputFile = React.createRef(null)
    }

    putInUploadFile = (value) => {
        this.props.uploudFile(value, 'imageAns', this.props.questionIndex, this.props.answerNumber - 1)
    }

    // addAnswerImgFunc = () => {
    //     this.refs.fileUploader.click();
    // }
    clearFileInput = () => {
        this.inputFile.current.value = null;
    }

    render() {
        const openQuestion = this.props.test.questions[this.props.questionIndex].openQuestion
        return (

            <>
                <div className="ansMargin answers-card toDrag "
                    onMouseEnter={() => this.setState({ isShown: true })}
                    onMouseLeave={() => this.setState({ isShown: false })}>
                    {openQuestion || this.props.test.kind == "survey" ? null :
                        <span className="in-card-ans rad">
                            {!this.props.toNotChange && <input
                                type="radio"
                                // disabled={this.props.toNotChange}
                                // style={{ border: "1px solid #8181A5" }}
                                checked={this.props.test.questions[this.props.questionIndex].correctAnswer == this.props.answerNumber}
                                id={this.props.answerNumber}
                                name={"select_answer" + this.props.questionIndex}
                                onChange={(e) => {
                                    this.props.handleAnswers(this.props.questionIndex, 'correctAnswer', e.target.id);
                                    this.props.setQuestionItem(this.props.questionIndex);
                                    !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                }}
                            // required
                            />}
                        </span>

                    }
                    <p className="number-p in-card-ans">{this.props.answerNumber}. </p>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Empty "

                        className={this.props.test.questions[this.props.questionIndex].correctAnswer == this.props.answerNumber ? "in-card-ans ans-input  right-ans" : "in-card-ans ans-input "}
                        name={this.props.answerNumber}
                        disabled={this.props.toNotChange}
                        placeholder={!openQuestion ?
                            Number(this.props.questionIndex + 1) == 1 ?
                                this.props.answerNumber == 1 ? "Okay" : this.props.answerNumber == 2 ? "Fine" : this.props.answerNumber == 3 ? "Bad"
                                    : "Answer.."
                                : "Answer.." : "Type Answer.."}
                        value={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer}
                        onChange={(e) => {
                            this.props.handleMultiAnswers(this.props.questionIndex, e.target.name, e.target.value);
                            this.setState({ answer: e.target.value });
                            //this.props.setIsClickPlus(false);
                            if (e.target.value < 1)
                                this.props.CheckEmptyLastQuestion();
                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                            this.props.setQuestionItem(this.props.questionIndex);
                        }
                        }
                    // required={!openQuestion}
                    />
                    {/* <input className={this.props.test.questions[this.props.questionIndex].correctAnswer == this.props.answerNumber ? "in-card-ans ans-input  right-ans" : "in-card-ans ans-input "}
                    // autoFocus="true"
                    autoComplete="off"
                    name={this.props.answerNumber}
                    type="text"
                    placeholder={!openQuestion ? "Answer" : "Type Answer.."}
                    value={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer}
                    //className="form-control"
                    onChange={(e) => this.props.handleMultiAnswers(this.props.questionIndex, e.target.name, e.target.value)}
                    //style={{ marginLeft: "15px", width: "80%" }}
                    required={!openQuestion}
                /> */}


                    <div className="in-card-ans">
                        {
                            this.state.isShown && !this.props.toNotChange &&
                            (
                                <div className="d-flex flex-row in-card-ans icons-ans" style={{ marginLeft: "91%" }}>
                                    <div className="wrap-tooltip1">
                                        <BsImage id="icon" className="icon-x"
                                            onClick={(e) => {
                                                this.inputFile.current.click();
                                                !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                            }} />
                                        <p className="tooltip-text-area">Add Image</p>
                                    </div>
                                    <div className="wrap-tooltip1">
                                        <RiFileCopyLine className="mx-1 icon-x" id="icon" onClick={(e) => {
                                            this.props.copyAnswer(e, this.props.questionIndex, this.props.answerNumber - 1);
                                            this.props.setQuestionItem(this.props.questionIndex);
                                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                        }} />
                                        <p className="tooltip-text-area">Copy Answer</p>
                                    </div>
                                    <div className="wrap-tooltip1">
                                        <BsTrash id="icon" className="icon-x" onClick={(e) => {
                                            this.props.deleteAnswer(e, this.props.questionIndex, this.props.answerNumber - 1);
                                            this.props.setQuestionItem(this.props.questionIndex);
                                            !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                        }} />
                                        <p className="tooltip-text-area" style={{ zIndex: "999" }}>Delete Answer</p>
                                    </div>
                                </div>
                            )}
                        {/* {!openQuestion &&

                        <FaEllipsisV style={{ color: "B1B1B1" }}
                            onMouseEnter={() => this.setState({ isShown: true })} />
                    } */}
                    </div>

                </div >
                {/* {this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer == '' &&
                    this.props.isClickPlus &&
                    this.props.questionIndex == this.props.test.questions.length - 1 &&
                    <p style={{ color: 'red' }} className="err-msg">
                        Please fill in the answer
                    </p>} */}
                <label style={{ visibility: "hidden", marginBottom: '0', display: 'table-column' }} className="custom-file-uplod">
                    <input type="file" style={{ visibility: "hidden" }}
                        ref={this.inputFile}
                        onClick={this.clearFileInput}
                        onChange={(e) => {
                            this.setState({ showPicture: false })
                            this.putInUploadFile(e.target.files);
                        }}
                        accept="image/*"

                    />
                    {/* {<label style={{ marginRight: '1em', fontSize: '1.7vh' }}>Upload Picture</label>} */}
                    {/* <FiUpload style={{ width: "2.2%" }} id="icon" className="icon-up-load" ></FiUpload> */}
                </label>
                <label>
                    {this.props.loaderUpload && this.props.loaderUploadImg.type == 'ans' &&
                        this.props.loaderUploadImg.index == (this.props.answerNumber - 1) && this.props.loaderUploadImg.questIndex == this.props.questionIndex &&

                        <img src={loaderupload} alt="loading..." style={{ color: "white", width: '5vh', borderRadius: '190px', marginLeft: '2em' }} />

                    }
                    {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) &&
                        <div
                            onMouseEnter={() => this.setState({ showTrashImg: true })}
                            onMouseLeave={() => this.setState({ showTrashImg: false })}
                        >
                            {/* <div style={{ marginLeft: '-2.26em', position: 'absolute' ,width:'30vh'}} className='image-question divImg pointer'
                                onClick={() => {
                                    this.setState({ showPicture: true })
                                }}
                            > */}
                                {this.state.showTrashImg && <BsTrash id="icon" className="iconTrash pointer"
                                    onClick={(e) => {
                                        this.setState({ showPicture: false })
                                        this.props.AnswerPicture(this.props.questionIndex, this.props.answerNumber - 1, '');
                                        !this.props.collapses.includes(1) && this.props.setCollapes(1);
                                    }} />}
                            {/* </div> */}
                            <Image resizeMode='contain' id='imgQuest' style={{ marginLeft: '-0.8em' }} className='image-question pointer imghover'
                                onClick={() => {
                                    this.setState({ showPicture: true })
                                }}
                                src={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture}
                            />

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
                {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) && <br />}

                {
                    (this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) && this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>
                }
            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMultiAnswer)