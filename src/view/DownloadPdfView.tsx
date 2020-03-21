import React from "react"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import axios from 'axios';

export interface CheckViewProperties {

}

const DownloadPdfView = (props: CheckViewProperties) => {

    const handleClick = () => {
        const pdfList = [
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
        <Container maxWidth="sm">
            <p>
                Das hier demonstriert das Herunterladen der 'Tickets' für den späteren Gebrauch. Offline.<br/>
                Klicke erst Download, dann gehe zur Open View
            </p>
            <Button variant="contained" onClick={() => handleClick()}>Download 3x PDF</Button><br/>
            <br/>
            <Button variant="outlined" href="/open">Gehe zur Open-View</Button>
        </Container>
    );
};


export default DownloadPdfView