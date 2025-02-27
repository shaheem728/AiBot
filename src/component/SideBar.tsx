import {useState,useContext} from 'react'
import { FaPlus } from "react-icons/fa";
import { UserContext} from '../context/UserContext';
import { FiMessageSquare } from "react-icons/fi";
const SideBar = () => {
  const [extended,setExtended] = useState<boolean>(false)
  const {
    recentChat,
    setGenerateImage,
    setRecentInput,
    setStartRecentChat
  } = useContext(UserContext);
  return (
    <section className="sideBar" onMouseOver={()=>
      setExtended(true)
    } onMouseOut={()=>setExtended(false)}
    >
      <div className="sideBar-items">
        <div className={`${extended?'new-chat w-30 md:w-[60%]':'new-chat w-10'}`}>
          <FaPlus className='plus-icon' />
        {
          extended ?<span>New Chat</span>:null
        }
        </div>
        <div className={`recent ${extended?'block':'hidden'}`}>
          <p>Recent</p>
          <ul>
            {recentChat.length > 0 ? (
              recentChat.map((item:any, index:number) => (
                <li key={index} className="recent-chat-item" onClick={()=>{
                  setGenerateImage(item.type=="generateImage"?"generateImage":item.type),
                  setRecentInput(item.chat),
                  setStartRecentChat(true)
                }}>
                <span className='flex items-center gap-2 '><FiMessageSquare /><p>{item.chat.slice(0,25)}...</p></span> 
                </li>
              ))
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SideBar