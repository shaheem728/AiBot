import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
const { showresult,prevUser,generateImageresult } = useContext(UserContext)
  return (
    <>
    <div className="chat">
      <div className="h-full w-full m-2 p-20 ">
    {
      prevUser.imgUrl?<div className='relative h-20  m-4 w-full'>
      <img className='chatimg' src={prevUser.imgUrl} alt='user' />
      </div>:''
    }
     <div className='h-auto w-full relative'>
      <span className='promptText'>
      {
        prevUser.prompt
      }
      </span>
     </div>
     </div>
     <div className='bot'>
     <img className='h-10' src="../public/ai-bot.svg" alt="" />
    {
      showresult?showresult:generateImageresult?<img className='generateImage' src={generateImageresult}/>:''
    }
    </div>
    </div>
    </>
  )
}

export default Chat