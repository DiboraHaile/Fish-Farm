import React from 'react';
import tick from './tick.jpg';
import cross from './cross.png';
import './PondCondition.css';



class PondCondition extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                pondOk : 1
            };
        }
componentDidMount = () => {
        let optimum_PH = (parseInt(this.props.pondPH) > 6.5 && parseInt(this.props.pondPH)<9);
        let optimum_Temp = (parseInt(this.props.pondTemp) < 85 && parseInt(this.props.pondTemp) > 60);
        let optimum_WL = (parseInt(this.props.pondUltr) > 10);
        if (!optimum_PH || !optimum_Temp || !optimum_WL)
        {
            this.setState({pondOk : 0});
        }
            else {
                this.setState({pondOk : 1});
            }
            
   }
    render(){    
        let pond_msg_c = ["Danger","Healthy"];    
        return(

    <div className= "pondCondition">
        
        <div className="msg"> {!(this.state.pondOk) && <text>In</text>} {pond_msg_c[parseInt(this.state.pondOk)]}
        <div className="image">
        {!(parseInt(this.state.pondOk)) ? (<img src={cross} className="cross" alt="cross"></img>):(<img src={tick} className="tick" alt="tick"></img>) }</div>
        </div>
        </div>
    
    
        );
    }
}

export default PondCondition;