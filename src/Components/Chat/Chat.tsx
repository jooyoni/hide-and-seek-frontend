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
  function chatSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!myData.id) return;
    if (!chat) {
      alert('메세지를 입력해주세요.');
      return;
    }
    sendChat(myData.id, chat);
  }
  return (
    <article>
      <form onSubmit={(e) => chatSubmit(e)}>
        <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.currentTarget.value)}
        />
        <button>전송</button>
      </form>
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
