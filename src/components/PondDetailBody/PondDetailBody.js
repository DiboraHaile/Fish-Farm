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
      this.state = {
        pond_num:this.props.pond.pond_number,
        data :{},
      responseParsed: false};
      
    }
    componentDidMount = async() => {
        let url = 'http://127.0.0.1:5000/details-Pond?x='+this.state.pond_num;
        let response = await fetch(url); 
        let responseText = await response.text();
        let parsedJSON = await JSON.parse(responseText);
        this.setState({data:parsedJSON});
        this.setState({responseParsed:true});
        
        
    }
render(){
    return(
        <div className= "display-d">
<Switch>
<Route exact path={'/details-Pond'+this.state.pond_num} render = {()=> this.state.responseParsed ? (<PondDetail pond={this.props.pond} spec_data={this.state.data} isAuthed={true}/>) : <p> Loading </p> }/>
<Route path={'/details-Pond'+this.state.pond_num+'/History'} render = {()=> this.state.responseParsed ? (<PondHistory pond={this.props.pond} spec_data={this.state.data} isAuthed={true}/>)  : <p> Loading </p>}/>
{/* <Route path='/details/Pond:ID' render = {(props) => responseParsed ? (<PondDetail pond={data[parseInt(props.match.params.ID)-1]} isAuthed={true}/>):<p> Loading</p>}/> */}
</Switch>  
</div>
    );
}
}

export default PondDetailBody;



