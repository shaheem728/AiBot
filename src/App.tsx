import { useState } from 'react'
// import { token } from './action/api'
import SideBar from "./component/SideBar"
import Search from "./component/Search"
import { CgMenuGridO } from "react-icons/cg"; 
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
function App() {
  const [toggle, setToggle] = useState(false)
  return (
    <section className="staic">
    <div className={`absolute  left-0 ${toggle?'block':'hidden'}`}>
      <SideBar/>
    </div> 
    <button 
    type="button"
    className='menu-button'
    onClick={()=>setToggle(!toggle)}
    >
    <CgMenuGridO className="home-menu"/>
    </button>
    <div className="content">
    <h1>Hello,Shaheem</h1>  
    <div className="chat">
     <Search/>
    </div>
    </div>  
    </section>
  )
}

export default App
