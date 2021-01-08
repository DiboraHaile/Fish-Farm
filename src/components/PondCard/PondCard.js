import React from 'react';
import arrow from './arrow1.png';
import ultra from './ultra.svg';
import ph from './ph.svg';
import temp from './temp.png';
import './PondCard.css';
import PondCondition from '../PondCondition/PondCondition'


class PondCard extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <div class="Pond">
 
  
  <div className="Pond-information">
    <div className="Pond-sensor-readings">
    <div className="arrow">
    <a href={arrow}><img src={arrow} className="arrow" alt="home"></img></a>
    </div>
      <h2>{this.props.pond.name}</h2>
      <div className="sensor-info">
      <p className="temp"> <img src={temp} className="temp_img" alt="home"></img>{this.props.pond.temprature}c</p>
      <p className="ultra"> <img src={ultra} className="ultra_img" alt="home"></img>{this.props.pond.ultrasonic}m</p>
      <p className="ph"> <img src={ph} className="ph_img" alt="home"></img>{this.props.pond.ph}</p>
      </div>
    </div>
    <div className="Pond-actuator-history">
      <p> Updated at: {this.props.pond.time}</p>
    </div>
    <hr></hr>
    <div className="pond_healthy">
  
  
    <PondCondition pondPH= {this.props.pond.ph} pondUltr = {this.props.pond.ultrasonic} pondTemp = {this.props.temprature}/>

    
    
    
    </div>
    
  </div>
</div>
        );
    }
}

export default PondCard;