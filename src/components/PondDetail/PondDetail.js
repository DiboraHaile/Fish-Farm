import React from 'react';
import arrow from '../PondCard/arrow1.png';
import ultra from '../PondCard/ultra.svg';
import ph from '../PondCard/ph.svg';
import temp from '../PondCard/temp.png';
import './PondDetail.css';
import PondCondition from '../PondCondition/PondCondition'


class PondDetail extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <div className="card">
                
            <div className="grid">
               <div className="box sensor-reading">
               <p className= "ph">{this.props.pond.PH}</p>
               </div>
               <div className="box graph">
                   
               </div>
               <div className="box condition"></div>
               <div className="box D"></div>
               <div className="box E"></div>
               <div className="box F"></div>
               <div className="box G"></div>
               <div className="box H"></div>
               <div className="box I"></div>
               <div className="box J"></div>
               <div className="box K"></div>
               <div className="box L"></div>
               <div className="box M"></div>
               <div className="box N"></div>
               <div className="box O"></div>
               <div className="box P"></div>
               <div className="box Q"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               <div className="box T"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               <div className="box T"></div>
               <div className="box R"></div>
               <div className="box S"></div>
               

</div>
</div>
 
         );
        }
    }
export default PondDetail;