import React from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import './PondDetailCard.css';
import PondHistory from '../PondHistory/PondHistory'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import PondDetailHeader from '../PondDetailHeader/PondDetailHeader';
import PondDetailBody from '../PondDetailBody/PondDetailBody'

class PondDetailCard extends React.Component{
    constructor(props){
      super(props);
      this.state = {pond_num:this.props.pond.pond_number,
                    
      };
      
    }
    render(){
        return(
<div className="card-d">

<PondDetailHeader pond_number={this.state.pond_num}/>
<PondDetailBody pond={this.props.pond} />
</div>
);
}
}

export default PondDetailCard;