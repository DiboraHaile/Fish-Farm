import React from 'react';
import { Switch, Route,Link } from 'react-router-dom'
import './PondDetailBody.css';
import PondHistory from '../PondHistory/PondHistory'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import PondDetailHeader from '../PondDetailHeader/PondDetailHeader';
import PondDetail from '../PondDetail/PondDetail'
import './PondDetailBody.css'

class PondDetailBody extends React.Component{
    constructor(props){
      super(props);
      this.state = {pond_num:this.props.pond.pond_number};
    }
render(){
    return(
        <div className= "display-d">
<Switch>
<Route exact path={'/details-Pond'+this.state.pond_num} render = {()=> (<PondDetail pond={this.props.pond} isAuthed={true}/>)}/>
<Route path={'/details-Pond'+this.state.pond_num+'/History'} render = {()=> (<PondHistory pond={this.props.pond} isAuthed={true}/>)}/>
{/* <Route path='/details/Pond:ID' render = {(props) => responseParsed ? (<PondDetail pond={data[parseInt(props.match.params.ID)-1]} isAuthed={true}/>):<p> Loading</p>}/> */}
</Switch>  
</div>
    );
}
}

export default PondDetailBody;



