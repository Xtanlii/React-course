import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';

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
          id: crypto.randomUUID()
        }
      ]
      setChatMessages(newChatMessages);
      setInputText('');

      setChatMessages([
      ...newChatMessages,
      {
        message: 'Loading...',
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    
    setInputText('');
    setIsLoading(false);
  }
  function keyDown(event) {
    (event.key === 'Enter') ? sendMessage() : null;
    (event.key === 'Escape') ? setInputText('') : null;     
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
    </div>
  )
}