import React from "react"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import ShowAnswers from "./../ShowAnswers/ShowAnswers"
import { event } from "jquery";
import "./CheckQuestion.css";
import Lightbox from "react-awesome-lightbox";

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student,
        teacher: state.teacherReducer.teacher,
        viewTest: state.funnelReducer.viewTest,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setMark: (mark, questionNumber, testID) => dispatch(actions.setMark({ mark, questionNumber, testID })),
})

class CheckQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            showPicture: false,
        }
    }

    is_correct = (questionId) => {
        for (let i = 0; i < this.props.test.answersArray.length; i++) {
            if (parseInt(this.props.test.answersArray[i].questionNumber) == questionId + 1)
                return (this.props.test.answersArray[i].is_correct)
        }
    }
    showAnswers = () => {
        const answersArray = this.props.test.questions[this.props.questionIndex].answers
        return answersArray.map((item, index) => (
            <ShowAnswers
                key={index}
                answerNumber={index + 1}
                questionIndex={this.props.questionIndex}
            />
        )
        )
    }
    getQuestionGrade = (questIndex) => {
        for (let i = 0; i < this.props.test.answersArray.length; i++) {
            if (this.props.test.answersArray[i].questionNumber == questIndex + 1)
                return this.props.test.answersArray[i].gradeOpenQuest
        }
    }

    render() {
        return (
            <div className="div-question div-question-view my-4">
                {/* <div className="d-flex flex-row" style={{ marginTop: "30px", alignItems: "center" }}> */}
                {/* <label style={{ color: "#5A5A81", width: "30px", height: "19px", textAlign: "center", font: "normal normal bold 16px/18px Lato", padding: "7px" }}>{this.props.questionIndex + 1}</label> */}

                <div className="inner-question  pt-3">
                    <div className="in-quest-click" style={{ marginRight: "50vh" }}>
                        <span className="title_span">
                            {this.props.questionNumber + ". "}
                            {this.props.test.questions[this.props.questionIndex].question}
                            {this.props.test.questions[this.props.questionIndex].image &&
                                <img
                                    className="image-question"
                                    style={{ marginRight: "50vh", display: 'block', marginTop: '3vh' }}
                                    onClick={() => {
                                        this.setState({ showPicture: true })
                                    }}
                                    src={this.props.test.questions[this.props.questionIndex].image} />}
                        </span>
                        <br />

                        {/* if the answer correct V and if not X */}
                        {(this.props.test.kind == "quiz" || this.props.test.kind == "position") && <div className="svg-ans" >
                            {this.props.test.questions[this.props.questionIndex].openQuestion ? null :
                                (this.is_correct(this.props.questionIndex) ?
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check" fill="green" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                    </svg>
                                    :
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="red" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                )
                            }
                        </div>}
                        {/* <div className="d-flex flex-row" >
                            {this.props.test.questions[this.props.questionIndex].openQuestion ?
                                <span className="d-flex flex-row " >
                                    <span id="span" className="d-flex row tooltip2" style={{ width: "100%", marginRight: "10px", height: "38px", alignItems: "center" }}>

                                        {this.props.viewTest ?
                                            <input
                                                className="input_style w-100"
                                                type="text"
                                                value={this.getQuestionGrade(this.props.questionIndex)}
                                            />
                                            :
                                            <input
                                                className="input_style w-100"
                                                type="number"
                                                onChange={(e) => this.props.setMark(e.target.value, this.props.questionIndex + 1, this.props.test.id)}
                                                min="0"
                                                max="100"
                                                required
                                            />
                                        }
                                        <span class="tooltiptext">question mark</span>
                                    </span>
                                </span>
                                : null
                            }
                        </div> */}
                    </div>
                </div>
                {/* </div> */}
                <div className="ans-div ans-div-view mt-4">
                    {this.showAnswers()}
                </div>
                {this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].image}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>}

            </div >
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CheckQuestion)