'use client'
import {FormEvent, useContext,useState} from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { UserContext} from '../context/UserContext';
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
const Search = () => {
  const [open,setOpen] =useState<boolean>(false)
  const {setStartChat} = useContext(UserContext);
 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  await e.preventDefault()
  setStartChat(true)
 } 
  return (
    <section>
      <input type='file' accept='image/*' hidden id='inputImg' />
  
    <div className={`file-box ${open?'':'hidden'}`}>
      <div className='upload'onClick={()=>{
        document.getElementById("inputImg")?.click()
      }}>
        <RiImageAddLine/>
        <span className='primary-text'>Upload Image</span>
      </div>
      <div className='generate'>
        <RiImageAiLine/>
        <span className='primary-text'>Generate Image</span>
      </div>
      </div>  

    <div className="search-box">
      <button className='option'
      onClick={()=>{setOpen(!open)}}
      ><FaPlus /></button>
      <form className="inputForm" onSubmit={(e)=>handleSubmit(e)} >
      <input type="text" placeholder="Ask AI-BOT"
      // onChange={}
      />
      <button
      className="submit"
      ><IoSend/></button>
      </form> 
      </div>
      </section>
  )
}

export default Search