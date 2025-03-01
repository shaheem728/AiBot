import {useContext,useEffect,useState} from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { UserContext} from '../context/UserContext';
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
const {VITE_API_KEY,VITE_TOKEN} = import.meta.env
const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${VITE_API_KEY}`
const Search = () => {
  const [open,setOpen] = useState<boolean>(false)
  const [uploadImage,setUploadImage] = useState<string>('');
  const [generateImage,setGenerateImage] = useState<string>('');
  const [input, setInput] = useState<string>('');
  console.log(input)
  const {
    user,
    setUser,
    prevUser,
    setStartChat,
    startRecentChat,
    handlerecentChat, 
    setHandleRecentChat,
    setStartRecentChat,
    setShowResult,
    setGenerateImageResult,
    recentChats,
    setRecentChats,
  }  = useContext(UserContext);
  useEffect(()=>{
   if(startRecentChat){
    handleSubmit()
    setUploadImage(handlerecentChat[0].imgUrl)
   }
  },[startRecentChat])
  async function handleSubmit() {
  setStartChat(true)
  setShowResult('')
  setUploadImage('')
  setStartRecentChat(false)
  const recentChatData = handlerecentChat.length > 0 ? handlerecentChat[0] : null;
  prevUser.data = user.data || recentChatData?.data || null;
  prevUser.mime_type = user.mime_type || recentChatData?.mime_type || null;
  prevUser.imgUrl = user.imgUrl || recentChatData?.imgUrl || null;
  prevUser.prompt = input || recentChatData?.chat || null;
  if(generateImage == "generateImage" || handlerecentChat[0]?.type == "generateImage" ){
   try{
    if(input){
      setRecentChats([...recentChats, { chat:input, type: "generateImage", data:null,mime_type:null,imgUrl:null}]);
    }
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${VITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({"inputs":prevUser.prompt}),
      }
    );
    const result = await response.blob();
    setGenerateImageResult(URL.createObjectURL(result))
    if(response.ok){
      setGenerateImage('')
    setInput('')
    setHandleRecentChat([{
      chat:null,
      type:null,
      data:null,
      mime_type:null,
      imgUrl:null,
    }])
    return;
    }
   
   }catch{
    console.log("not respose from huggingface")
   }
  }else{
    try{
      if(input){
      setRecentChats([...recentChats, { chat:input, type: "text", data:prevUser.data,mime_type:prevUser.mime_type,imgUrl:prevUser.imgUrl}]);
      }
      setGenerateImageResult("")
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
      if (response.ok){
        let res = await response.json()
        let data = res.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        let data1 = data.split("*").join()
        setShowResult(data1)
        setUser(
          {
           data: null,
           mime_type:null,
           imgUrl:null,
           prompt:null,
          }
        )
        setInput('')
        setHandleRecentChat([{
          chat:null,
          type:null,
          data:null,
          mime_type:null,
          imgUrl:null,
        }])
        return;
      }
 
    }catch{
        console.log("not response")
    }
  }
      
 } 
 function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    setUploadImage(URL.createObjectURL(file))
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
    <div className={`file-box ${open?'visible':'invisible'}`}>
      <div className='upload'onClick={()=>{
        document.getElementById("inputImg")?.click()
        setOpen(!open)
        setGenerateImage('')
      }}>
        <RiImageAddLine/>
        <span className='primary-text'>Upload Image</span>
      </div>
      <div className='generate' onClick={()=>{
        setOpen(!open)
        setGenerateImage('generateImage')
      }}>
        <RiImageAiLine/>
        <span className='primary-text'>Generate Image</span>
      </div>
    </div>  
    <div className='chatBox'>
    {
        uploadImage? <img className='uploadImage' src={uploadImage} alt=''/>: ''
      }
    <div className="search-box">
      <button className='option'
      onClick={()=>{setOpen(!open)}}
      >{generateImage?generateImage =="generateImage"?
        <RiImageAiLine className='text-teal-400 '/>:<FaPlus />:<FaPlus />
      }</button>
      <form className="inputForm" onSubmit={(e)=>{
        e.preventDefault()
        if(input){
          handleSubmit()
        }
      }}>
      <input type="text" placeholder="Ask AiBot" value={input} onChange={(e)=>setInput(e.target.value)}
      />
      {
        input &&  <button
        className="submit"
        ><IoSend/></button>
      }
      </form> 
    </div>
    </div>
    </section>
  )
}

export default Search
