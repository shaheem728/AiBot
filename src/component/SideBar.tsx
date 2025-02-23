import React,{useState} from 'react'
import { FaPlus } from "react-icons/fa";
const SideBar = () => {
  const [extended,setExtendec] = useState<boolean>(false)
  return (
    <section className="sideBar" onMouseOver={()=>
      setExtendec(true)
    } onMouseOut={()=>setExtendec(false)}
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
        </div>
      </div>
    </section>
  )
}

export default SideBar