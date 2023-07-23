import { useState, useEffect } from "react";
import { getChat, sendChat } from "../../socketio";
import styles from "./Chat.module.scss";
function Chat() {
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState([]);
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
            <button onClick={() => sendChat(chat)}>전송</button>
            <ul>
                {chatList.map((chat) => (
                    <li className={styles.chat}>{chat}</li>
                ))}
            </ul>
        </article>
    );
}
export default Chat;
