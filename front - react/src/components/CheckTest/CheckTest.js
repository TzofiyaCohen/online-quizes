import React from "react"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import CheckQuestion from '../../components/CheckQuestion/CheckQuestion'
import { FaEllipsisV, FaEdit } from 'react-icons/fa';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiFileCopyLine } from 'react-icons/ri';
import { BsTrash } from 'react-icons/bs'
import AutosizeInput from 'react-input-autosize';

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student,
        teacher: state.teacherReducer.teacher
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    setSolvedTest: (id, from) => dispatch(actions.setSolvedTest({ id, from })),
    changeTestList: (testID, teacherID, currentTest) => dispatch(actions.changeTestList({ testID, teacherID, currentTest })),
    setGrade: (testID, finalGrade) => dispatch(actions.setGrade({ testID, finalGrade })),
    setcheckTest: (value) => dispatch(actions.setcheckTest(value)),
    calculateGradeOpenQuest: (testID, numOfQuest) => dispatch(actions.calculateGradeOpenQuest({ testID, numOfQuest })),
})

class CheckTest extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentWillMount() {
        this.props.setSolvedTest(this.props.match.params.id, "to check")
    }
    sendEmailWithGrade = () => {

    }
    onSubmit(e) {
        e.preventDefault();
        this.props.calculateGradeOpenQuest(this.props.test.id, this.props.test.questions.length)
        this.props.setcheckTest(false)

        this.sendEmailWithGrade()

    }

    componentDidUpdate(prevProps) {
        if (this.props.teacher.setGrade !== prevProps.teacher.setGrade) {

            //remove the test from the teacher test to check and add to checked
            const currentTest = this.props.teacher.testToCheck.filter(test => test._id == this.props.test.id)[0]
            console.log(currentTest)
            console.log(this.props.teacher.setGrade)
            this.props.changeTestList(this.props.test.id, this.props.teacher.id, currentTest)

        }
    }

    render() {
        this.props.setTestListInfo(false)
        this.props.setcheckTest(true)
        return (
            <form id="answer_test_form" onSubmit={this.onSubmit}>
                {/* first row */}
                <div className="d-flex flex-row" style={{ justifyContent: "space-between", padding: "10px", paddingTop: "30px", paddingLeft: "0px" }}>
                    <span id="span" onMouseLeave={() => this.setState({ isShown_testName: false })}
                        className="input-group tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                        <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                            {this.props.test.test_name}
                        </div>
                        {/* <AutosizeInput
                            value={this.props.test.test_name == " " ? "Type Test Name" : this.props.test.test_name}
                            inputStyle={{ border: "none", minWidth: "350px" }}
                            onChange={(e) => this.props.setTestName(e.target.value)}
                            placeholder="Type Test Name"
                        /> */}

                        {/* <span class="tooltiptext">Test Name</span> */}

                    </span>

                    <span className="d-flex flex-row " >
                        <span id="span" className="d-flex row tooltip2" style={{ width: "70%", marginRight: "10px", height: "38px", alignItems: "center" }}>

                            <AiFillClockCircle id="icon" style={{}} />
                            {/* <input
                                className="input_style"
                                type="number"
                                value={this.props.test.duration == " " ? "Test Time" : this.props.test.duration}
                                style={{ width: "70%" }}
                                placeholder="Test Time"
                            /> */}
                            <span class="tooltiptext">Test Time</span>
                        </span>
                    </span>
                </div>

                <div id="span" onMouseLeave={() => this.setState({ isShown_description: false })}
                    className="input-group mt-2 tooltip2"
                    style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                    <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                        {this.props.test.description}
                    </div>
                    {/* <AutosizeInput
                        value={this.props.test.description == " " ? "please enter some description" : this.props.test.description}
                        placeholder="please enter some description"
                        inputStyle={{ border: "none", minWidth: "350px" }}
                    /> */}
                    <span class="tooltiptext">Test Description</span>
                </div>

                {
                    this.props.test.questions.map((item, index) => (
                        <CheckQuestion
                            key={index}
                            questionNumber={index + 1}
                            questionIndex={index}
                        />
                    ))
                }

            </form >

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckTest)