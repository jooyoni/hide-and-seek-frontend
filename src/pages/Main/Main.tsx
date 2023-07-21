import { useEffect, useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import {
  initSocketConnection,
  sendSocketMessage,
  socketInfoReceived,
} from '../../socketio';

function Main() {
  const [state, setState] = useState('');
  const [chats, setChats] = useState<string[]>([]);
  useEffect(() => {
    initSocketConnection();
    socketInfoReceived(setChats);
  }, []);
  function sendSocket() {
    sendSocketMessage(state);
  }
  return (
    <div>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
      />
      <button onClick={sendSocket}>전송</button>
      <ul>
        {chats.map((chat) => (
          <li>{chat}</li>
        ))}
      </ul>
    </div>
  );
}
export default Main;
