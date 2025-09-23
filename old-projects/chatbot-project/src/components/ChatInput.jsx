import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';
import dayjs from 'dayjs';

export default function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event) {
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
  function keyDown(event) {
    (event.key === 'Enter') ? sendMessage() : null;
    (event.key === 'Escape') ? setInputText('') : null;     
  }

  function clearMessage() {
    setChatMessages([]);
  //  localStorage.setItem('messages', JSON.stringify([])) 
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
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