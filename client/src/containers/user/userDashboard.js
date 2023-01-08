import React from 'react'
import { useSelector} from 'react-redux'
function UserDashboard() {
    const {name} = useSelector(state=>state.user)
  return (
    <div>
        Hi {name} welcome to home
    </div>
  )
}

export default UserDashboard
