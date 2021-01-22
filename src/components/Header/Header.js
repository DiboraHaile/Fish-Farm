import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import {useState} from 'react';
import ReactDOM from 'react-dom';
import './Header.css'
import Pond from '../Pond/Pond'
import PondList from '../PondList/PondList';

import PondDetail from '../PondDetail/PondDetail';
import {Link} from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <div className = 'main'>
              <div className="logo">
  
  <div className="title"><h2>Pond Monitoring</h2></div>
  
  <div className= "tips"> <p> <Link to= "/Tips">Tips</Link> <Link to= "/">Home</Link></p></div>
  
 </div>
                </div>
             
        )}
    }


export default Header;