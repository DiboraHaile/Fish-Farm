import React from 'react';
import tick from './tick.jpg';
import cross from './cross.png';
import './PondActuator.css';


class PondActuator extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                PH_d: 0,
                Temp_d: 0,
                Water_Level_d: 0,
                pondok: 1
            };
        }
    componentDidMount =()=>{
        let optimum_PH = (parseInt(this.props.pondPH) > 6.5 && parseInt(this.props.pondPH)<9);
        let optimum_Temp = (parseInt(this.props.pondTemp) < 85 && parseInt(this.props.pondTemp) > 60);
        let optimum_WL = (parseInt(this.props.pondUltr) > 10);
        if (!optimum_PH || !optimum_Temp || !optimum_WL)
        {
            this.setState({pondOk : 0});
            if (!optimum_PH)
                {
                    this.setState({PH_d: 1});
                }
            if (!optimum_Temp)
            {
                this.setState({Temp_d: 1});
            }
            if (!optimum_WL){
                this.setState({Water_Level_d: 1});
            }
    }
        else {
            this.setState({pondOk : 1});
            this.setState({PH_d : 0});
            this.setState({Temp_d: 0});
            this.setState({Water_Level_d: 0});
        }
        
    }
    // RegulateCondition = () =>{

    // }
    render(){
        let pond_msg = ["Danger","Healthy"];
        // let pond_msg_color = ["red", "green"];
        // alert(this.state.pondok);
        return(

    <div className= "pondCondition-a">
        <div className="msg-a"> <h2 color="red"> The Pond is {!(parseInt(this.state.pondOk)) ? (<text>in Danger</text>) : (<text>Healthy</text>)}</h2> 
        <div className="image-a">
        {!(parseInt(this.state.pondOk)) ?(<img src={cross} className="cross" alt="cross"></img>):(<img src={tick} className="tick" alt="tick"></img>) }</div>
        </div>
         <div className = 'regulate'>
        {parseInt(this.state.PH_d) ? (<div> <p> The PH value of the pond needs to be regulated!</p>  </div>) : (<div><p>The Ph value is optimum</p></div>)}
        {parseInt(this.state.Temp_d) ? (<div> <p> The temprature value of the pond needs to be regulated!</p> <button type="submit" className="button"> Regulate Temprature</button> </div>) : (<div> <p>Temprature is optimum</p></div>)}
        {parseInt(this.state.Water_Level_d) ? (<div> <p> The Water level of the pond needs to be regulated!</p> <button type="submit" className="button"> Regulate Water Level</button> </div>) : (<div><p>Water level is optimum</p></div>)}
        </div>
        
    </div>
    
        );
    }
}

export default PondActuator;