// import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";
const SideBar = () => {
  return (
    <section className="sideBar">
    <div className="staic">
    <CgMenuGridO  className="menu " />  
    <FaCirclePlus className="btn"/>
    </div>    
    </section>
  )
}

export default SideBar