import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './Pond.css';
import PondList from '../PondList/PondList';
import Tips from '../Tips/Tips'
import PondDetail from '../PondDetail/PondDetail';

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
        // 
        let response = await fetch('http://127.0.0.1:5000/');
        let responseText = await response.text();
        let parsedJSON = await JSON.parse(responseText);
        this.setState({data:parsedJSON.datas});
        this.setState({responseParsed:true});
        
    }
    
    render(){
        const { data, responseParsed} = this.state;
        console.log(data);
        return (
            <div className = 'main'>
                 <Switch>
                <Route exact path='/' render={() => (responseParsed ? (<PondList ponds = {data} isAuthed={true} />): <p> Loading</p> )} />
                <Route path='/Tips' component={Tips}/>
                <Route path='/details' render = {() => <PondDetail ponds={data}/>}/>
                </Switch>             
            </div>
        )
    }
}

export default Pond;