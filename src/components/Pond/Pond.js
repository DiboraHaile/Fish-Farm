import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './Pond.css';
import PondList from '../PondList/PondList';
import Tips from '../Tips/Tips'
import PondDetail from '../PondDetail/PondDetail';
import PondDetailCard from '../PondDetailCard/PondDetailCard'
// import { io } from 'socket.io-client';
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
          responseParsed: false
      };
    }
    componentDidMount = async() => {
        // let emitter = new EventEmitter();
        // const socket = io('http://127.0.0.1:5000/');
        // // emitter.on('')
        // socket.on('connect', (data) => {
        //     console.log('a user connected');
            
        //   });
        let response = await fetch('http://127.0.0.1:5000/');
        let responseText = await response.text();
        let parsedJSON = await JSON.parse(responseText);
        this.setState({data:parsedJSON.datas});
        this.setState({responseParsed:true});
        // var today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        
    }
    
    render(){
        const { data, responseParsed} = this.state;
        return (
            <div className = 'main'>
                
                 <Switch>
                <Route exact path='/' render={() => (responseParsed ? (<PondList ponds = {data} isAuthed={true} />): <p> Loading</p> )} />
                <Route path='/Tips' component={Tips}/>
                <Route path='/details-Pond:ID' render = {(props) => responseParsed ? (<PondDetailCard pond={data[parseInt(props.match.params.ID)-1]} isAuthed={true}/>):<p> Loading</p>}/>
                </Switch>             
            </div>
        )
    }
}

export default Pond;