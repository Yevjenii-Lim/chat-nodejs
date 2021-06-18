import React from 'react'
import { NavLink } from 'react-router-dom'

function Greeting({username}) {
    return (
        <div>
            <h2>Hello {username} you can:</h2>
            <NavLink className="btn-blue " to="/rooms">To chat rooms</NavLink>
            <NavLink className="btn-blue"  to="change-password"> Change password for {username} </NavLink>
        </div>
    )
}

export default Greeting
