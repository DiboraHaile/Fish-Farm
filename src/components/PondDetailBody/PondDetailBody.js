import React from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import './PondDetailBody.css';
import PondHistory from '../PondHistory/PondHistory'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import PondDetailHeader from '../PondDetailHeader/PondDetailHeader';
import PondDetail from '../PondDetail/PondDetail'
import './PondDetailBody.css';
import socketIOClient from "socket.io-client";
import Pond from "../Pond/Pond";
import socket from '../SocketContext';

class PondDetailBody extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        pond_num:this.props.pond.pond_number,
        data :{},
      responseParsed: false};
      
    }
    componentDidMount = async() => {     
      socket.emit('arrowclicked', this.state.pond_num);
      socket.on('specdata', (fromsocket) => {
      this.setState({data: fromsocket});
      this.setState({responseParsed: true});
      });
      }
    
render(){
    return(
        <div className= "display-d">
<Switch>
<Route exact path={'/details-Pond'+this.state.pond_num} render = {()=> this.state.responseParsed ? (<PondDetail pond={this.props.pond} spec_data={this.state.data} isAuthed={true}/>) : <p> Loading </p> }/>
<Route path={'/details-Pond'+this.state.pond_num+'/History'} render = {()=> this.state.responseParsed ? (<PondHistory spec_data={this.state.data} isAuthed={true}/>)  : <p> Loading </p>}/>
</Switch>  
</div>
    );
}
}

export default PondDetailBody;



