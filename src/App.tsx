import { useState,useContext } from 'react'
import SideBar from "./component/SideBar"
import Search from "./component/Search"
import Chat from './component/Chat';
import { UserContext} from './context/UserContext';
import { CgMenuGridO } from "react-icons/cg"; 
function App() {
  const [toggle, setToggle] = useState(true)
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
    <div className="header">
          <span className="Bot-text"><span className='text-green-400'>Ai</span>Bot</span>
      </div>
    <div className="content">
    {
      startChat ? <Chat/> :  <div className="intro"><p><span>Hello, Dev.</span></p>
      <p className='intro-text'>How can I help you today?</p></div>
    }   
    <div className="search">
     <Search/>
    </div>
    </div>  
    </section>
  )
}

export default App
