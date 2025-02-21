import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
  const { showresult,prevUser } = useContext(UserContext)
  return (
    <section className='chat'>
      <div className='user'>
        
       <span>
       {
         prevUser.prompt
       }
        </span> 
      </div>
      <img className={`${prevUser.imgUrl?'block':'hidden'}`} src={prevUser.imgUrl} alt=""/>
      <div className='bot'>
       {
       showresult
       }
      </div>

    </section>
  )
}

export default Chat