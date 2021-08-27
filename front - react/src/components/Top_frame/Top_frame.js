import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Top_frame.css'
import logo from '../../assets/leader_logo.png'
import thumbtack from '../../assets/thumbtack.svg'
import { actions } from '../../store/actions'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsLink45Deg } from 'react-icons/bs'
import ViewTest from '../ViewTest/ViewTest';
import AnswerTest from '../AnswerTest/AnswerTest';
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { VscHome } from 'react-icons/vsc'
import HeaderLeader from '@leadercodes/header'


function mapStateToProps(state) {
    return {
        flagConfig: state.funnelReducer.isOpenConfigurator,
        thumbtack: state.funnelReducer.thumbtack,
        userName: state.funnelReducer.userName,
        testID: state.testReducer.test.id,
        testListInfo: state.funnelReducer.testListInfo,
        test: state.testReducer.test,
        answerTest: state.funnelReducer.answerTestInfo,
        viewTest: state.funnelReducer.viewTest,
        done: state.testReducer.done,
        missing: state.testReducer.missing,
        allDivsGrey: state.funnelReducer.allDivsGrey,
        testInfo: state.funnelReducer.testInfo,
        viewTest: state.funnelReducer.viewTest,
        allTests: state.funnelReducer.allTests,
        popUpAlertMissingInTest: state.funnelReducer.popUpAlertMissingInTest,
        isInAlertButton: state.funnelReducer.isInAlertButton,
        done: state.testReducer.done,
    };
}

const mapDispatchToProps = (dispatch) => ({
    changeFlagConfigurator: (newFlag) => dispatch(actions.setFlagToggleCon(newFlag)),
    changeFlagThumbtack: (newFlag) => dispatch(actions.setFlagthumbtack(newFlag)),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setEInfoTestSubmit: (e) => dispatch(actions.setEInfoTestSubmit(e)),
    setToSubmitTest: (value) => dispatch(actions.setToSubmitTest(value)),
    setSaveWithPopUp: (value) => dispatch(actions.setSaveWithPopUp(value)),
    setWithoutEOnSave: (value) => dispatch(actions.setWithoutEOnSave(value)),
    backToTestList: (value) => dispatch(actions.backToTestList(value)),
    setIdQuestConfig: (value) => dispatch(actions.setIdQuestConfig(value)),
    setViewTest: (value) => dispatch(actions.setViewTest(value)),
    setBackToTestListFromView: (value) => dispatch(actions.setBackToTestListFromView(value)),
    setPopUpAlertMissingInTest: (value) => dispatch(actions.setPopUpAlertMissingInTest(value)),
    setIsInAlertButton: (value) => dispatch(actions.setIsInAlertButton(value)),
    setStatus: (status) => dispatch(actions.setStatus(status)),
    initialFilteredTest: (testList, displayTest) => dispatch(actions.initialFilteredTest({ testList, displayTest })),
})

