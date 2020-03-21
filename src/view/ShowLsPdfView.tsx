import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import axios from 'axios';

export interface CheckViewProperties {

}

const ShowLsPdfView = (props: CheckViewProperties) => {

    const handleClick = (e: any, filename: any) => {
        openPdf(filename);
    }

    // from data-uri: data:application/pdf;base64,JVBER....=
    // to: objectURL
    const dataURItoBlob = (dataURI: any) => {
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mime});
    }

    // retrieve filename from localStorage and Open as ObjectURL in new Tab
    const openPdf = (filename: string) => {
        const dataUri: string = window.localStorage.getItem(filename) as string;
        if (dataUri) {
            const blob = dataURItoBlob(dataUri);
            window.open(URL.createObjectURL(blob));
        }

    }

    const pdfList = [
        'Test1.pdf',
        'Test2.pdf',
        'Test3.pdf',
        'Test4.pdf',
    ];

    return (
        <List>
            {
            pdfList.map((item) => {
                const primaryText = "Download " + item;
                return <ListItem button onClick={(e) => handleClick(e, item)} key={item}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} />
                </ListItem>
            })
            }
        </List>
    );
};


export default ShowLsPdfView;