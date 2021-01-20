import React from 'react';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './PondDetail.css';
import PondActuator from '../PondActuator/PondActuator';
// import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import LineChart from '../LineChart/LineChart'
// import { TimeSeries, TimeRange } from "pondjs";
import PondDetailHeader from '../PondDetailHeader/PondDetailHeader';


class PondDetail extends React.Component{
    constructor(props){
      super(props);
    }
    
    render(){
       
        // alert(pond_num);
        return(
          
                    <div className="grid">
                    <div className="box sensor-reading-d">
                    <h3> Sensor Readings </h3>
                    <div className="sensor-info-d">
                    <p className="temp-d"> Temp <img src={temp} className="temp_img-d" alt="home"></img>{this.props.pond.Temp}c</p>
                    <p className="ultra-d"> Water Level <img src={ultra} className="ultra_img-d" alt="home"></img>{this.props.pond.Water_Level}m</p>
                    <p className="ph-d"> PH <img src={ph} className="ph_img-d" alt="home"></img>{this.props.pond.PH}</p>
                    </div>
                    <div className="Pond-actuator-history-d">
                        <p> Last time Updated at: {this.props.pond.Time_recorded}</p>
                    </div>
               </div>
               
               <div className="box graph">
                   
                <LineChart data = {this.props.spec_data}/>
               </div> 


               <div className="box condition-d">
               <PondActuator pondPH= {this.props.pond.PH} pondUltr = {this.props.pond.Water_Level} pondTemp = {this.props.pond.Temp}/>

               </div>



               <div className="box D"></div>
               <div className="box E"></div>
               <div className="box F"></div>
               <div className="box G"></div>
               <div className="box H"></div>
               <div className="box I"></div>
               <div className="box J"></div>
               <div className="box K"></div>
               <div className="box L"></div>
               <div className="box M"></div>
               <div className="box N"></div>
               <div className="box O"></div>
               <div className="box P"></div>
               <div className="box Q"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               <div className="box T"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               <div className="box T"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               

</div>

 
         );
        }
    }
export default PondDetail;