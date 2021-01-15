import React from 'react';
import arrow from '../PondCard/arrow1.png';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './Tips.css';
import PondCondition from '../PondCondition/PondCondition'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Tips extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <div class="Tips">
               Tips
 </div>
         );
        }
    }
export default Tips;