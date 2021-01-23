import React from 'react';
import arrow from '../PondCard/arrow1.png';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './LineChart.css';
import PondActuator from '../PondActuator/PondActuator';
import PondCondition from '../PondCondition/PondCondition';
// import { TimeSeries, TimeRange } from "pondjs";
import Chart from "react-apexcharts";

class LineChart extends React.Component {
    constructor(props) {
      super(props);
      let ph = this.props.data.PH;
      let temp = this.props.data.Temprature;
      let wl = this.props.data.Water_Level;
      let time = this.props.data.Time_recorded;

      
      this.state = {
        options: {
          chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime',
            range: 5,
          },
          yaxis: {
            max: 100
          },
          legend: {
            show: false
          },
        },
          xaxis: {
            categories: time
          },
          stroke: {
            width: 3
          },
        
        series: [
          {
            name: "PH",
            data: ph
          },
          {
            name: "Temprature",
            data: temp
          },
          {
            name: "Water Level",
            data: wl
          },

        ]
      };
    }
  
    // componentDidMount() {
    //   this.setState({categories : {}})
    // }
  

    render() {
      return (
        
        <div className="pond_chart">
          <h3> Pond Sensor Reading Graph</h3>
          <div className="contain">
          
        <div className="app">
        <div className="row">
          <div className="mixed-chart">
            
  <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
          </div>
        </div>
      </div>
      </div>
      </div>

      );
    }
  }

 
  export default LineChart;


