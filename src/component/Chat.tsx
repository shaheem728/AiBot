import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext'
const Chat = () => {
  const { input } = useContext(UserContext)
  return (
    <section className='chat'>
      <div className='user'>
        {
          input
        }
      </div>
      <div className='bot'>
       {
        input
       }
      </div>

    </section>
  )
}

export default Chat