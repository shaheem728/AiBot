import { useState,useContext } from 'react'
// import { token } from './action/api'
import SideBar from "./component/SideBar"
import Search from "./component/Search"
import Chat from './component/Chat';
import { UserContext} from './context/UserContext';
import { CgMenuGridO } from "react-icons/cg"; 
function App() {
  const [toggle, setToggle] = useState(false)
  const { startChat} = useContext(UserContext)
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
    {
      startChat ? <Chat/> :  <h1>Hello,Shaheem</h1> 
    }   
    <div className="search">
     <Search/>
    </div>
    </div>  
    </section>
  )
}

export default App
