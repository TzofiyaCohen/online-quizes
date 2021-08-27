import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './listView.css'
import { actions } from '../../store/actions'
import { IoClose } from 'react-icons/io5'
import { RiSuitcaseLine,RiDeleteBinLine } from 'react-icons/ri';
import { MdEdit, MdDelete, MdContentCopy, MdRestore } from 'react-icons/md'
import { confirmAlert } from 'react-confirm-alert';
import { BsLink45Deg } from 'react-icons/bs'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoIosList } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'

import imgURL from '../../assets/background-img/imgURLs'
import { Modal } from "react-bootstrap";
import iconQuiz from '../../assets/Group 21586.svg'
import iconServey from '../../assets/Group 21859.svg'
import iconPosition from '../../assets/Group 21858.svg'



function mapStateToProps(state) {
    return {
        displayTest: state.funnelReducer.displayTest,
        userName: state.funnelReducer.userName,
        selectedTest: state.funnelReducer.selectedTest,
        filteredTests: state.funnelReducer.filteredTests,
        solvedAdd2Contact: state.funnelReducer.solvedAdd2Contact,
        done: state.testReducer.done,
        missing: state.testReducer.missing,
        isCheckedTest: state.funnelReducer.isCheckedTest,
    };
}

const mapDispatchToProps = (dispatch) => ({
    selectTest: (add, testID) => dispatch(actions.selectTest({ add, testID })),
    setEmail: (value) => dispatch(actions.setEmail(value)),
    createContact: () => dispatch(actions.createContact()),
    deleteAddContact: (testID) => dispatch(actions.deleteAddContact(testID)),
    checkIfDone: () => dispatch(actions.checkIfDone()),
    setIsCheckedTest: (value)=> dispatch(actions.setIsCheckedTest(value)),
});

function submit() {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => alert('Click Yes')
            },
            {
                label: 'No',
                onClick: () => alert('Click No')
            }
        ]
    })
};

