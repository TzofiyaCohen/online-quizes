import React from 'react'
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import { Modal, Button } from "react-bootstrap";
import './alertButton.css'
import { IoMdAlert } from 'react-icons/io';


function mapStateToProps(state) {
    return {
        test: state.testReducer.test,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setPopUpAlertMissingInTest: (value) => dispatch(actions.setPopUpAlertMissingInTest(value)),
    setIsInAlertButton: (value) => dispatch(actions.setIsInAlertButton(value)),
})

function AlertButton(props) {
    return (
        props.test.status === 'inprogress' && <div className='wrapperAlertButton'>
            <div className='wrapperB pointer' onClick={() => {
                props.setIsInAlertButton(true);
                props.setPopUpAlertMissingInTest(true);
            }}>
                <div className='wrapperC'>
                    <div className='nearButtonAlert'></div>
                    <div className='buttonAlert'>
                        <IoMdAlert className='buttonAlertIcon'></IoMdAlert>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertButton)