// import React from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
const Search = () => {
  return (
    <section className="search">
      <div className='option'><FaPlus /></div>
      <input type="text" placeholder="Ask AI-BOT"/>
      <button
      className="submit"
      ><IoSend/></button>
     </section>
  )
}

export default Search