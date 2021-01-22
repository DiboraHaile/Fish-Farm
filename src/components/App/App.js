import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import fish from "./fish.png";

//import SearchBar from "../SearchBar/SearchBar";
import PondList from "../PondList/PondList";
import Pond from "../Pond/Pond"
import Header from "../Header/Header"

class App extends Component {
  constructor(props){
    super(props);
    // this.state = {proop : ""};
   }
  //  componentDidMount=() =>{
  //   let x = document.getElementsByClassName("App").style.opacity;
  //   x =0.2;
  //   this.setState({proop: x});
  //  }
  render() {
    
    return (
      <div className="App">
    <div className="header"> <Header/></div>
   <div className="main"> <Pond/></div>
   
  </div>
  

  
  

    );
  
}
}
//<SearchBar onClick={this.changeSortMethod}/>

export default App;

