import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Pond from '../Pond/Pond'
import PondList from '../PondList/PondList';
import Tips from '../Tips/Tips'
import PondDetail from '../PondDetail/PondDetail';


class Main extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <div className = 'main'>
                <Switch>
                <Route exact path='/' component={Pond}/>
                {/* both /roster and /roster/:number begin with /roster */}
                <Route path='/Tips' component={Tips}/>
                {/* <Route path='/schedule' component={Schedule}/> */}
                <Route path='/details' component={PondDetail}/>
                </Switch>
                </div>
             
        )}
    }


export default Main;