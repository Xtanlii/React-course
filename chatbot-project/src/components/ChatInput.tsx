import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';
import dayjs from 'dayjs';
import type { ChangeEvent, KeyboardEvent } from 'react';



type ChatInputProps = {
  chatMessages: {
    id: string,
    message: string,
    sender: string,
    time: string
  }[];
  setChatMessages: (chatMessages: {
    id: string,
    message: string,
    sender: string,
    time: string
  }[]) => void
}



export default function ChatInput({ chatMessages, setChatMessages }:ChatInputProps,) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value)
  }
  
  
  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
          time: `${dayjs().format('h:mma')}`
        }
      ]
      setChatMessages(newChatMessages);
      setInputText('');

      setChatMessages([
      ...newChatMessages,
      {
        message: 'Loading...',
        sender: 'robot',
        id: crypto.randomUUID(),
        time: `${dayjs().format('h:mma')}`
      }
    ]);
    
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: `${dayjs().format('h:mma')}`
      }
    ]);
    
    setInputText('');
    setIsLoading(false);
  }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) {
    if(event.key === "Enter") {
      sendMessage();
    }
     if(event.key === "Escape") {
      setInputText('');
    }   
  }

  function clearMessage() {
    setChatMessages([]);
  //  localStorage.setItem('messages', JSON.stringify([])) 
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={keyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessage}
        className='clear-button'
      >Clear</button>
    </div>
  )
}