import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class Login extends React.Component{
    private personalid: String = "";

    constructor(pros:any){
        super(pros);
        this.sendLogin = this.sendLogin.bind(this);
    }
   

    sendLogin(){
        console.log(this.personalid);
    }
    
    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("te")
        console.log(e.target.value);
        this.personalid =  e.target.value;
    };


      
    render() {
        return (<div><TextField id="filled-basic" label="Personal-ID" variant="filled" onChange={this.onInputChange}/> 
                 <Button variant="contained" color="primary" onClick={this.sendLogin}>Disable elevation</Button></div>);
    }

}

