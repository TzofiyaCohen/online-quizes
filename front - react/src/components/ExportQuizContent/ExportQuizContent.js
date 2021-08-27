import React from 'react'
import UpdateTest from '../UpdateTest/UpdateTest'
import AddQuestion from "../AddQuestion/AddQuestion"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import './ExportQuizContent.css'


function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        backgroundImage: state.testReducer.test.backgroundImage,

    };
}

class ExportQuizContent extends React.Component {

    showQuestions = () => {
        return this.props.test.questions.map((item, index) => (
            <AddQuestion
                key={index}
                questionNumber={index + 1}
                questionIndex={index}
                toNotChange={true}
            />
        ))
    }

    render() {
        return (
            < form id="test_form" onSubmit={this.onSubmit}>

                <div className=" test_list_title_tests" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
                    <div>
                        <input className="test-name mb-0" type="text" placeholder="The name of the test"
                            value={this.props.test.test_name}
                        />
                        <input className="test-description mb-2" type="text" placeholder="Test Description"
                            value={this.props.test.description} />
                    </div>
                </div>

                <div className="wrapper">
                    <div className="question-wrapper2 ">
                        {this.showQuestions()}
                    </div>
                </div>
            </form>

        )
    }
}

export default connect(mapStateToProps)(ExportQuizContent)
