import React from "react"
import Cookies from 'universal-cookie';


export interface CheckViewProperties {

}

const CheckView = (props: CheckViewProperties) => {
    const cookies = new Cookies();
    console.log(cookies.get("hashPersonalID"))
    return (
    <h2>{cookies.get("firstname")}</h2>
    );
};


export default CheckView