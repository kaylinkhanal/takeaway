import React from 'react'
import AllOrdersList from '../../components/allOrdersList'
const RiderDashboard=()=> {
  return (
    <div>
     <AllOrdersList isRider={true} filterStatus="Accepted"/>
    </div>
  )
}

export default RiderDashboard
