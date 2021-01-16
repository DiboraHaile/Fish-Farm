import React from 'react';
import ReactTable from "react-table";  
import './PondHistory.css'

class PondHistory extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      
    return (  
          <div>  
              <table border = "1">
         <thead>
            <td>ID</td>
            <td>Temprature</td>
            <td>Water_Level</td>
            <td>PH</td>
         </thead>

         {/* {% for row in rows %} */}
            {/* <tr>

               <td>{{row["name"]}}</td>
               <td>{{row["addr"]}}</td>
               <td> {{ row["city"]}}</td>
               <td>{{row['pin']}}</td>
            </tr> */}
        {/* //  {% endfor %} */}
      </table>
          </div>        
    )  
  }  
}  

export default PondHistory;