import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

type ChatMessageProps = {
  message: string,
  sender: string,
  time: string
}

export default function ChatMessage({ message, sender, time }: ChatMessageProps) {

  // const {message, sender} = props;
  /*
  if(sender === 'robot') {
    return (
      <div>
        <img width="50" src="robot.png"/>
        {message}
    </div>
    )

  }
  */
 
 
  return (
    <div className={
      sender ===  'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img className="chat-message-profile" src={RobotProfileImage} />
      )}
      <div className="chat-message-text">
        {message}
      <div className="chat-time">{time}</div>
      </div>
      {sender === 'user' && (
        <img className="chat-message-profile"  src={UserProfileImage} />
      )}
      

    </div>
  )
}