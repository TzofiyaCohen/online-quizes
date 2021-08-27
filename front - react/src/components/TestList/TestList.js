import React from "react"
import { Link } from 'react-router-dom';
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import ListView from "./../ListView/ListView"
import TableView from "./../TableView/TableView"
import "./TestList.css"
import 'react-dropdown/style.css';
import Card from 'react-bootstrap/Card'
import { IoIosArrowDown, IoIosArrowForward, } from 'react-icons/io'
import { MdDelete, MdContentCopy, MdRestore } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { HiOutlineSearch } from 'react-icons/hi'
import 'react-dropdown/style.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { confirmAlert } from 'react-confirm-alert';



function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
        teacher: state.teacherReducer.teacher,
        listView: state.funnelReducer.listView,
        allTests: state.funnelReducer.allTests,
        filteredTests: state.funnelReducer.filteredTests,
        testListInfo: state.funnelReducer.testListInfo,
        testInfo: state.funnelReducer.testInfo,
        displayTest: state.funnelReducer.displayTest,
        copyTest: state.funnelReducer.copyTest,
        userName: state.funnelReducer.userName,
        jwt: state.funnelReducer.jwt,
        numOfTestedarray: state.funnelReducer.numOfTested,
        testAverage: state.funnelReducer.testAverage,
        solvedTestArray: state.funnelReducer.solvedTestArray,
        trashTestArray: state.funnelReducer.trashTestArray,
        selectedTest: state.funnelReducer.selectedTest,
        teachersName: state.funnelReducer.teachersName,
        isOpenSearch: state.funnelReducer.isOpenSearch,
        mergedSolved: state.funnelReducer.mergedSolved,
        isCheckedTest: state.funnelReducer.isCheckedTest,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUserAsTeacher: (userName) => dispatch(actions.setUserAsTeacher(userName)),
    changeTestView: () => dispatch(actions.changeTestView()),
    setAllTests: (tests) => dispatch(actions.setAllTests(tests)),
    setFilteredTests: (tests) => dispatch(actions.setFilteredTests({ data: tests, from: "testlist" })),
    setTestListInfo: (value) => dispatch(actions.setTestListInfo(value)),
    setTestInfo: (value) => dispatch(actions.setTestInfo(value)),
    updateFiltered: (restore, id) => dispatch(actions.updateFiltered({ restore, id })),
    //deleteToCheckTest: (testID, teacherID) => dispatch(actions.deleteToCheckTest({ testID, teacherID })),
    deleteSolvedTest: (testID) => dispatch(actions.deleteSolvedTest(testID)),
    getAllTests: (copy) => dispatch(actions.getAllTests({ copy })),
    deleteTest: (id) => dispatch(actions.deleteTest(id)),
    copyTest: (id) => dispatch(actions.copyTest(id)),
    copySolvedTest: (id) => dispatch(actions.copySolvedTest(id)),
    selectAllTest: (add) => dispatch(actions.selectAllTest(add)),
    deleteSelectedTest: () => dispatch(actions.deleteSelectedTest()),
    deleteSelectedSolvedTest: () => dispatch(actions.deleteSelectedSolvedTest()),
    copySelectedTest: () => dispatch(actions.copySelectedTest()),
    numOfTested: () => dispatch(actions.numOfTested()),
    average: () => dispatch(actions.average()),
    getTrashTests: (mount) => dispatch(actions.getTrashTests(mount)),
    getSolvedTests: (mount) => dispatch(actions.getSolvedTests(mount)),
    getTeachersName: () => dispatch(actions.getTeachersName()),
    setIsOpenSearch: (value) => dispatch(actions.setIsOpenSearch(value)),
    toTrash: (id) => dispatch(actions.toTrash(id)),
    toListFromTrash: (id) => dispatch(actions.toListFromTrash(id)),
    ResetSelectedTest: () => dispatch(actions.ResetSelectedTest()),
    cons: () => dispatch(actions.cons("jbhjj")),
    getUserContactsEmail: () => dispatch(actions.getUserContactsEmail()),
    updateAllTests: (id) => dispatch(actions.updateAllTests(id)),
    updateMerged: (id) => dispatch(actions.updateMerged(id)),
    updateTrashedTest: (id) => dispatch(actions.updateTrashedTest(id)),
    setIsCheckedTest: (value)=> dispatch(actions.setIsCheckedTest(value)),


})

