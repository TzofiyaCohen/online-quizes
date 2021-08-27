import React, { useState, useEffect } from 'react';
import "./tableView.css"
import { actions } from '../../store/actions'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEllipsisV, FaEdit } from 'react-icons/fa';
import { RiFileCopyLine } from 'react-icons/ri';
import { BsTrash } from 'react-icons/bs'

function mapStateToProps(state) {
    return {
        displayTest: state.funnelReducer.displayTest,
        userName: state.funnelReducer.userName,
        selectedTest: state.funnelReducer.selectedTest,
    };
}

const mapDispatchToProps = (dispatch) => ({
    selectTest: (add, testID) => dispatch(actions.selectTest({ add, testID })),
})

function TableView(props) {
    const { displayTest, userName, selectedTest } = props

    const [isShown, setIsShown] = useState(false);

    return (

        <Link to={displayTest == "all" ? `/${userName}/edit/${props.testID}`
            : displayTest == "to_check" ? `/${userName}/checkTest/${props.testID}`
                : `/${userName}/viewTest/${props.testID}`}
            style={{ color: "black" }}>

            <Card id="card">
                <Card.Body style={{ backgroundColor: "#EFF0F2", }}>
                    <div className="row justify-content-between" style={{ justifyContent: "flex-end" }}
                        onMouseLeave={() => setIsShown(false)} align="right" >
                        <input className="cb" name="select_test" type="checkbox" checked={selectedTest.includes(props.testID)}
                            value={props.testID} onClick={(e) => { e.preventDefault(); props.selectTest(e.target.checked, e.target.value); }}>
                        </input>
                        {isShown && (
                            <div style={{ width: "30%" }}>
                                <Link to={`/${userName}/edit/${props.testID}`}> <FaEdit id="icon" /></Link>
                                {displayTest == "all" && <RiFileCopyLine id="icon" onClick={(e) => { e.preventDefault(); props.copyTest() }} />}
                                <BsTrash id="icon" onClick={(e) => { e.preventDefault(); props.deleteTest() }} />
                            </div>
                        )}
                        <FaEllipsisV style={{ color: "B1B1B1" }}
                            onMouseEnter={() => setIsShown(true)} />
                    </div>
                    <div style={{ textAlign: "center" }}>{props.testName}</div>

                </Card.Body>
                <Card.Footer className="card-footer">
                    <p style={{ margin: "0px" }}><small style={{ color: "#8181A5" }}>Last Opened {props.lastOpened.slice(0, 10)}</small></p>
                    {displayTest == "all" && <p style={{ margin: "0px" }}>
                        <small style={{ color: "#8181A5" }}>Tested {props.tested()}</small></p>}
                    {displayTest == "all" && <p style={{ margin: "0px" }}>
                        <small style={{ color: "#8181A5" }}>Average {props.average()}</small></p>}
                </Card.Footer>
            </Card>
        </Link >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView)

