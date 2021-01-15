import React from 'react';
import tick from './tick.jpg';
import cross from './cross.png';
import './PondCondition.css';

let pond_msg = ["Healthy","Danger"];
let pondCondMsg = "";
let pondOk = 0;
class PondCondition extends React.Component{
    render(){
        if ((parseInt(this.props.pondPH) > 6.5 && parseInt(this.props.pondPH)<9)  && (parseInt(this.props.pondUltr) > 10) && (parseInt(this.props.pondTemp) < 85 && parseInt(this.props.pondTemp) > 60))
            {
                pondOk = 1;
                pondCondMsg = pond_msg[0];
            }
        else {
            pondOk = 0;
            pondCondMsg = pond_msg[1];
        }
        return(



    <div className= "pondCondition">
        <div className="msg"> <p>{pondCondMsg}</p> 
        <div className="image">
        {(pondOk) && (<img src={tick} className="tick" alt="tick"></img>)}
        {(!pondOk) && (<img src={cross} className="cross" alt="cross"></img>)}
        </div>
        </div>
    </div>
    
        );
    }
}

export default PondCondition;