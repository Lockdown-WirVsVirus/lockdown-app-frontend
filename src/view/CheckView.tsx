import React, {useEffect} from "react"
import Cookies from 'universal-cookie';
import {TicketPayload, Address} from "../gen-backend-api/api";
import TicketFacade from "../service/TicketFacade";
import axios from 'axios';
import { Document, pdfjs, Page } from "react-pdf";
import Header from "./Components/Header";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${ pdfjs.version }/pdf.worker.js`
export interface CheckViewProperties {

}

const CheckView = (props: CheckViewProperties) => {
    const cookies = new Cookies();
    
    const [requestReason, setRequestReason] = React.useState<Blob | null>();



    const dataURItoBlob = (dataURI: any) => {
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mime});
    }


    const getNameById  = () => {
        return axios.get("./pdf/Test1.pdf")
            .then(response => {
              return setRequestReason( new Blob(response.data))
            })
        }
    useEffect(() => {
        const payload: TicketPayload = {
            arrivalTime: new Date().getTime(),
            finishPosition: {} as Address,
            hashIdentityNumber: '234234234',
            leaveTime: new Date().getTime(),
            reason: 'family',
            signature: 'wrwerwer',
            startPosition: {} as Address,
            userPin: 1232
        } as unknown as TicketPayload
        TicketFacade.createTicket(payload).then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }, [])
    return (
        <div>
        <Document file="/pdf/Test1.pdf"  onSourceSuccess={() => {
                console.log("Source success")
              }}><Page pageNumber={1}
              height={600}
              className="PDFPage PDFPageOne"/></Document>
      </div>
    );
};


export default CheckView