import {useContext,useState} from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { UserContext} from '../context/UserContext';
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
const {VITE_API_KEY} = import.meta.env
const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${VITE_API_KEY}`
const Search = () => {
  const [open,setOpen] =useState<boolean>(false)
  const [uploadImage,setUploadImage] = useState<string>('');
  const {
    user,
    setUser,
    prevUser,
    setStartChat,
    setShowResult,
    input,
    setInput,
  }  = useContext(UserContext);
 async function handleSubmit() {
  setStartChat(true)
  setShowResult('')
  prevUser.data = user.data;
  prevUser.mime_type = user.mime_type;
  prevUser.imgUrl = user.imgUrl;
  prevUser.prompt=input
      try{
      const response = await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
                "contents": [{
                  "parts":[
                    {"text":prevUser.prompt},
                    prevUser.data?[ {
                      "inline_data": {
                        "mime_type":prevUser.mime_type,
                        "data": prevUser.data,
                      }
                    }]:[]
                   
                  ]
                }]
              }
        ),
      })
      let res = await response.json()
      let data = res.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      setShowResult(data)
      setUser(
        {
         data: null,
         mime_type:null,
         imgUrl:null,
         prompt:null,
        }
      )
    }catch{
        console.log("not response")
    }
 } 
 function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    setUploadImage(URL.createObjectURL(file))
    setStartChat(true)
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result && typeof result === 'string') {
        const base64 = result.split(",")[1];
        setUser(
          {
           data: base64,
           mime_type: file.type,
           imgUrl: URL.createObjectURL(file),
          }
        )
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
        setOpen(!open)
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
    {
        uploadImage? <img className='uploadImage' src={uploadImage} alt=''/>: ''
      }
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
