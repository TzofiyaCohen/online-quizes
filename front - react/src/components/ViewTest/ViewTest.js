import React from "react"
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import CheckQuestion from '../../components/CheckQuestion/CheckQuestion'
import { AiFillClockCircle } from 'react-icons/ai';
import AutosizeInput from 'react-input-autosize';
import "../AddTest/AddTest.css"
import ReactPlayer from 'react-player'

function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        student: state.studentReducer.student,
        teacher: state.teacherReducer.teacher,
        userName: state.funnelReducer.userName,
        backgroundImage: state.testReducer.test.backgroundImage,
        backArrow: state.funnelReducer.backArrow,
        backToTestListFromView: state.funnelReducer.backToTestListFromView,

    };
}

const mapDispatchToProps = (dispatch) => ({
    setGrade: (testID, finalGrade) => dispatch(actions.setGrade({ testID, finalGrade })),
    setcheckTest: (value) => dispatch(actions.setcheckTest(value)),
    resetTestVarsToReturnToTestList: () => dispatch(actions.resetTestVarsToReturnToTestList()),
    setCheckedTestList: () => dispatch(actions.setCheckedTestList()),
    setSolvedTest: (id, from) => dispatch(actions.setSolvedTest({ id, from })),
    setViewTest: (value) => dispatch(actions.setViewTest(value)),
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    resetTestVarsToReturnToTestList: () => dispatch(actions.resetTestVarsToReturnToTestList()),
    resetFunnelVarsToReturnToTestList: () => dispatch(actions.resetFunnelVarsToReturnToTestList()),
})

class ViewTest extends React.Component {
    constructor() {
        super();
        this.state = {
            backToTestList: false,
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        this.props.setSolvedTest(this.props.match.params.id, "checked")
    }

    componentDidUpdate(prevProps) {

        if (this.props.backToTestListFromView) {
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
        }

        if (this.state.backToTestList) {
            this.props.resetFunnelVarsToReturnToTestList();
            this.props.resetTestVarsToReturnToTestList();
            this.props.history.push((`/${this.props.userName}/`))
            //window.location = `/${this.props.userName}/`;
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ backToTestList: true })
        // this.props.setCheckedTestList()
        this.props.setViewTest(false)
        window.history.back()
    }

    render() {
        this.props.setTestListInfo(false)
        if (!this.state.backToTestList)
            this.props.setViewTest(true)

        return (
            <>
                <div className=" test_list_title_tests" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
                    <div>
                        <p className="test-name mb-0">{this.props.test.test_name}</p>
                        <p className="test-description mb-2">{this.props.test.description}</p>
                        {this.props.test.video != '' && this.props.test.displayVideo &&
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
                <form id="view" onSubmit={this.onSubmit}>
                    {/* first row */}
                    {/* <div className="d-flex flex-row" style={{ justifyContent: "space-between", padding: "10px", paddingTop: "30px", paddingLeft: "0px" }}>

                        <span id="span"
                            className="input-group tooltip2" style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                            <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                                {this.props.test.test_name}
                            </div>

                            <span class="tooltiptext">Test Name</span>
                        </span>

                        <span className="d-flex flex-row " >
                            <span id="span" className="d-flex row tooltip2" style={{ width: "70%", marginRight: "10px", height: "38px", alignItems: "center" }}>
                                <AiFillClockCircle id="icon" style={{}} />
                                <input
                                    className="input_style"
                                    type="number"
                                    value={this.props.test.duration}
                                    style={{ width: "70%" }}
                                />
                                <span class="tooltiptext">Test Time</span>
                            </span>
                        </span>
                    </div>
                    <div id="span"
                        className="input-group mt-2 tooltip2"
                        style={{ width: "fit-content", padding: "10px", height: "fit-content", justifyContent: "space-between" }}>
                        <div style={{ border: "none", minWidth: "350px", textAlign: "left" }}>
                            {this.props.test.description}
                        </div>
                       
                        <span class="tooltiptext">Test Description</span>
                    </div> */}
                    <div className="question-wrapper">{
                        this.props.test.questions.map((item, index) => (
                            <CheckQuestion
                                key={index}
                                questionNumber={index + 1}
                                questionIndex={index}
                            />
                        ))
                    }
                    </div>


                </form >
            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTest)