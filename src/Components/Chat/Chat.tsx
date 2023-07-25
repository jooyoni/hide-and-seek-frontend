import { useState, useEffect } from 'react';
import { getChat, sendChat } from '../../socketio';
import styles from './Chat.module.scss';
import { useAppSelector } from '../../store/store';
interface IChatType {
  id: string;
  chat: string;
}
function Chat() {
  const myData = useAppSelector((state) => state.me);
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState<IChatType[]>([]);
  useEffect(() => {
    getChat(setChatList);
  }, []);
  return (
    <article>
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.currentTarget.value)}
      />
      <button onClick={() => sendChat(myData.id, chat)}>전송</button>
      <ul>
        {chatList.map((chat, idx) => (
          <li
            className={`${styles.chat} ${
              myData.id == chat.id ? styles.myChat : ''
            }`}
            key={idx}
          >
            {chat.chat}
          </li>
        ))}
      </ul>
    </article>
  );
}
export default Chat;
