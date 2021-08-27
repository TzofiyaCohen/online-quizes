import React from 'react';
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import ExportQuizContent from '../ExportQuizContent/ExportQuizContent'
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, Button, Form } from "react-bootstrap";
import { actions } from '../../store/actions'
import { connect } from 'react-redux';
import { BiPrinter } from 'react-icons/bi';
import './print.css'

function mapStateToProps(state) {
    return {
        modalPrint: state.funnelReducer.modalPrint,

    };
}

const mapDispatchToProps = (dispatch) => ({
    setModalPrint: () => dispatch(actions.setModalPrint()),
})

class ComponentToPrint extends React.Component {
    constructor() {
        super();
        this.state = {
            isOn: true,
        }
    }

    render() {
        return (
            <div className='print-source'>
                {/* <Modal id='print' className='modalPDF' show={this.state.isOn}>
                    <Modal.Header closeButton onClick={() => this.setState({ isOn: false })}>
                      
                    </Modal.Header>
                    <Modal.Body>
                        <ExportQuizContent />
                    </Modal.Body>
                </Modal> */}
                <ExportQuizContent />
            </div>
        );
    }
}

class Print extends React.Component {
    // constructor(props) {
    //   super(props)
    //   this.state = {
    //     flag: false,
    //   }
    // }
    state = {
        flag: false,
    }

    render() {
        console.log("state.flag", this.state.flag)
        return (
            <div>
                {/* <Modal
          onClose={this.props.setPrintDisplay}> */}
                <ReactToPrint
                    trigger={() => <Tooltip title="print" >
                        <BiPrinter style={{ width: '40px', height: '24px' }} id="icon"
                            //  style={{ marginLeft: '28%' }}
                            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20"><defs></defs><path
                                className="endICon" d="M17.5,7.5V3.018a1.251,1.251,0,0,0-.366-.884L15.366.366A1.25,1.25,0,0,0,14.482,0H3.75A1.25,1.25,0,0,0,2.5,1.25V7.5A2.5,2.5,0,0,0,0,10v4.375A.625.625,0,0,0,.625,15H2.5v3.75A1.25,1.25,0,0,0,3.75,20h12.5a1.25,1.25,0,0,0,1.25-1.25V15h1.875A.625.625,0,0,0,20,14.375V10A2.5,2.5,0,0,0,17.5,7.5ZM15,17.5H5V13.75H15Zm0-8.75H5V2.5h7.5V4.375A.625.625,0,0,0,13.125,5H15Zm1.875,2.813a.938.938,0,1,1,.937-.938A.938.938,0,0,1,16.875,11.563Z" transform="translate(0 0)" /></BiPrinter>
                    </Tooltip>}
                    content={() => this.componentRef}
                    onBeforeGetContent={() => this.setState({ flag: true })}

                />
                <div>
                    {/* flag={this.state.flag} */}
                    {this.state.flag && <ComponentToPrint ref={el => (this.componentRef = el)} />}
                </div>
            </div>

        );

    }

}

export default Print;
// export default connect(mapStateToProps, mapDispatchToProps)(Print,ComponentToPrint)