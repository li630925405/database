import React from 'react'
import RegistrationForm from "../component/login/registerComp";

class Register extends React.Component{
    render(){
        return(
            <div>
                <RegistrationForm history={this.props.history}/>
            </div>
        )
    }
}


export default Register;