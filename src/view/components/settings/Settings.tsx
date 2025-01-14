import React from 'react'
import Switch from '../switch/Switch'


const Settings = () => {
  return (
      <div><Switch onChange={()=>console.log("change")} /> </div>
  )
}

export default Settings