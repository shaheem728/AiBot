import {useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
const { showresult,prevUser,generateImageresult } = useContext(UserContext)
  return (
    <>
    <div className="chat">
      
    {
      prevUser.imgUrl?<div className='relative h-25  m-4 w-full'>
      <img className='chatimg' src={prevUser.imgUrl} alt='user' />
      </div>:''
    }
     <div className='h-[150px] w-auto  relative'>
      <span className='prompt-container'>
      <p className='prompt'>
      {
        prevUser.prompt
      }
     </p>
      </span>
     </div>
   
     <div className='bot'>
     <img className='h-10' src="public/AiBot.svg" alt="" />
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