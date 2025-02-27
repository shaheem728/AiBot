import {useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
const { showresult,prevUser,generateImageresult } = useContext(UserContext)
  return (
    <>
    <div className="chat">
      <div className="h-auto w-auto m-3 p-20 ">
    {
      prevUser.imgUrl?<div className='relative h-25  m-4 w-full'>
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
     <img className='h-10' src="../public/AiBot.svg" alt="" />
     {
     showresult?<p className='md:w-full w-70 '>{showresult}</p>:generateImageresult?
      <img className='generateImage' src={generateImageresult}/>:<div className='loader'>
      <hr />
      <hr />
      <hr />
    </div>
    }
    </div>
    </div>
    </>
  )
}

export default Chat