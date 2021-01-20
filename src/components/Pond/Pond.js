import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './Pond.css';
import PondList from '../PondList/PondList';
import Tips from '../Tips/Tips'
import PondDetail from '../PondDetail/PondDetail';
import PondDetailCard from '../PondDetailCard/PondDetailCard'

import socket from '../SocketContext';
// var EventEmitter =require('events').EventEmitter;

let PondNumb = 1;
let pond={
  name: "Pond"+PondNumb,
  temprature: 0,
  ultrasonic: 0,
  ph: 0,
  time: "0:0:0"
};
let Ponds = [pond,pond,pond]

class Pond extends Component {
    constructor(props){
      super(props);
      this.state = {
          data: [],
          responseParsed: false,
          socketStatus : "On",

      };
      
    }
    componentWillUnmount(){
        socket.close()
        console.log("component unmounted");
    }
    componentDidMount = async() => {        
        socket.on('latestdata', (fromsocket) => {          
        this.setState({data: fromsocket});
        this.setState({responseParsed: true});
        });
        }
    render(){
        const { data, responseParsed} = this.state;
        return (
            <div className = 'main'>
                
                 <Switch>
                <Route exact path='/' render={() => (responseParsed ? (<PondList ponds = {data.datas} isAuthed={true} />): <p> Loading</p> )} />
                <Route path='/Tips' component={Tips}/>
                <Route path='/details-Pond:ID' render = {(props) => responseParsed ? (<PondDetailCard pond={data.datas[parseInt(props.match.params.ID)-1]} isAuthed={true}/> ):<p> Loading</p>}/>
                </Switch>             
            </div>
        )
    }
}

export default Pond;
