import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { chatbot } from 'supersimpledev';
import ChatInput from './components/ChatInput';
import Chatmessages from './components/ChatMessages';
import Robot from './assets/robot.png'
import './App.css'



function App() {
  
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages') ?? '[]') || [{
    message: 'Hello chatbot',
    sender: 'user',
    id: 'id1',
    time: `${dayjs().format('h:mma')}`
  }, {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2',
    time: `${dayjs().format('h:mma')}`
  }, {
    message: 'can you get me todays date',
    sender: 'user',
    id: 'id3',
    time: `${dayjs().format('h:mma')}`
  }, {
    message: 'Today is August 5',
    sender: 'robot',
    id: 'id4',
    time: `${dayjs().format('h:mma')}`
  }]);
  
  
  useEffect(() => {
    chatbot.addResponses({
      'is javaScript good': 'Javascript Is  Good',
      'who are you': 'I am your assistant chatbot',
      'give me a unique id': () => {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`
      }

    })
  }, []);
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  const num = chatMessages.length;
  const title = `${num} messages`
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  return (
    <div className="app-container">
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={Robot} />
      <Chatmessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>

  )
}


export default App
