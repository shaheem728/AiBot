'use client'
import {useContext,useState} from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { UserContext,user} from '../context/UserContext';
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
const Search = () => {
  const [open,setOpen] =useState<boolean>(false)
  const {setStartChat,setInput,input } = useContext(UserContext);
 async function handleSubmit() {
  setStartChat(true)
 } 
 function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === 'string') {
        const base64 = result.split(",")[1];
        user.data = base64
      } else {
        console.log('Failed to read file as Base64');
      }
    };
    reader.readAsDataURL(file);
  } else {
    console.log('No file selected');
  }
}

  return (
    <section>
      <input type='file' accept='image/*' hidden id='inputImg' onChange={handleImage}  />
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

      <form className="inputForm" onSubmit={(e)=>{
        e.preventDefault()
        if(input){
          handleSubmit()
        }
      }}>
      <input type="text" placeholder="Ask AI-BOT" value={input} onChange={(e)=>setInput(e.target.value)}
      />
      {
        input &&  <button
        className="submit"
        ><IoSend/></button>
      }
    
      </form> 
    </div>
    </section>
  )
}

export default Search