const AddCard = props => (
    <Card id="card">
        <Card.Body style={{ backgroundColor: "#A66DFF" }}>
            <Link to={`/${props.userName}/add`} className="plus link" style={{ textDecoration: 'none' }} ></Link>
        </Card.Body>
        <Card.Footer className="card-footer">
            <p>New Project</p>
        </Card.Footer>
    </Card>
)

class TestList extends React.Component {

    constructor(props) {
        super(props);

        this.deleteTest = this.deleteTest.bind(this)

        this.state = {
            licked_search: false,
            open_sort_dropdown: false
        }
    }

    async componentDidMount() {
        this.props.cons()
        //get the teacher or create if not exsit

        this.props.setUserAsTeacher(this.props.match.params.userName)

        //in crud
        console.log(this.props.filteredTests, " in did mount")
        this.props.getAllTests(false)
        this.props.numOfTested()
        this.props.average()
        this.props.getTeachersName()
        this.props.getUserContactsEmail()
        this.props.getTrashTests("get trash test")
        this.props.getSolvedTests("get solved test")
    }

    deleteTest(id, studentUserName) {
        if (this.props.displayTest === "all") {
            this.props.toTrash(id)
            this.props.updateAllTests(id)
        }

        if (this.props.displayTest === "deleted") {
            this.props.deleteTest(id) //in crud
            this.props.updateTrashedTest(id)
        }

        // if (this.props.displayTest == "to_check")
        //     this.props.deleteToCheckTest(id, this.props.teacher.id)

        if (this.props.displayTest === "checked") {
            this.props.deleteSolvedTest(id)
            this.props.updateMerged(id)
        }

        this.props.updateFiltered(false, id)
    }

    restoreTest(id) {
        this.props.toListFromTrash(id)
        this.props.updateFiltered(true, id)
    }

    restoreList = async () => {
        await this.props.selectedTest.map((testId) => {
            // this.props.toListFromTrash(testId)
            // this.props.updateFiltered(testId)
            this.restoreTest(testId)
        })
        this.props.ResetSelectedTest()
    }

    listToTrash = async () => {
        await this.props.selectedTest.map((testId) => {
            this.props.toTrash(testId)
            this.props.getAllTests(false)
            this.props.getTrashTests("get trash test")
            this.props.updateFiltered(false, testId)
        })
        this.props.ResetSelectedTest()
    }


    componentDidUpdate(prevProps) {
        if (this.props.copyTest !== prevProps.copyTest) {
            //in crud
            this.props.getAllTests(true)
        }
    }

    copyTest = (id) => {
        console.log(id)
        //in crud
        if (this.props.displayTest === "all")
            this.props.copyTest(id)
        else
            this.props.copySolvedTest(id)
    }

    tested = (testID) => {
        const tested = this.props.numOfTestedarray.filter(el => el.testID === testID)[0]
        // console.log(tested)
        if (tested)
            return `${tested.tested}/${tested.all}`
    }

    average = (testID) => {
        const average = this.props.testAverage.filter(el => el.testID === testID)[0]
        if (average)
            return average.average
    }

