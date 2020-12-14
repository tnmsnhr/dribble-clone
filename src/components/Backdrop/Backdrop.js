import React from 'react'
import { withRouter } from 'react-router-dom'

const Backdrop = (props) => {

    const clickHandler = ()=>{
        props.history.goBack()
    }

    return (
        <div>
            {props.show ? <div className='backdrop' onClick={props.clicked? props.clicked:clickHandler}></div>:null}
        </div>
    )
    
}

export default withRouter(Backdrop);
