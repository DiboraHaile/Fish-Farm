import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import fish from "./fish.png";
//import SearchBar from "../SearchBar/SearchBar";
import PondList from "../PondList/PondList";
import Pond from "../Pond/Pond"


class App extends Component {
  constructor(props){
    super(props);
   }

  render() {
    return (
      <div className="App">
   <div className="logo">
  
   <div className="title"><h1>Pond Monitoring</h1></div>
   
   <div className= "tips"> <p> <a href= "/Tips">Tips</a></p></div>
  </div>
  <Pond/>
  <PondList ponds={ponds}/> 
  
</div>
    );
  }
}
//<SearchBar onClick={this.changeSortMethod}/>

export default App;

