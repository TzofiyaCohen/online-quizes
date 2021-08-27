import React from "react"
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import "./showAnswersToStudent.css";
import Lightbox from "react-awesome-lightbox";

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student
    };
}

const mapDispatchToProps = (dispatch) => ({
    submitAnswer: (questionNumber, studentAnswer) => dispatch(actions.submitAnswer({ questionNumber, studentAnswer }))
})

class ShowAnswersToStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicture: false,
        }

    }

    correctValue = (questionNumber) => {
        const emptySrt = ""
        //checks if the question exsit -- case of update (changed the answer)
        for (let k = 0; k < this.props.student.test.answersArray.length; k++) {
            if (this.props.student.test.answersArray[k].questionNumber === questionNumber) {
                return (this.props.student.test.answersArray[k].studentAnswer)
            }
        }
        return emptySrt
    }

    render() {
        const isOpen = this.props.test.questions[this.props.questionIndex].openQuestion;
        const inTime = this.props.test.timer >= 0
        return (
            <div className="answers-card student-answers my-3 ansStudentDiv">
                {this.props.test.questions[this.props.questionIndex].openQuestion ? null :
                    <span style={{float:'left'}} className="in-card-ans"> <input
                        type="radio"
                        // checked={this.props.test.questions[this.props.questionIndex].correctAnswer == this.props.answerNumber}
                        id={this.props.answerNumber}
                        name={"select_answer" + this.props.questionIndex}
                        className='ansRadioInput'
                        onChange={(e) => this.props.submitAnswer(this.props.questionIndex + 1, e.target.id)}
                        // disabled={!inTime}
                        disabled={this.props.test.kind == 'quiz' ? !inTime : false}
                        style={{marginTop:'0.22rem'}}
                    />
                    </span>
                }

                <p className="number-p in-card-ans ansNum">{this.props.answerNumber}. </p>

                <div className="in-card-ans ml-2 ansAna">

                    {/* <div> */}

                    {this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer}

                    {/* </div> */}


                    {/* <input
                        name={this.props.answerNumber}
                        type="text"
                        value={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answer}
                        className="form-control"
                        //onChange={(e) => this.props.handleMultiAnswers(this.props.questionIndex, e.target.name, e.target.value)}
                        disabled={!isOpen || !inTime}
                        onChange={(e) => this.props.submitAnswer(this.props.questionIndex + 1, e.target.value)}
                    // required={!openQuestion}
                    /> */}
                    <div>
                        {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) &&
                            <img className="image-ans-answer"
                                onClick={() => {
                                    this.setState({ showPicture: true })
                                }}
                                src={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture} />
                        }
                    </div>
                </div>
                {(this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture) && this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].answers[this.props.answerNumber - 1].answerPicture}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>}



            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowAnswersToStudent)