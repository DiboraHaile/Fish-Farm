import React from 'react';
import arrow from '../PondCard/arrow1.png';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './Tips.css';
import PondCondition from '../PondCondition/PondCondition'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShowMore from 'react-show-more';

class Tips extends React.Component{
    constructor(props){
      super(props);
    }
    handleScroll = e => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          // do something at end of scroll
        }
      }
    render(){
        return(
            <div class="Tips">
              
       <h2 className = 'header-tips'>Water Quality Management for Fish Farms</h2>
       <div className="tips-card">
           <div className="show_more">
           <img src={require('./tempfish.jpeg')} />
       <ShowMore
                lines={3}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
            
       <p className = 'text'>
        <p>Temperature as a water quality parameters is more important than you think as it directly affects the amount of oxygen that can be dissolved in water but also the growth of organisms and bacteria that can cause disease.</p>
        <br></br>
        <p> Temperature also controls the rate at which food is transformed into energy which then in turn affects breathing, food intake, bodily growth and physiological behavior. An increase in temperature will decrease the dissolved oxygen content in water which will in turn increase the fish metabolic rate and its demand for oxygen.</p>
        <br></br>
         <p>    Any organisms or bacteria also in the water will then be competing for the limited supply of dissolved oxygen hence causing stress, limited growth, stress and an increase in carbon dioxide.</p> </p>
      
      </ShowMore>
       </div>
      </div>
      <div className='tips-card'>
      <div className="show_more">
      <img src={require('./phrange.png')} />
      <ShowMore
                lines={3}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
      <p className = 'text'>
      <p>The recommended pH range for fish and vertebrates is between 7.0 and 8.0 as the average blood pH is around 7.4.
      With water passing through the fishs gills and skin they are susceptible to changes in pH. Fish therefore become
      stressed if pH falls outside the pH5-10 range. pH does vary throughout the day and depends on the oxygen demand in
      the water and photosynthesis. CO2 is also released overnight hence lowering pH by morning but rises to its peak in
      the afternoon when CO2 consumption by algae (photosynthesis) is at is peak.
      </p>
      <br></br>
      <p>The pH of the water aquatic organisms live in affects the concentrations of dissolved substances, the physiological
      functioning of the animals, and the other plants and animals in the environment that provide food and oxygen to the
      ecosystem. Fish have a reduced capacity to carry oxygen if pH levels fall to critical levels but if the pH goes
      critically high, the portion of ammonia that is toxic also increases.
      </p>
      <br></br>
      <p>Online sensors can provide the data required to effectively monitor and control pH levels but a combined multiparameter
      instrument measuring pH, conductivity, dissolved oxygen or indeed the BOD such as the Manta+ water quality sonde can
      provide the basis for an excellent water quality monitoring and control system.
      </p> 
      </p>
      </ShowMore>
      </div>
      </div>
      <div className='tips-card'>
      <div className="show_more">
      <img src={require('./do.jpeg')} className="img-link" />
      <ShowMore
                lines={3}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
      <p className = 'text'>
      <p>Dissolved Oxygen (DO) is considered by most to be the most important water quality parameter to in aquaculture. Depending
      on the size and type of fish farm, DO levels can change very quickly indeed and can therefore endanger the lives of the
      fish in a matter of minutes or hours. The main problems with maintaining a suitable level of dissolved oxygen in fish
      farm applications is that oxygen is not very soluble in water and takes a lot of oxygenating to keep these levels;
      oxygen naturally diffuses to the atmosphere and the demand for oxygen is un-naturally higher in fish farm application
      than in the natural environment purely due to the stocking density of the fish farm.
      </p>
      <br></br>
      <p>
      Although fish can tolerate a drop in dissolved oxygen below 5-6 mg/L for short periods of time, it will lead to significant
      stress or indeed death if not increased to healthy levels. The use of handheld dissolved oxygen meters or continuous online
      dissolved oxygen sensors can help montior and control these situations.
      </p>
      </p>
      </ShowMore>
      </div>
      </div>
      <div className='tips-card'>
      <div className="show_more">
      <img src={require('./do.jpeg')} className="img-link" />
      <ShowMore
                lines={3}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
      <p className = 'text'>
      <p>Dissolved Oxygen (DO) is considered by most to be the most important water quality parameter to in aquaculture. Depending
      on the size and type of fish farm, DO levels can change very quickly indeed and can therefore endanger the lives of the
      fish in a matter of minutes or hours. The main problems with maintaining a suitable level of dissolved oxygen in fish
      farm applications is that oxygen is not very soluble in water and takes a lot of oxygenating to keep these levels;
      oxygen naturally diffuses to the atmosphere and the demand for oxygen is un-naturally higher in fish farm application
      than in the natural environment purely due to the stocking density of the fish farm.
      </p>
      <br></br>
      <p>
      Although fish can tolerate a drop in dissolved oxygen below 5-6 mg/L for short periods of time, it will lead to significant
      stress or indeed death if not increased to healthy levels. The use of handheld dissolved oxygen meters or continuous online
      dissolved oxygen sensors can help montior and control these situations.
      </p>
      </p>
      </ShowMore>
      </div>
      </div>

 </div>
         );
        }
    }
export default Tips;