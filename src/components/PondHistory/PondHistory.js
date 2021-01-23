import React from 'react';
import ReactTable from "react-table";  
import './PondHistory.css'

class PondHistory extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      let data_rows = [];
      let row = [];
      for (let i = 0;i<100;i++){
        row.push(i+1);
        row.push(this.props.spec_data.PH[i]);
        row.push(this.props.spec_data.Water_Level[i]);
        row.push(this.props.spec_data.Temprature[i]);
        row.push(this.props.spec_data.Time_recorded[i]);
        data_rows.push(row);
        row = [];
      }

      
    return (  
      <div className="pondHistory">
      <h3> Pond Sensor Reading History</h3>
          <div className="pond_table" >  
              <table border = "1">
         <thead>
            <td>ID</td>
            <td>PH</td>
            <td>Water Level</td>
            <td>Temprature</td>
            <td>Time_recorded</td>
            
            
         </thead>
         
         {
          
          data_rows.map(row => {
            return (
              <tr>
              {row.map(value => {
              return ( <td> {value} </td> )
           }) }   
           </tr>       
           )
          }) 
              
         }     
      </table>
          </div>   
          </div>     
    )  
  }  
}  

export default PondHistory;