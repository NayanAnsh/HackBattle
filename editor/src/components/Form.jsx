import React, { useState } from 'react'
import Editor from './Editor';

const Form = () => {
  const [title , setTitle] = useState("");
  const [cardImage, setCardImage] = useState("");
  const [qdata,setQbody] = useState([]);

  function handleCardImage(data){
    
    setCardImage(data.target.files[0]);
    
    }
    const handleTitle = (e)=>{
    
      setTitle(e.target.value)
      //console.log(title)
  }
  return (
    <div>

      <form method='post' encType="multipart/form-data">
      <div className="mb-4">
          <label for="title" className="block  text-gray-700 font-medium mb-2">Title</label>
          <input type="text" onChange={handleTitle} id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
      <label for="cardImage" className="block text-gray-700 font-medium mb-2"   >Card Image</label>
      <input type="file"  id="cardImage" onChange={handleCardImage}  name="cardImage" />
      <Editor/>


      </form>
    </div>
  )
}

export default Form