    displayTests = () => {
        this.props.setTestInfo(false)
        if (this.props.listView) {
            return (
                <table className="table list_view_test mr-1 mt-0">
                    <tr >
    
                        <th style={{ width: "37vh", paddingRight: "0px" }}>
                            <th id="innerTH">
                                <label className="lableInput">
                                    <input className="cb checkalltests" name="select_test" type="checkbox"
                                        onChange={(e) => {this.props.selectAllTest(e.target.checked);this.props.setIsCheckedTest(!this.props.isCheckedTest)}}
                                        checked={this.props.selectedTest.length != 0 && (this.props.displayTest == "all" ? this.props.selectedTest.length == this.props.filteredTests.length
                                            : this.props.displayTest === "checked" ? this.props.selectedTest.length == this.props.filteredTests.length :
                                                this.props.selectedTest.length === this.props.trashTestArray.length)
                                        }>
                                    </input>
                                    <span></span>
                                </label>
                            </th>

                            <th id="innerTH"></th>
                            {/* <th id="innerTH"><input className="cb" type="checkbox"></input></th> */}
                            <th id="innerTH ">Name Of Profession</th>
                        </th >

                        {(this.props.displayTest === "all" || this.props.displayTest === "deleted") ? <th style={{ paddingLeft: "0px" }}>Date</th> : <th style={{ textAlign: "start" }}>Date Solvable</th>}
                        {(this.props.displayTest === "all" || this.props.displayTest === "deleted") && <th style={{ textAlign: "center" }}>Students Solved</th>}
                        {(this.props.displayTest === "all" || this.props.displayTest === "deleted") && <th style={{ textAlign: "center" }}>Average</th>}
                        {(this.props.displayTest === "all" || this.props.displayTest === "deleted") && <th style={{ textAlign: "center" }}>Status</th>}
                        {/* {(this.props.displayTest == "all" || this.props.displayTest == "deleted") && <th>kind</th>} */}
                        {this.props.displayTest === "checked" && <th style={{ textAlign: "center" }}>Student's Name</th>}
                        {this.props.displayTest === "checked" && <th style={{ textAlign: "center" }}>Mark</th>}
                        {/* {this.props.displayTest == "checked" && <th style={{ textAlign: "center" }}></th>} */}
                        <th style={{ background: "#F5F5FA" }}></th>
                        
                        <th></th>

                        {(this.props.displayTest === "all" || this.props.displayTest === "deleted") && <th></th>}
                    </tr>
                    {this.props.filteredTests.length === 0 && <tr><td colSpan="6"><div style={{ fontSize: '2.5rem', width: '100%', textAlign: 'center', color: "#d4d8dc", paddingTop: '13vh' }}>No tests</div></td></tr>}
                    {this.props.filteredTests &&
                        this.props.filteredTests.map(currntTest => {
                            return <ListView
                                testName={currntTest.test_name}
                                lastOpened={currntTest.lastOpened}
                                testID={currntTest._id}
                                deleteTest={() => this.deleteTest(currntTest._id)}
                                copyTest={() => this.copyTest(currntTest._id)}
                                tested={() => this.tested(currntTest._id)}
                                average={() => this.average(currntTest._id)}
                                creator={currntTest.creator}
                                status={currntTest.status}
                                restoreTest={() => this.restoreTest(currntTest._id)}
                                kind={currntTest.kind}
                            />
                        })}
                </table>)
        }

        else {

            return <div id="tableView" className="d-flex row ml-4">
                {this.props.displayTest === "all" && <AddCard userName={this.props.userName} />}

                {this.props.filteredTests &&
                    this.props.filteredTests.map(currntTest => {
                        return <TableView
                            testName={currntTest.test_name}
                            lastOpened={currntTest.lastOpened}
                            testID={currntTest._id}
                            deleteTest={() => this.deleteTest(currntTest._id)}
                            copyTest={() => this.copyTest(currntTest._id)}
                            tested={() => this.tested(currntTest._id)}
                            average={() => this.average(currntTest._id)}
                            restoreTest={() => this.restoreTest(currntTest._id)}
                        />
                    })}

            </div>
        }
    }

    search = (result) => {

        if (result != "") {
            console.log(result);
            this.searchConversations(result)
        } else {
            if (this.props.displayTest === "all")
                this.props.setFilteredTests(this.props.allTests)
            else {
                if (this.props.displayTest === "checked")
                    this.props.setFilteredTests(this.props.mergedSolved)
                if (this.props.displayTest === "deleted")
                    this.props.setFilteredTests(this.props.trashTestArray, "search deleted")
            }
        }
    }

    // if(props.displayTest == "deleted")
    //                 props.setFilteredTests(props.trashTestArray,"search deleted")
    //             else if(props.displayTest == "checked")
    //                 props.setFilteredTests(props.solvedTestArray,"search solved")


    searchConversations = (searchText) => {

        let filteredtests = [];
        this.props.setFilteredTests(filteredtests)

        if (this.props.displayTest === "all")
            var tests = this.props.allTests
        else {
            if (this.props.displayTest === "checked")
                var tests = this.props.mergedSolved
            if (this.props.displayTest === "deleted")
                var tests = this.props.trashTestArray

        }

        tests.forEach(item => {

            if (item.test_name != undefined && item.test_name.toLowerCase().indexOf(searchText) > -1) {
                console.log(item.test_name);

                filteredtests.push(item);
                this.props.setFilteredTests(filteredtests)
            }

        });

        console.log(filteredtests);
    }

    sortByDate = () => {
        let filteredtests = [];
        this.props.setFilteredTests(filteredtests)

        if (this.props.displayTest === "all")
            var tests = this.props.allTests
        else
            var tests = this.props.mergedSolved

        var sortedDates = []
        tests.forEach(element => {
            var date = element.lastOpened
            var testID = element._id
            sortedDates.push({ date, testID })
        });
        sortedDates.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        sortedDates.reverse()
        var result = []
        sortedDates.forEach(element => {
            let test = tests.filter(el => el._id == element.testID)[0]
            result.push(test)
        });
        this.props.setFilteredTests(result)
        console.log(result, "result")
        console.log(sortedDates, "sortedDates")
    }

    sortByAverage = () => {
        let filteredtests = [];
        this.props.setFilteredTests(filteredtests)

        if (this.props.displayTest === "all")
            var tests = this.props.allTests
        else
            var tests = this.props.mergedSolved

        var sortedAverage = this.props.testAverage.sort((a, b) => new Number(a.average) - new Number(b.average))
        sortedAverage.reverse()
        var result = []
        sortedAverage.forEach(element => {
            let test = tests.filter(el => el._id == element.testID)[0]
            if (test != undefined)
                result.push(test)
        });
        this.props.setFilteredTests(result)
        console.log(result, "result")
        console.log(sortedAverage, "sortedAverage")
    }

    sortByTeacher = (t_name) => {
        let filteredtests = [];
        this.props.setFilteredTests(filteredtests)

        console.log(t_name)
        if (this.props.displayTest === "all")
            var tests = this.props.allTests
        else
            var tests = this.props.mergedSolved

        if (t_name == "All Teachers")
            this.props.setFilteredTests(tests)
        else {
            var result = []
            tests.forEach(element => {
                if (element.creator == t_name)
                    result.push(element)
            });
            this.props.setFilteredTests(result)
        }
    }

    sortByMark = () => {
        var result = this.props.filteredTests.slice(0)  //copy filteredTests to result
        result.sort((a, b) => new Number(a.grade) - new Number(b.grade))
        result.reverse()
        console.log(result, "result")
        this.props.setFilteredTests(result)
    }

    sortByKind = (type) => {
        if (this.props.displayTest === "all")
            var tests = this.props.allTests
        else
            var tests = this.props.mergedSolved

        var result = []
        tests.forEach(element => {
            if (element.kind == type)
                result.push(element)
        });
        console.log(result)
        this.props.setFilteredTests(result)
    }


    sortBy = (e, by) => {
        console.log("e: ", e)
        console.log("by: ", by)
        if (by == "Date")
            this.sortByDate()
        else if (by == "Average")
            this.sortByAverage()
        else if (by == "Mark")
            this.sortByMark()
        else if (by == "quiz")
            this.sortByKind("quiz")
        else if (by == "survey")
            this.sortByKind("survey")
        else if (by == "position")
            this.sortByKind("position")
        // else
        //     this.sortByTeacher(by)
    }

    render() {
        this.props.setTestListInfo(true)
        console.log(this.props.filteredTests)
        return (
            <div>

                {
                    this.props.displayTest === "all" ?
                        <div className="row  test_list_title d-flex justify-content-center" style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                            <div className="absul-div-pargament">
                                {/* Exams & Surveys & Positions({this.props.filteredTests.length}) */}
                                Your documents ({this.props.filteredTests.length})
                            </div>
                        </div>
                        : this.props.displayTest === "checked" ?
                            <div className="row test_list_title d-flex justify-content-center">

                                <div className="absul-div-pargament">Solved tests({this.props.mergedSolved.length})</div>
                            </div> :
                            this.props.displayTest === "deleted" ?
                                <div className="row  test_list_title d-flex justify-content-center">
                                    <div className="absul-div-pargament"> Deleted tests({this.props.filteredTests.length})</div>
                                </div> :
                                this.props.testInfo ?
                                    <div className="row  test_list_title d-flex justify-content-center">test name</div> : ""
                }

                <div className="wrap-top mt-2">
                    {(this.props.selectedTest.length > 0) &&
                        <span id="elements" className=" d-flex justify-content-around align-items-between">

                            <MdDelete id="icon" onClick={(e) => {
                                confirmAlert({
                                    customUI: ({ onClose }) => {
                                        return (
                                            <div className="back-box">
                                                <div className='custom-ui'>
                                                    <IoClose className="xicon" id="icons"
                                                        onClick={() => onClose()}
                                                    />
                                                    {this.props.displayTest === "deleted" ?
                                                        <p>Do You Want To Delete All The Tests Forever?</p> :
                                                        <p>Do You Want To Remove All The Tests To Trash?</p>
                                                    }
                                                    <button className="cancel" onClick={onClose}>Cancel</button>
                                                    <button className="delete" onClick={() => {
                                                        // this.props.displayTest == "all" ?
                                                        //     this.props.deleteSelectedTest() :
                                                        //     this.props.deleteSelectedSolvedTest()
                                                        this.props.displayTest === "deleted" ?
                                                            this.props.deleteSelectedTest() :
                                                            this.props.displayTest === "all" ?
                                                                this.listToTrash() :
                                                                this.props.deleteSelectedSolvedTest()
                                                        onClose()
                                                    }}>Delete</button>
                                                </div>

                                            </div>
                                        )
                                    }
                                })
                            }

                            } />
                            {this.props.displayTest === "all" && <MdContentCopy id="icon" onClick={(e) => this.props.copySelectedTest()} />}
                            {this.props.displayTest === "deleted" &&
                                <MdRestore id="icon" onClick={(e) =>
                                    confirmAlert({
                                        customUI: ({ onClose }) => {
                                            return (
                                                // <div className="back-box">
                                                //         <div className='custom-ui'>
                                                //             <IoClose className="xicon" id="icons"
                                                //                 onClick={() => onClose()}
                                                //             />
                                                //             <p>Do You Want To <b>Restore</b> The Test?</p>
                                                //             <button className="cancel" onClick={onClose}>Cancel</button>
                                                //             <button className="delete" onClick={() => {
                                                //                 props.restoreTest()
                                                //                 onClose()
                                                //             }}>Restore</button>
                                                //         </div>
                                                //     </div>
                                                <div className="back-box">
                                                    <div className='custom-ui'>
                                                        <IoClose className="xicon" id="icons"
                                                            onClick={() => onClose()}
                                                        />
                                                        <p>Do You Want To <b>Restore</b> All The Tests?</p>

                                                        <button className="cancel" onClick={onClose}>Cancel</button>
                                                        <button className="restore" onClick={() => {
                                                            this.restoreList()
                                                            onClose()
                                                        }}>Restore</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                />}
                        </span>
                    }


                    {/* <input className="first_cb" name="select_test" type="checkbox"
                        onChange={(e) => this.props.selectAllTest(e.target.checked)}>
                    </input> */}
                    {/* <span id="elements" className=" d-flex justify-content-around p-3" style={{ width: "100px", marginLeft: "auto" }}>
                        <FaThLarge id="icon" onClick={(e) => this.props.changeTestView()} />
                        <FaList id="icon" onClick={(e) => this.props.changeTestView()} />
                    </span> */}
                    <div style={{ width: "84%", marginLeft: "8%" }}>
                        <div className="row">
                            <div className="col-4 search-test">

                                <div className="d-flex flex-row search-div" style={{ background: "#F5F5FA", height: "1.6rem" }}>
                                    <HiOutlineSearch id="icon" className="search-icon icon-media" style={{ marginTop: "1%", marginLeft: "5%" }} />
                                    <input className="search-input"
                                        type="text"
                                        placeholder="Search"
                                        onChange={(e) => this.search(e.target.value.toLowerCase())}>
                                    </input>
                                </div>
                            </div>
                            <div className="col-6" ></div>
                            <div className="col-2 dropdown-div div-sort-by" style={{ height: "1.6rem", paddingLeft: "0px" }} >

                                <Dropdown >
                                    <div onClick={(e) => this.setState({ open_sort_dropdown: !this.state.open_sort_dropdown })}>
                                        <Dropdown.Toggle className="dropdown-sort" id="dropdown-basic" style={{ height: "2vh", padding: "0px", marginTop: "-2vh", marginLeft: "1vh", color: "#BDBDC9", width: "100%", textAlign: "inherit" }}>

                                            <div className="div-dropdown" >Sort by</div>
                                            <div className="row-create-btn" >
                                                {!this.state.open_sort_dropdown ? <IoIosArrowForward style={{ marginLeft: "-22vh", marginTop: "-0.4vh" }} id="icons" className="icon-sort-by" />
                                                    : <IoIosArrowDown id="icons" style={{ marginLeft: "-22vh", marginTop: "-0.4vh" }} className="icon-sort-by" />}
                                            </div>
                                        </Dropdown.Toggle>
                                    </div>
                                    <Dropdown.Menu className="row" style={{
                                        background: "rgb(245, 245, 250)", position: "absolute",
                                        marginTop: "0.5vh", width: "23%", borderRadius: "0px", minWidth: "9.7rem"
                                    }}>
                                        <div style={{ borderTopStyle: "groove", width: "80%", marginLeft: "2.5vh" }}>
                                            {
                                                // this.props.displayTest == "all" &&
                                                // <DropdownButton id="dropdown-item-button" title="Teacher name">
                                                //     {this.props.teachersName.map(teacher => {
                                                //         return <Dropdown.Item as="button" onClick={(e) => this.sortBy(e, teacher)}>
                                                //             {teacher}</Dropdown.Item>
                                                //     })}
                                                // </DropdownButton>
                                            }
                                            <Dropdown.Item className="dropdown-create-new" style={{ marginTop: "-1vh", marginLeft: "2px" }} as="button" onClick={(e) => { e.preventDefault(); this.sortBy(e, "Date") }}>Date</Dropdown.Item>
                                            <Dropdown.Item className="dropdown-create-new" style={{ marginLeft: "2px" }} as="button" onClick={(e) => { e.preventDefault(); this.sortBy(e, "quiz") }}>Quiz</Dropdown.Item>
                                            <Dropdown.Item className="dropdown-create-new" style={{ marginLeft: "2px" }} as="button" onClick={(e) => { e.preventDefault(); this.sortBy(e, "survey") }}>Survey</Dropdown.Item>
                                            <Dropdown.Item className="dropdown-create-new" style={{ marginLeft: "2px" }} as="button" onClick={(e) => { e.preventDefault(); this.sortBy(e, "position") }}>Position</Dropdown.Item>
                                            {this.props.displayTest === "all" && <Dropdown.Item className="dropdown-create-new" style={{ marginLeft: "2px" }} as="button" onClick={(e) => this.sortBy(e, "Average")}>Average</Dropdown.Item>}
                                            {this.props.displayTest === "checked" && <Dropdown.Item className="dropdown-create-new" style={{ marginLeft: "2px" }} as="button" onClick={(e) => this.sortBy(e, "Mark")}>Mark</Dropdown.Item>}
                                            {/* <Dropdown.Item as="button" className="none-item"></Dropdown.Item> */}
                                        </div>
                                    </Dropdown.Menu>

                                </Dropdown>
                            </div>


                            {/* <HiOutlineSearch id="icon" className="search-icon" onClick={() => {
                                this.props.setIsOpenSearch(this.props.isOpenSearch);
                                this.setState({ clicked_search: true })
                            }} />
                        <div className="div-search">

                            // {!this.props.isOpenSearch && this.state.clicked_search ? this.search('') : ""}
                            {this.props.isOpenSearch &&
                                <input className="search-input"
                                    type="text" onChange={(e) => this.search(e.target.value)}>
                                        
                                    </input>
                            }
                        </div> */}
                        </div>
                    </div>
                    {/* </button> */}
                </div>
                <div className="list_view mt-2">
                    {this.displayTests()}
                </div>
                {/* {this.props.listView && <Link to={`/${this.props.userName}/add`} className="btn addButton tooltip" >
                    <h5 style={{ lineHeight: 1.7 }}>+</h5>
                    <span class="tooltiptext">Add Test</span>
                </Link>
                } */}
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestList)
