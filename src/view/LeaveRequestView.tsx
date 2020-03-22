import React from "react"
import Cookies from 'universal-cookie';


export interface LeaveRequestViewProperties {

}

const LeaveRequestView = (props: LeaveRequestViewProperties) => {
    const cookies = new Cookies();
    console.log(cookies.get("hashPersonalID"))

    return (
        <h2>{cookies.get("firstname")}</h2>
    );
};


export default LeaveRequestView