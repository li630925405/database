import React from 'react'
import ModifyForm from "../component/login/UserModifyComp";


class Modify extends React.Component{
    render(){
        return(
            <div>
                <ModifyForm history={this.props.history}/>
            </div>
        )
    }
}


export default Modify;