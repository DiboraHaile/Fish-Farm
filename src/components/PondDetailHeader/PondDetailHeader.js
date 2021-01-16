import React from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import arrow from '../PondCard/arrow1.png';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './PondDetailHeader.css';
import PondActuator from '../PondActuator/PondActuator';
import PondCondition from '../PondCondition/PondCondition';
import Pond from '../Pond/Pond'
import PondHistory from '../PondHistory/PondHistory'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

class PondDetailHeader extends React.Component{
    constructor(props){
      super(props);
      this.state = {pond_num:this.props.pond_number};
    }
    render(){
        return(
            
            <div className= "header-d">
                <h1>Pond {this.state.pond_num}</h1>
                <div className= "link-d"> 
                <p> 
                    <Link to= {'/details-Pond'+this.state.pond_num}>Current Reading | </Link>
                    <Link to= {'/details-Pond'+this.state.pond_num+'/History'}>History</Link>
                </p>
                </div>
                </div>
        )
    }
}
export default PondDetailHeader;