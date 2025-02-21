import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
  const { showresult,prevUser } = useContext(UserContext)
  return (
    <section className='chat'>
      <div className='user'>
      <img className={`chatimg ${prevUser.imgUrl?'block':'hidden'}`} src={prevUser.imgUrl} alt=""/>

       <div className='promptText'>
       {
         prevUser.prompt
       }
        </div> 
      </div>
      <div className='bot'>
       {
       showresult
       }
      </div>

    </section>
  )
}

export default Chat