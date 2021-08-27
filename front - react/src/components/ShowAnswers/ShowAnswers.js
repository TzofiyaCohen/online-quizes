import React from "react"
import { connect } from 'react-redux';
import { actions } from '../../store/actions';
import Lightbox from "react-awesome-lightbox";
import './ShowAnswers.css'

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student

    };
}

const mapDispatchToProps = (dispatch) => ({
    submitAnswer: (questionNumber, studentAnswer) => dispatch(actions.submitAnswer({ questionNumber, studentAnswer }))
})

class showAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicture: false,
            answerIndex: 0,
            answerIsCorrect: false,
            studentAns: 0
        }


    }

    is_correct = (questionId) => {
        for (let i = 0; i < this.props.test.answersArray.length; i++) {
            if (parseInt(this.props.test.answersArray[i].questionNumber) == questionId + 1)
                return (this.props.test.answersArray[i].is_correct)
        }
    }

    correctValue = (questionNumber) => {
        const emptySrt = ""
        //checks if the question exsit -- case of update (changed the answer)
        for (let k = 0; k < this.props.student.test.answersArray.length; k++) {
            if (this.props.student.test.answersArray[k].questionNumber == questionNumber) {
                this.setState({ answerIndex: k })
                if (this.props.student.test.answersArray[k].is_correct) {
                    this.setState({ answerIsCorrect: true })
                }
            }
        }
        return emptySrt
    }
    returnAnswer = (questNum) => {
        var question = this.props.test.answersArray.filter(el => el.questionNumber == questNum + 1)[0]
        console.log(question)
        return question
    }
    // returnAnswer = (questionNum) => {
    //     //alert(this.props.test.answersArray.length + "num quest")
    //     for (let i = 0; i < this.props.test.answersArray.length; i++) {
    //         //alert(this.props.test.answersArray[i].questionNumber, questionId + 1)
    //         if (this.props.test.answersArray[i].questionNumber == questionNum)
    //             return (this.props.test.answersArray[i])
    //     }
    // }

    render() {
        const isOpen = this.props.test.questions[this.props.questionIndex].openQuestion;
        return (
            <>
                {/* {this.correctValue(this.props.questionIndex + 1)} */}
                <div className="answers-card my-3 answers-card-view">
                    {!isOpen &&
                        <span className="in-card-ans">
                            {/* <input
                            type="radio"
                            // style={{ border: "1px solid #8181A5" }}
                            checked={this.returnAnswer(this.props.questionIndex) == undefined ? null :
                                this.returnAnswer(this.props.questionIndex).studentAnswer == this.props.answerNumber
                            }
                            id={this.props.answerNumber}
                            name={"select_answer" + this.props.questionIndex}
                            disabled="False"
                        /> */}
                        </span>
                    }
                    <p className="number-p in-card-ans">{this.props.answerNumber}. </p>
                    <span className={this.returnAnswer(this.props.questionIndex) == undefined ? "in-card-ans ans-input" :
                        this.returnAnswer(this.props.questionIndex).studentAnswer == this.props.answerNumber && this.is_correct(this.props.questionIndex) ?
                            "in-card-ans ans-input checked-ans rightAnsStudent" :
                            this.props.test.questions[this.props.questionIndex].correctAnswer == this.props.answerNumber ?
                                "in-card-ans ans-input checked-ans rightAnsStudent" :
                                this.returnAnswer(this.props.questionIndex).studentAnswer == this.props.answerNumber && !this.is_correct(this.props.questionIndex) ?
                                    "in-card-ans ans-input checked-ans wrongAnsStudent" :
                                    "in-card-ans ans-input"
                    } >
                        {/* <div className="form-control" style={{ marginLeft: "15px", width: "80%" }}> */}
                        {isOpen ? this.returnAnswer(this.props.questionIndex) == undefined ? null : this.returnAnswer(this.props.questionIndex).studentAnswer
                            :
                            this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer}
                        {/* </div> */}
                    </span>
                </div>
                <div>
                    {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) &&
                        <img className="image-question"
                            onClick={() => {
                                this.setState({ showPicture: true })
                            }}
                            src={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture} />
                    }
                </div>

                {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) && this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>}

            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(showAnswers)