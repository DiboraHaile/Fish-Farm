import React from 'react';
import './PondList.css';
import PondCard from '../PondCard/PondCard';
import Pond from '../Pond/Pond';
import PondDetail from '../PondDetail/PondDetail';

class PondList extends React.Component
 {
    render()
    {
      return(
        <div className="PondList">
        {
          this.props.ponds.map(pond =>
          {
            return (<PondCard pond={pond}/>);
          })
        }
        
        </div>
      );
   }
  }

export default PondList;
