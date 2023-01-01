import React from 'react'
import './button.css'

export const Button = (props) => {

  return (
    <div>
        <button className='btn' type='{props.type}'>{props.name}</button>
    </div>
  )
}
