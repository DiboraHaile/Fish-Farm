import React from 'react';
import {Link} from 'react-router-dom';
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
    <div className="div-arrow">
    <Link to = '/details'><img src={arrow} className="arrow" alt="home"></img></Link>
    </div>
      <h2>Pond {this.props.pond.pond_number}</h2>
      <div className="sensor-info">
      <p className="temp"> <img src={temp} className="temp_img" alt="home"></img>{this.props.pond.Temp}c</p>
      <p className="ultra"> <img src={ultra} className="ultra_img" alt="home"></img>{this.props.pond.Water_Level}m</p>
      <p className="ph"> <img src={ph} className="ph_img" alt="home"></img>{this.props.pond.PH}</p>
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