function ListView(props) {
    const [isShown, setIsShown] = useState(false);
    const { displayTest, userName, selectedTest, filteredTests } = props
    const [copy, setCopy] = useState(false)
    const [popUpCopyLink, setPopUpCopyLink] = useState(false)

    function popUpCopyLinkFunc() {
        props.checkIfDone()
        return (
            <Modal className="popUpAlert" id='popUpAlertId' show={popUpCopyLink} >
                <Modal.Header closeButton onClick={() => setPopUpCopyLink(false)}>
                </Modal.Header>
                <Modal.Body style={{ paddingTop: '0px', textAlign: 'center' }}>
                    <h1 style={{ marginTop: '7%', paddingRight: '7%', marginBottom: '0.1rem', color: '#343a40e0', paddingBottom: '3vh', fontSize: '1.2rem' }}>Are you sure you want to continue</h1>
                    <ul className='listStyle'>
                        <p style={{ marginBottom: '0rem', color: 'rgb(0 0 0 / 74%)' }}>{props.missing[0]}</p>
                        {props.missing.length > 0 && props.missing.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item != '' && index !== 0 ?
                                        <div>
                                            <li style={{ marginBottom: '0rem', color: 'red' }}>
                                                <span>{item}</span></li>
                                        </div> : ''}
                                </div>

                            )
                        })}
                    </ul>
                    {/* <p style={{ marginBottom: '0rem', color: 'rgb(0 0 0 / 74%)', fontSize: 'x-large' }}>Please Pay Attention That The Test Isn't Completed</p>
                    <p style={{ marginBottom: '0.1rem', color: 'rgb(0 0 0 / 74%)' }}>(mayby you didn't save the test)</p> */}
                    {/* <button className='btn btn-primary' onClick={() => setPopUpCopyLink(false)}>Close</button> */}
                </Modal.Body>
            </Modal>
        )
    }

    function addTocontact() {
        props.setEmail(props.solvedAdd2Contact.filter(el => el._id == props.testID)[0].email)
        props.createContact()
        props.deleteAddContact(props.testID)
    }

    return (
        <>
            <tr className="in-hover-tr" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}><td className="bd">
                
                <td id="td_check_test" style={{width:"3.5vw"}}>
                {(isShown||props.isCheckedTest)&&
                    <label className="lableInput">
                    
                        <input className="cb" name="select_test" type="checkbox" checked={selectedTest.includes(props.testID)}
                            value={props.testID} onChange={(e) => props.selectTest(e.target.checked, e.target.value)}>
                        </input>
                        <span></span>
                    </label>}
                </td>
                {props.kind == "quiz" && <td style={{paddingLeft:"0px"}}>   <img src={iconQuiz} style={{ width: "3vh", height: "3vh" }}/> </td>}
                {props.kind == "survey" && <td style={{paddingLeft:"0px"}}>   <img src={iconServey} style={{ width: "3vh", height: "3vh" }} /> </td>}
                {props.kind == "position" && <td style={{paddingLeft:"0px"}}> <img src={iconPosition} style={{ width: "3vh", height: "3vh" }} /></td>}
                <td id="innerTH" >
                    {(displayTest == "all") ?
                        <Link to={`/${userName}/edit/${props.testID}`} >{props.testName}</Link> :
                        displayTest == "to_check" ?
                            <Link to={`/${userName}/checkTest/${props.testID}`} > {props.testName}</Link> :
                            displayTest == "deleted" ? props.testName :
                                <Link to={`/${userName}/viewTest/${props.testID}`} > {props.testName}</Link>
                    }
                </td>
            </td>
                <td className="bd" style={{ textAlign: "center" }}>{props.lastOpened.slice(0, 10)}</td>

                {(displayTest == "all" || displayTest == "deleted") &&
                    <td className="bd" style={{ textAlign: "center" }}>{props.tested()}</td>}
                {(displayTest == "all" || displayTest == "deleted") &&
                    <td className="bd" style={{ textAlign: "center" }}>{
                        Number.isInteger(props.average()) ? props.average() : parseFloat(props.average()).toFixed(1)
                    }
                    </td>}
                {(displayTest == "all" || displayTest == "deleted") && <td className="bd" style={{ textAlign: "center" }}>{props.status}</td>}

                {(displayTest == "all" || displayTest == "deleted") &&
                    <td className="bd" style={{ textAlign: "center" }}>
                        <div className="wrap-icon-kind">
                            {/* {props.kind == "quiz" ?
                            <FiEdit className="icon-kind" id="icons" /> :
                            <RiSurveyLine className="icon-kind" id="icons" />} */}
                            <span className="toltip-kind">{props.kind}</span>
                        </div>

                    </td>}

                {(displayTest == "checked" && filteredTests.filter(el => el._id == props.testID).length > 0) &&
                    <td className="bd" style={{ textAlign: "center" }}>{filteredTests.filter(el => el._id == props.testID)[0].studentUserName}</td>}
                {(displayTest == "checked" && filteredTests.filter(el => el._id == props.testID).length > 0)
                    && < td className="bd" style={{ textAlign: "center" }}>
                        {props.kind !== "survey" ?
                            Number.isInteger(filteredTests.filter(el => el._id == props.testID)[0].grade) ?
                                filteredTests.filter(el => el._id == props.testID)[0].grade + '%' :
                                parseFloat(filteredTests.filter(el => el._id == props.testID)[0].grade).toFixed(1) + '%'
                            : "---"}
                        {/* {filteredTests.filter(el => el._id == props.testID) ? 
                    filteredTests.filter(el => el._id == props.testID)[0].grade : null} */}
                    </td>
                }

                {/* {isShown && (
                <div className="td_side_edit_delete">
                    {displayTest == "all" ?
                        <Link to={"/edit/" + props.testID}> <FaEdit id="icon" /></Link> :
                        displayTest == "to_check" ?
                            <Link to={`/${userName}/checkTest/${props.testID}`}> <FaEdit id="icon" /></Link> :
                            <Link to={`/${userName}/viewTest/${props.testID}`}> <FaEdit id="icon" /></Link>}

                    <BsTrash id="icon" onClick={() => { props.deleteTest() }} />
                </div>
            )} */}
                <th className="tr_side_edit_delete_copy">
                    <div className="td_side_edit_delete_copy pl-2">
                        {
                            isShown &&
                            (
                                <div >
                                    {displayTest == "all" &&
                                        <Link to={`/${userName}/edit/${props.testID}`}> <FiEdit3 id="icon" ></FiEdit3></Link>}
                                    {displayTest == "all" && <MdContentCopy className="mx-1" id="icon" onClick={() => { props.copyTest() }} />}
                                    {
                                        (displayTest == "all" || displayTest == "checked") &&
                                        <RiDeleteBinLine className="" id="icon" onClick={() => {
                                            confirmAlert({
                                                customUI: ({ onClose }) => {
                                                    return (
                                                        <div className="back-box">
                                                            <div className='custom-ui'>
                                                                <IoClose className="xicon" id="icons"
                                                                    onClick={() => onClose()}
                                                                />
                                                                <p>Do You Want To Remove The Test To Trash?</p>
                                                                <button className="cancel" onClick={onClose}>Cancel</button>
                                                                <button className="delete" onClick={() => {
                                                                    props.deleteTest()
                                                                    onClose()
                                                                }}>Delete</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            //     <div className="back-box">
                                            //     <div className='custom-ui'>
                                            //         <IoClose className="xicon" id="icons"
                                            //             onClick={() => onClose()}

                                            //         />
                                            //         <p>Do You Want To Delete The Test Forever?</p>
                                            //         <button className="cancel" onClick={onClose}>Cancel</button>
                                            //         <button className="delete" onClick={() => {
                                            //             props.deleteTest()
                                            //             onClose()
                                            //         }}>Delete</button>
                                            //     </div>
                                            // </div>
                                            // props.deleteTest()

                                        }} />

                                    }
                                    {displayTest == "all" &&
                                        <CopyToClipboard text={`https://quiz.leader.codes/${props.userName}/answerTest/${props.testID}`}
                                            onCopy={(e) => {
                                                setCopy(true)
                                                props.test.status === 'inprogress' && setPopUpCopyLink(true)
                                                setTimeout(() => {
                                                    setCopy(false)
                                                }, 3000);
                                            }
                                            }
                                        >
                                            {/* <div> */}
                                            <BsLink45Deg style={{height:"4vh"}} id="icon" />
                                            {/* {copy && <span className="px-3 alert-copy">Test Link Copied!</span>}
                                        </div> */}
                                        </CopyToClipboard>
                                    }
                                    <div d-flex flex-row>
                                        {
                                            displayTest == "deleted" &&
                                            <div className="wrap-tooltip1">

                                                <MdDelete className=" delete-icon" id="icon" style={{ marginTop: "-3" }} onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <div className="back-box">
                                                                    <div className='custom-ui'>
                                                                        <IoClose className="xicon" id="icons"
                                                                            onClick={() => onClose()}

                                                                        />
                                                                        <p>Do You Want To Delete The Test Forever?</p>
                                                                        <button className="cancel" onClick={onClose}>Cancel</button>
                                                                        <button className="delete" onClick={() => {
                                                                            props.deleteTest()
                                                                            onClose()
                                                                        }}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    // props.deleteTest()

                                                }} />
                                                <p className="tooltip-text-area" style={{ marginRight: "52%" }}>Delete Test</p>
                                            </div>

                                        }
                                        {
                                            displayTest == "deleted" &&
                                            <div className="wrap-tooltip1">
                                                <MdRestore id="icon" className=" delete-icon" style={{ marginLeft: "30%", marginTop: "-54%" }} onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <div className="back-box">
                                                                    <div className='custom-ui'>
                                                                        <IoClose className="xicon" id="icons"
                                                                            onClick={() => onClose()}
                                                                        />
                                                                        <p>Do You Want To <b>Restore</b> The Test?</p>
                                                                        <button className="cancel" onClick={onClose}>Cancel</button>
                                                                        <button className="restore" onClick={() => {
                                                                            props.restoreTest()
                                                                            onClose()
                                                                        }}>Restore</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })

                                                }} />

                                                <p className="tooltip-text-area" style={{ marginTop: "-25%", marginRight: "30%" }}>Restore Test</p>
                                            </div>

                                        }
                                    </div>
                                </div>
                            )

                        }
                    </div>
                </th >

            </tr >
            {popUpCopyLink && popUpCopyLinkFunc()}
        </>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView)

// { <td  onMouseLeave={() => setIsShown(false)} align="right">
// <td id="innerTH">
//     {isShown && (
//         <div>
//             {displayTest == "all" ?
//                 <Link to={"/edit/" + props.testID}> <FaEdit id="icon" /></Link> :
//                 displayTest == "to_check" ?
//                     <Link to={`/${userName}/checkTest/${props.testID}`}> <FaEdit id="icon" /></Link> :
//                     <Link to={`/${userName}/viewTest/${props.testID}`}> <FaEdit id="icon" /></Link>}
//             {displayTest == "all" && <RiFileCopyLine id="icon" onClick={() => { props.copyTest() }} />}
//             <BsTrash id="icon" onClick={() => { props.deleteTest() }} />
//         </div>
//     )}
// </td>

// <td id="innerTH" >
//     <FaEllipsisV style={{ color: "B1B1B1" }}
//         onMouseEnter={() => setIsShown(true)} />
// </td>
// </td>
// }