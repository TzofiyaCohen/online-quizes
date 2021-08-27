import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FaList, FaSave, FaFilePdf } from 'react-icons/fa';
import ExportQuizContent from '../ExportQuizContent/ExportQuizContent'


// import Content from './content.jsx';

class PDFdocument extends React.Component {
    pdfExportComponent;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.download &&
                    <div className="example-config mb-2">
                        <button className="btn btn-primary"
                            //  style={{ border: "inherit", backgroundColor: "inherit", color: "inherit" }}
                            onClick={() => { this.pdfExportComponent.save(); }}>
                            Download
                    </button>
                    </div>}

                {this.props.content &&
                    <PDFExport
                        keepTogether="p"
                        paperSize="A4"
                        margin="2cm"
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <ExportQuizContent />
                    </PDFExport>}
            </div>
        );
    }
}


export default PDFdocument

