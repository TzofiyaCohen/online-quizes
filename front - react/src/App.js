import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';

//import TestList from "./components/TestList.component"
import TestList from "./components/TestList/TestList"
// import EditTest from "./components/EditTest.component"
import EditTest from "./components/UpdateTest/UpdateTest"
//import AddTest from "./components/AddTest.component"
import AddTest from "./components/AddTest/AddTest"
// import StudentTestList from "./components/StudentTestList"
// import AnswerTest from "./components/AnswerTest"
import AnswerTest from "./components/AnswerTest/AnswerTest"
// import CheckTest from "./components/CheckTest"
import CheckTest from "./components/CheckTest/CheckTest"
import Configurator from "./components/Configurator/Configurator"
import Top_frame from "./components/Top_frame/Top_frame"
import Sidebar_left from "./components/Sidebar_left/Sidebar_left"
import ViewTest from "./components/ViewTest/ViewTest"
import Login from "./components/Register"
import ProgressTest from "./components/ProgressTest/ProgressTest"
import ProtectedRoute from './components/ProtectedRoute'
import { GiHamburgerMenu } from 'react-icons/gi'
import Menu from './components/Menu'

function mapStateToProps(state) {
  return {
    flagCon: state.funnelReducer.isOpenConfigurator,
    testInfo: state.funnelReducer.testInfo,
    answerTestInfo: state.funnelReducer.answerTestInfo,
  };
}

function App(props) {
  const [flag, setFlag] = useState(true);
  const { flagCon, testInfo, answerTestInfo } = props
  // useEffect(() => {
  //   window.onbeforeunload = confirmExit;
  //   function confirmExit() {
  //     return "show warning";
  //   }
  // }, [])


  // useEffect(() => {
  //   window.onbeforeunload = confirmExit;
  //   function confirmExit() {
  //     return "show warning";
  //   }
  // }, [])

  return (
    <Router>
      <Switch>
        <Route path="/:userName" component={Menu} />
        <ProtectedRoute exact path="/" component={TestList} />
      </Switch>


      {/* <div id="body" className="container-fluid"> */}
      {/* <Top_frame className="row"></Top_frame> */}
      {/* <div className="row body-y"> */}
      {/* <Configurator className="col-md-2"></Configurator> */}
      {/* <div id="wrap_center" className={flagCon ? "center_width_on_open_con d-flex justify-content-center" : "center_width_on_close_con  d-flex justify-content-center"} > */}
      {/* <div className="col-md-10"> */}
      {/* <GiHamburgerMenu className="burg-icon my-1 pointer" id="icon" */}
      {/* onClick={() => */}
      {/* document.getElementById('wrap-configurator').scrollIntoView({ block: 'end', behavior: "smooth" }) */}
      {/* // document.getElementsByClassName('body-y')[0].scrollIntoView({ block: 'start', behavior: "auto" }) */}
      {/* } /> */}

      {/* <Switch>
        <ProtectedRoute path="/:userName/add" exact component={ProgressTest} />
        <ProtectedRoute path="/:userName/edit/:id" exact component={ProgressTest} />
      </Switch>

      <div id={testInfo ? "menu_info" : answerTestInfo ? "ans_info" : "menu"}
        className={testInfo ? "center mt-4 mb-1" : "center mt-4 mb-1"}>
        <Switch>
          <Route path="/:userName/answerTest/:id" exact component={AnswerTest} />
          <ProtectedRoute path="/:userName/edit/:id" exact component={EditTest} />
          <ProtectedRoute path="/:userName/add" exact component={AddTest} />
          <ProtectedRoute path="/:userName/CheckTest/:id" exact component={CheckTest} />
          <ProtectedRoute path="/:userName/viewTest/:id" exact component={ViewTest} />
          <ProtectedRoute path="/:userName" exact component={TestList} />
        </Switch>
      </div> */}
      {/* </div> */}
      {/* // </div> */}
      {/* // </div> */}
      {/* // </div> */}
    </Router >
  );
}
export default connect(mapStateToProps)(App)


