
import React from 'react'
import GkDistributionStatsPage from './gk-distribution-stats';
import PlayerDistributionStatsPage from './player-distribution-stats';

const DistributionStatsPage = ({id, role}:{id:string, role:string}) => {
  console.log("DistributionStatsPage id:", "role :", role);
 
  return (
    <div>
      {
        role == "gk" ? <GkDistributionStatsPage id={id}/> : <PlayerDistributionStatsPage id={id}/>
      }
    </div>
  )
}

export default DistributionStatsPage