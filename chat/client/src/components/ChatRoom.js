import React, { useEffect, useRef, useState } from 'react'
import "../App.css"
import ChatMessage from './ChatMessage';
import {io} from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
const ChatRoom = () => {
    const dummy = useRef();

  
    const [formValue, setFormValue] = useState('');
    const [socket,setSocket] = useState();
    const [messages,setMessages] = useState([{question:"Do you ever feel like I am fine . I don't have it as bad as others", option:["option 1" , "option 2", "option 3"] , points : 30 , tag:"depression"} ])
    useEffect(()=>{
        const s = io("http://localhost:3006")
        setSocket(s);
        return ()=>{
            s.disconnect()
        } 
    },[])
     var userMessaege = "1111111"
    const sendMessage = async (e) => {
        e.preventDefault();
    
        
        

       // setMessages([...messages, {message:formValue, userFlag:"user"}])
        await socket.emit("send-message",formValue)
       // userMessaege =  {message:formValue, flag:"user"}
       setMessages((list) => [...list, {message:formValue, userFlag:"user"}]);
        setFormValue('');
        
      }
      useEffect(()=>{
        if (socket == null) return 
        const handler = (delta)=>{
            
            
              //  setMessages([...messages, ...delta])
              setTimeout(()=>{
                setMessages((list) => [...list, delta]) 
                console.log(...messages)
                dummy.current.scrollIntoView({ behavior: 'smooth' });
            },500)
                
            
           
           

        }
        socket.on("reply", handler);
        
        return ()=>{
            socket.off("reply",handler)
        }
    },[socket])
    return (<>
      <main>
        <ScrollToBottom>
        {messages && messages.map(msg => <ChatMessage userFlag = {msg.userFlag} message={msg.message}  />)}
        </ScrollToBottom>
        <span ref={dummy}> <p>--------------</p></span>
  
      </main>
  
      <form onSubmit={sendMessage}>
  
        <input value={formValue}  onChange={(e) => setFormValue(e.target.value)} placeholder="ask your queries" readonly/>
  
        <button type="submit" disabled={!formValue}>SEND</button>
  
      </form>
    </>)
}

export default ChatRoom