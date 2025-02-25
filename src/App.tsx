import { useState,useContext } from 'react'
import SideBar from "./component/SideBar"
import Search from "./component/Search"
import Chat from './component/Chat';
import { UserContext} from './context/UserContext';
import { CgMenuGridO } from "react-icons/cg"; 
import { MessageSquare, Upload, Sparkles } from 'lucide-react'
function App() {
  const [toggle, setToggle] = useState(true)
  const { startChat} = useContext(UserContext)
  return (
    <>
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
          <span className="Bot-text"><span className='text-lime-400'>Ai</span>Bot</span>
      </div>
    <div className="content">
    {
      startChat ? <Chat/> : <> <div className="intro"><p><span>Hello,Dev.</span></p>
      <p className='intro-text'>How can I help you today?</p>
       </div>
               <div className="features">
                 {/* Chat Feature */}
                 <div className="features-box">
                   <div className="features-icon bg-blue-700/20  dark:bg-blue-500/20">
                     <MessageSquare className="w-6 h-6 text-blue-700 dark:text-blue-500" />
                   </div>
                   <h3 className="features-text">Chat Assistant</h3>
                   <p className="text-slate-200">
                     Engage in natural conversations with our AI assistant. Get help, answers, and support
                     instantly.
                   </p>
                 </div>
       
                 {/* Upload Feature */}
                 <div className="features-box">
                   <div className=" bg-purple-700/20 dark:bg-purple-500/20  features-icon">
                     <Upload className="w-6 h-6 text-purple-700 dark:text-purple-500" />
                   </div>
                   <h3 className="features-text">Image Upload</h3>
                   <p className="text-slate-200">
                     Upload images for analysis, processing, or enhancement. Support for multiple formats.
                   </p>
                 </div>
       
                 {/* Generate Feature */}
                 <div className="features-box">
                   <div className=" bg-pink-700/20 dark:bg-pink-500/20 features-icon">
                     <Sparkles className="w-6 h-6 text-pink-700 dark:text-pink-500" />
                   </div>
                   <h3 className="features-text">Image Generation</h3>
                   <p className="text-slate-200">
                     Create unique images from text descriptions using advanced AI generation technology.
                   </p>
                 </div>
               </div>
      </>
    }   
    <div className="search">
     <Search/>
    </div>
    </div>  
    </>
  )
}

export default App
