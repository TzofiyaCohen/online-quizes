import React from "react"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import ShowAnswersToStudent from "../ShowAnswersToStudent/ShowAnswersToStudent"
import "./answerQuestion.css"
import Lightbox from "react-awesome-lightbox";

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student,
        isHebrewQuest: state.funnelReducer.isHebrewQuest,
    };
}

const mapDispatchToProps = (dispatch) => ({
    submitAnswer: (questionNumber, studentAnswer) => dispatch(actions.submitAnswer({ questionNumber, studentAnswer })),
    setIsHebrewQuest: (val) => dispatch(actions.setIsHebrewQuest(val)),
})


class AnswerQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            showPicture: false,
            isHebrewQuest: false
        }
        //this.onSubmit = this.onSubmit.bind(this)
    }

    is_heb = (Field) => {
        // First choose the required validation

        var HebrewChars = new RegExp("^[\u0590-\u05FF]+$");
        // AlphaNumericChars = new RegExp("^[a-zA-Z0-9\-]+$");
        // EnglishChars = new RegExp("^[a-zA-Z\-]+$");
        // LegalChars = new RegExp("^[a-zA-Z\-\u0590-\u05FF ]+$"); 
        //Note that this one allows space 
        if (!HebrewChars.test(Field)) {
            this.props.setIsHebrewQuest(false);
        } else
            this.props.setIsHebrewQuest(true);
    }



    ifImage = (image) => {
        if (image)
            return <img className="image-ans-question"
                onClick={() => {
                    this.setState({ showPicture: true })
                }}
                // style={{ marginRight: "50vh", display: 'block', marginTop: '3vh' }}
                src={image} />
    }

    render() {

        return (
            <div className="div-question div-question-view my-4">
                <div className="inner-question pt-1" >
                    {/* {this.is_heb(this.props.test.questions[this.props.questionIndex].question)} */}
                    <span style={{ unicodeBidi: 'bidi-override' }} className="title_span">
                        {!this.props.isHebrewQuest && this.props.questionNumber + ". "}
                        {this.props.test.questions[this.props.questionIndex].question}
                        {this.props.test.questions[this.props.questionIndex].mandatoryQuestion &&
                            <span style={{ fontSize: '1.3rem', color: 'red' }}>*</span>}

                    </span>
                    {this.props.isHebrewQuest && <span className="title_span">{"." + this.props.questionNumber}</span>}
                    {this.ifImage(this.props.test.questions[this.props.questionIndex].image)}
                    <br />
                    {/* <span className="description_span">
                        Description
                        </span> */}

                    <div className="ans-div mt-4 pb-3">

                        {this.props.question.answers.map((answer, index) => (
                            <ShowAnswersToStudent
                                key={index}
                                answerNumber={index + 1}
                                questionIndex={this.props.questionIndex}
                            // openQuestion={this.props.question.openQuestion} //if there is only one answer then it is open question
                            //condition ? exprIfTrue : exprIfFalse
                            />

                        ))}
                    </div>
                </div>
                {this.state.showPicture &&
                    <Lightbox image={this.props.test.questions[this.props.questionIndex].image}
                        onClose={() => {
                            this.setState({ showPicture: false })
                        }}
                        title="Image Title"></Lightbox>}


            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion)