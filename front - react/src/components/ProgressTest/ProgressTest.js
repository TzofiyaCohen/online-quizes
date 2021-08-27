
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import AutosizeInput from 'react-input-autosize';
import "./progressTest.css"
import { Link } from "react-router-dom";
import { ImCheckmark } from 'react-icons/im'
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const mapStateToProps = (state) => {
    return {
        numStep: state.funnelReducer.numStep,
        done: state.testReducer.done,
        missing: state.testReducer.missing,
        withoutEOnSave: state.funnelReducer.withoutEOnSave,
        isClickUpdate: state.funnelReducer.isClickUpdate,
        done: state.testReducer.done,
    }
}
const mapDispatchToProps = (dispatch) => ({
    setNumStep: (value) => dispatch(actions.setNumStep(value)),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setEInfoTestSubmit: (e) => dispatch(actions.setEInfoTestSubmit(e)),
    setToSubmitTest: (value) => dispatch(actions.setToSubmitTest(value)),
    setSaveWithPopUp: (value) => dispatch(actions.setSaveWithPopUp(value)),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setIsClickUpdate: (val) => dispatch(actions.setIsClickUpdate(val)),
    setIdQuestConfig: (value) => dispatch(actions.setIdQuestConfig(value)),


});


function ProgressTest(props) {
    var checkIfDoneMsg = ""
    for (let i = 0; i < props.missing.length; i++) {
        if (props.missing[i] != "")
            checkIfDoneMsg += ` ${props.missing[i]}`
    }
    const [popUpCopyLink, setPopUpCopyLink] = useState(false);
    useEffect(() => {
        props.checkIfDone()
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

            <Modal show={popUpCopyLink}
                dialogClassName='ModalLink'
                className='ModalLinkwrap'
                scrollable
                centered
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton onClick={() => { setPopUpCopyLink(false)}}>
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
                    <Button variant="info"
                        onClick={(e) => { setPopUpCopyLink(false); props.setNumStep(3) }}>
                        Ignore</Button>
                </Modal.Footer>
            </Modal>
            // <Modal className="popUpAlert" id='popUpAlertId' show={popUpCopyLink} >
            //     <Modal.Header closeButton onClick={() => { setPopUpCopyLink(false) }}>
            //     </Modal.Header>
            //     <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
            //         <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '3vh', fontSize: '1.2rem' }}>Are you sure you want to continue</h1>
            //         <ul className='listStyle'>
            //             <p style={{ marginBottom: '0rem', color: 'rgb(0 0 0 / 74%)' }}>{props.missing[0]}</p>
            //             {props.missing.map((item, index) => {
            //                 return (
            //                     <div key={index}>
            //                         {item != '' && index != 0 ?
            //                             <div>
            //                                 <li style={{ marginBottom: '0rem', color: 'red', textAlign: 'left' }}
            //                                     onClick={() => showTheQuestFromClickOnLi(item)}
            //                                 >
            //                                     <span className='pointer' >{item}</span></li>
            //                             </div> : ''}
            //                     </div>

            //                 )
            //             })}
            //         </ul>
            //         <Button style={{ marginTop: '1rem' }} variant="warning" onClick={(e) => { setPopUpCopyLink(false); props.setNumStep(3) }}>Ignore</Button>
            //     </Modal.Body>
            // </Modal>
        )
    }

    return (
        <div className='progressTop justify-content-center text-center mt-3 align-items-center row '>
            <div className="div-item-process col-1 mx-1 px-1">
                <span onClick={() => props.setNumStep(1)}>
                    <Link
                        //    to="/Production"
                        className="itemStep"
                        style={{
                            // backgroundImage: (props.numStep == "1" || (!props.done && !props.isClickUpdate)) ? "" : props.done && props.isClickUpdate ? 'linear-gradient(rgb(2, 250, 250), rgb(100, 55, 84))' : '',
                            backgroundColor: (props.numStep == "1" || (!props.done && !props.isClickUpdate)) ? "" : props.done && props.isClickUpdate ? '#56D4DE' : '',
                            border: (props.numStep == "1" || (!props.done && !props.isClickUpdate)) ? "" : props.done && props.isClickUpdate ? 'none' : '',
                            color: (props.numStep == "1") ? "#56D4DE" : props.done && props.isClickUpdate ? "#FFFFFF" : '',
                            lineHeight: (props.numStep == "1" || (!props.done && !props.isClickUpdate)) ? "3.9vh" : props.done && props.isClickUpdate ? '4.5vh' : '3.9vh',
                            borderColor: (props.numStep == "1") ? "#56D4DE" : props.done && props.isClickUpdate ? "#787D91" : '#787D91'

                            //                             backgroundImage: 'linear-gradient(180deg, #F10808 , #0D3754)',
                            //                             border: 'none',
                            //                             color: "#FFFFFF",
                            //                             lineHeight: '4.5vh',
                            //                             // borderColor: props.numStep == "1" ? "" : "#787D91"

                        }}>
                        <span
                            className="justify-content-center align-items-center">
                            1
                            {/* {props.numStep == "1" ? '1' : <ImCheckmark className='mb-1' />} */}
                        </span>
                    </Link>
                </span>
                <div className="description-process">Production</div>
            </div>
            <div className="lineStep  col-1  p-0 m-0"
                style={{
                    backgroundImage: props.numStep != "1" ? 'linear-gradient(rgb(2, 250, 250), rgb(100, 55, 84))' : "",
                    backgroundColor: props.numStep == "1" ? '#787D91' : ""
                }}
            ></div>
            <div className="div-item-process col-1 mx-1 px-1">
                <span onClick={(e) => {
                    props.setNumStep(2);
                    props.setToSubmitTest(true);
                    props.setEInfoTestSubmit(e);
                    props.setSaveWithPopUp(false);
                    props.checkIfDone()
                }}>
                    <Link
                        //    to="/Production"
                        className="itemStep"
                        style={{
                            // backgroundImage: props.numStep != "2" && props.numStep != "1" ? 'linear-gradient(rgb(2, 250, 250), rgb(100, 55, 84))' : "",
                            backgroundColor: props.numStep != "2" && props.numStep != "1" ? '#56D4DE' : "",
                            border: props.numStep != "2" && props.numStep != "1" ? 'none' : "",
                            color: props.numStep == "2" ? "#56D4DE" : props.numStep != "1" ? "#FFFFFF" : "",
                            lineHeight: props.numStep != "2" && props.numStep != "1" ? "4.5vh" : '3.9vh',
                            //borderColor: props.numStep != "2" && props.numStep != "1" ? "" : "#787D91"
                            borderColor: props.numStep == "2" ? "#56D4DE" : '#787D91'
                        }}>

                        {/* style={{
                            backgroundImage: props.numStep != "1" ? 'linear-gradient(180deg, #F10808 , #0D3754)' : "",
                            border: props.numStep != "1" ? 'none' : "",
                            color: props.numStep != "1" ? "#FFFFFF" : "",
                            lineHeight: props.numStep != "1" ? '4.5vh' : "3.5vh",
                            borderColor: props.numStep != "1" ? "" : "#787D91"
                        }}> */}
                        <span
                            className="justify-content-center align-items-center">
                            2
                            {/* {props.numStep == "1" || props.numStep == "2" ? '2' : <ImCheckmark className='mb-1' />} */}
                        </span>
                    </Link>
                </span>
                <div className="description-process">Design</div>

            </div>
            <div className="lineStep col-1  p-0 m-0 " style={{
                backgroundImage: props.numStep != "1" && props.numStep != "2" ? 'linear-gradient(rgb(2, 250, 250), rgb(100, 55, 84))' : "",
                backgroundColor: props.numStep == "1" || props.numStep == "2" ? '#787D91' : ""

            }}
            ></div>
            {/* <span className='col-1 mx-1 px-1' onClick={() => props.setNumStep("3")}>
                <Link
                    //    to="/Production"
                    className="itemStep"
                    style={{
                        backgroundImage: props.numStep != "1" && props.numStep != "2" ? 'linear-gradient(180deg, #F10808 , #0D3754)' : "",
                        border: props.numStep != "1" && props.numStep != "2" ? 'none' : "",
                        color: props.numStep != "1" && props.numStep != "2" ? "#FFFFFF" : "",
                        lineHeight: props.numStep != "1" && props.numStep != "2" ? '6.2vh' : "5.2vh",
                        borderColor: props.numStep == "3" ? "" : "#787D91"
                    }}>
                    <span
                        className="justify-content-center align-items-center">
                        3
                    </span>
                </Link>
            </span>
            <div className="lineStep  col-2  p-0 m-0"
                style={{
                    backgroundImage: props.numStep == "4" ? 'linear-gradient(180deg, #F10808 , #0D3754)' : "",
                    backgroundColor: props.numStep != "4" ? '#787D91' : ""

                }}
            ></div> */}
            <div className="div-item-process col-1 mx-1 px-1">
                <span onClick={async (e) => {
                    props.done ? props.setNumStep(3)
                        && props.setToSubmitTest(true)
                        && props.setEInfoTestSubmit(e)
                        && props.setSaveWithPopUp(false)
                        :
                        // props.setNumStep("3")
                        props.setToSubmitTest(true)
                        && props.setEInfoTestSubmit(e)
                        && props.setSaveWithPopUp(false)
                        // && alert(`${checkIfDoneMsg}`)
                        && setPopUpCopyLink(true)
                    // && await popUpCopyLinkFunc()

                }} >
                    {/* <span className='px-1 mx-1' onClick={() => { props.setNumStep("4") }} > */}

                    <Link
                        //    to="/Production"
                        className="itemStep"
                        style={{
                            backgroundImage: "",
                            border: "",
                            color: props.numStep == "3" ? "#56D4DE" : "",
                            lineHeight: "3.9vh",
                            borderColor: props.numStep == "3" ? "#56D4DE" : "#787D91"
                        }}>
                        {/*   style={{
                            backgroundImage: props.numStep == "3" ? 'linear-gradient(180deg, #F10808 , #0D3754)' : "",
                            border: props.numStep == "3" ? 'none' : "",
                            color: props.numStep == "3" ? "#FFFFFF" : "",
                            lineHeight: props.numStep == "3" ? '4.5vh' : "3.5vh",
                            borderColor: props.numStep == "3" ? "" : "#787D91"
                        }}> */}
                        <span
                            className="justify-content-center align-items-center">3
                            {/* {props.numStep == "1" || props.numStep == "2" || props.numStep == "3" || props.numStep == "4" ? '4' : <ImCheckmark className='mb-1' />} */}

                        </span>
                    </Link>

                </span>
                <div className="description-process">Conversion</div>
                {popUpCopyLink && popUpCopyLinkFunc()}
            </div>
        </div >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressTest);




