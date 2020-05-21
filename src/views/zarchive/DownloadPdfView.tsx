import React from "react"
import Button from '@material-ui/core/Button';
import axios from 'axios';

export interface CheckViewProperties {

}

const DownloadPdfView = (props: CheckViewProperties) => {

    const handleClick = () => {
        [
            'Test1.pdf',
            'Test2.pdf',
            'Test3.pdf',
            'Test4.pdf',
        ].map(downloadPdfToLs)
    }

    const downloadPdfToLs = (id: any) => {
        const uri = `/pdf/${id}`;
        axios(uri, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(response => {
            //Create a Blob from the PDF Stream
            const blob = new Blob([response.data], {type: 'application/pdf'});

            var fr = new FileReader();
            fr.onload =
                function(e) {
                    const data = e?.target?.result as string;
                    window.localStorage.setItem(id, data || 'null');
                    console.log('saved to LS: ' + data);
                }
            fr.readAsDataURL(blob);

        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <p>
                Das hier demonstriert das Herunterladen der 'Tickets' für den späteren Gebrauch. Offline.<br/>
                Klicke erst Download, dann teste ob Open-View funktioniert und dann ob Render-View funktioniert.
            </p>
            <Button variant="contained" onClick={() => handleClick()}>Download 3x PDF</Button><br/>
            <br/>
            <Button variant="outlined" href="/open">Gehe zur Open-View</Button>
            <br/>
            <Button variant="outlined" href="/render">Gehe zur Render-View</Button>
        </div>
    );
};


export default DownloadPdfView