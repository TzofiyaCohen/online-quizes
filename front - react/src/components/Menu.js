import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { actions } from "../store/actions"
import Configurator from "./Configurator/Configurator"
import Top_frame from "./Top_frame/Top_frame"
import { GiHamburgerMenu } from 'react-icons/gi'
import TestList from "./TestList/TestList"
import EditTest from "./UpdateTest/UpdateTest"
import AddTest from "./AddTest/AddTest"
import AnswerTest from "./AnswerTest/AnswerTest"
import CheckTest from "./CheckTest/CheckTest"
import ViewTest from "./ViewTest/ViewTest"
import ProgressTest from "./ProgressTest/ProgressTest"
import ProtectedRoute from './ProtectedRoute'
import AlertButton from './AlertButton/AlertButton'

function mapStateToProps(state) {
    return {
        flagCon: state.funnelReducer.isOpenConfigurator,
        testInfo: state.funnelReducer.testInfo,
        answerTestInfo: state.funnelReducer.answerTestInfo,
        allDivsGrey: state.funnelReducer.allDivsGrey,
    };
}
const mapDispatchToProps = (dispatch) => ({
    updatedStatus: (value) => dispatch(actions.updatedStatus(value)),
    backToTestList: (value) => dispatch(actions.backToTestList(value)),
})


function Menu(props) {
    const [flag, setFlag] = useState(true);
    const { flagCon, testInfo, answerTestInfo } = props

    useEffect(() => {
        var win = window.onbeforeunload = confirmExit;
        function confirmExit() {
            return "show warning";
        }

        // var timer = setInterval(function () {
        //     if (win.closed) {
        //         clearInterval(timer);
        //         alert('closed');
        //     }
        // }, 1000);
    }, [])

    return (
        <Router >
            <div id="body" className="container-fluid">
                <Top_frame className="row"></Top_frame>
                <div className={props.allDivsGrey ? "grey row body-y" : "row body-y"}>
                    <Configurator className="col-md-2"></Configurator>
                    {/* <Sidebar_left></Sidebar_left> */}
                    <div id="wrap_center" className={flagCon ? "center_width_on_open_con d-flex justify-content-center" : "center_width_on_close_con  d-flex justify-content-center"} >
                        <div className="col-md-10" style={{ flex: "100%", maxWidth: "100%", paddingLeft: "27px" }}>
                            <GiHamburgerMenu className="burg-icon my-1 pointer" id="icon"
                                onClick={() =>
                                    document.getElementById('wrap-configurator').scrollIntoView({ block: 'end', behavior: "smooth" })
                                    // document.getElementsByClassName('body-y')[0].scrollIntoView({ block: 'start', behavior: "auto" })
                                } />

                            <Switch>
                                <ProtectedRoute path="/:userName/add/" component={ProgressTest} />
                                <ProtectedRoute path="/:userName/edit/:id" exact component={ProgressTest} />

                            </Switch>

                            <div id={testInfo ? "menu_info" : answerTestInfo ? "ans_info" : "menu"}
                                // className={testInfo ? "center mt-4 mb-1" : "center mt-4 mb-1"}>
                                className={props.allDivsGrey ? "grey center mt-4 mb-1" : "center mt-4 mb-1"}>
                                <Switch>
                                    <Route path="/:userName/answerTest/:id" exact component={AnswerTest} />
                                    <ProtectedRoute path="/:userName/edit/:id" exact component={EditTest} />
                                    <ProtectedRoute path="/:userName/add/:kind" exact component={AddTest} />
                                    <ProtectedRoute path="/:userName/CheckTest/:id" exact component={CheckTest} />
                                    <ProtectedRoute path="/:userName/viewTest/:id" exact component={ViewTest} />
                                    <ProtectedRoute path="/:userName" exact render={() => this.props.updatedStatus(false)} component={TestList} />
                                </Switch>
                            </div>
                        </div>
                        <Switch>
                            <ProtectedRoute path="/:userName/add/" component={AlertButton} />
                            <ProtectedRoute path="/:userName/edit/:id" exact component={AlertButton} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router >

    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)