function Top_frame(props) {
    const [copy, setCopy] = useState(false)
    const [popUpCopyLink, setPopUpCopyLink] = useState(false)

    useEffect(() => {
        props.checkIfDone()
        if (props.done)
            props.setStatus('completed');
        else
            props.setStatus('inprogress');
    }, [])

    function showTheQuestFromClickOnLi(str) {
        var indexStr = str.indexOf('question') + 9;
        if (indexStr != 8) {
            var questIndex = str.substr(indexStr, 1)
            // alert("index " + indexStr + " num " + questIndex)
            questIndex = Number(str.substring(indexStr, indexStr + 1))
            document.getElementsByClassName('div-question')[questIndex - 1].
                scrollIntoView({ block: 'center', behavior: "smooth" });
            props.setIdQuestConfig(questIndex - 1);
        }
    }

    function popUpCopyLinkFunc() {
        return (

            <Modal show={props.popUpAlertMissingInTest}
                dialogClassName='ModalLink'
                className='ModalLinkwrap'
                scrollable
                centered
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton onClick={() => { props.setPopUpAlertMissingInTest(false); props.isInAlertButton && props.setIsInAlertButton(false) }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Container class="container-fluid"><Row><Col style={{ textAlign: 'center', fontSize: 'large' }}> Are you sure you want to continue</Col></Row></Container>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid ModalLink">
                    <Container class="container-fluid">
                        <Row>
                            <Col style={{ textAlign: 'center', fontSize: 'large' }}>
                                {props.missing[0]}
                            </Col>
                        </Row>
                        {props.missing.length > 1 && props.missing.map((item, index) => {
                            return (
                                <ul>
                                    <Row key={index}>
                                        {item != '' && index != 0 ? <Col style={{ fontSize: 'small' }}>
                                            <li style={{ marginBottom: '0rem', color: 'red', textAlign: 'left' }}
                                                onClick={() => showTheQuestFromClickOnLi(item)}                                   >
                                                <span className='pointer'>{item}</span></li>
                                        </Col> : ''}
                                    </Row>
                                </ul>
                            )
                        })}
                    </Container>

                </Modal.Body>
                 <Modal.Footer style={{ justifyContent: 'center' }}>
                 {!props.isInAlertButton &&<Button variant="info"
                        onClick={(e) => { props.setPopUpAlertMissingInTest(false); setCopy(true); }}>
                        Ignore</Button>}
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            <div id="top_frame"
                className={props.allDivsGrey ? "grey row justified-content-between"
                    : "row justified-content-between"}
            // d-flex justify-content-between align-items-center
            >

                {/* quiz logo */}
                {!props.answerTest &&
                    <div className='topIconImgDiv pointer'
                        onClick={(e) => {
                            !props.viewTest &&
                                !props.testListInfo ?
                                props.backToTestList(true) &&
                                props.setToSubmitTest(true) &&
                                props.setEInfoTestSubmit(e) &&
                                props.setSaveWithPopUp(false) :
                                props.setBackToTestListFromView(true) &&
                                props.initialFilteredTest(props.allTests, "all")
                        }}
                    >
                        <img className='rounded-circle topIconImg' src={'https://files.codes/uploads/TzofiyaCohen/others/1621416343180__QUIZ.svg'} roundedCircle></img>
                    </div>}

                {/* home page - house icon */}
                {
                    !props.answerTest && <div className='topIconHomeDiv pointer'
                        onClick={(e) => {
                            !props.testListInfo && !props.viewTest ?
                                props.backToTestList(true) &&
                                props.setToSubmitTest(true) &&
                                props.setEInfoTestSubmit(e) &&
                                props.setSaveWithPopUp(false) :
                                props.setBackToTestListFromView(true) &&
                                props.initialFilteredTest(props.allTests, "all")

                        }}
                    >
                        <div className="wrap-tooltip1">
                            <VscHome className='topIconHome'></VscHome>
                            <p className="tooltip-text-area" style={{ marginTop: "1vh", marginRight: "5%" }}>Home Page</p>
                        </div>
                    </div>
                }
                <div className="">
                    {/* <img src={thumbtack} id="thumbtack" className={props.thumbtack ? "rotateThumbtack" : ""} onClick={() => props.changeFlagThumbtack(!props.thumbtack)} />

                <button id="menu2" className="material-icons align-middle pl-2 pointer btn btn-simple" onClick={!props.thumbtack && (() => props.changeFlagConfigurator(!props.flagConfig))}>
                    menu
                </button> */}

                </div>

                {
                    !props.testListInfo && !props.viewTest && !props.answerTest &&
                    <>
                        <CopyToClipboard text={`https://quiz.leader.codes/${props.userName}/answerTest/${props.testID}`}
                            onCopy={(e) => {
                                // setCopy(true)
                                props.setWithoutEOnSave(true);
                                props.setSaveWithPopUp(true);
                                props.setToSubmitTest(true);
                                props.setEInfoTestSubmit(e);
                                props.test.status === 'inprogress' && props.missing.length > 1 && props.setPopUpAlertMissingInTest(true)

                                setTimeout(() => {
                                    setCopy(false)
                                }, 3000);
                            }
                            }
                        >
                            <div className="linkCopydiv pointer">
                                <span className="linkCopyspan px-3">

                                    <span>{`https://quiz.leader.codes/${props.testID}`}</span>

                                    {/* <a href={`https://quiz.leader.codes/${props.userName}/answerTest/${props.testID}`}>{`https://quiz.leader.codes/${props.testID}`}</a> */}
                                </span>
                                <div className="linkCopyicon px-1">
                                    <BsLink45Deg id="icon" />
                                </div>
                                {copy && <span className="px-3 alert-copy">Test Link Copied!</span>}
                            </div>

                        </CopyToClipboard>
                    </>
                }

                <span
                    style={{
                        alignSelf: "center",
                        marginLeft: props.testListInfo || props.viewTest ? "auto" : null
                    }}
                    calssName="pointer">
                    <HeaderLeader appName={"quiz"} userName={props.userName} />
                </span>
            </div >

            {props.popUpAlertMissingInTest && popUpCopyLinkFunc()}
        </>


    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Top_frame)


