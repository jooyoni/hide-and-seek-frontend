import { useState, useEffect } from "react";
import { getChat, sendChat } from "../../socketio";
import styles from "./Chat.module.scss";
import { useAppSelector } from "../../store/store";
interface IChatType {
    id: string;
    chat: string;
}
interface IPropsType {
    chatOpen: boolean;
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Chat({ chatOpen, setChatOpen }: IPropsType) {
    const myData = useAppSelector((state) => state.me);
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState<IChatType[]>([]);
    const users = useAppSelector((state) => state.users);
    useEffect(() => {
        getChat(setChatList);
    }, []);
    function chatSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!myData.id) return;
        if (!chat) {
            alert("메세지를 입력해주세요.");
            return;
        }
        sendChat(myData.id, chat);
        setChat("");
    }

    function getNickname(chat: IChatType) {
        if (chat.id == myData.id) return myData.nickname;
        else {
            if (users.val[chat.id]) return users.val[chat.id].nickname;
            else return "나간 유저";
        }
    }
    return (
        <section
            className={styles.container}
            style={{ display: chatOpen ? "flex" : "none" }}
        >
            <div
                className={styles.closeBtn}
                onClick={() => setChatOpen(false)}
            ></div>
            <ul className={styles.chatList}>
                {chatList.map((chat, idx) => (
                    <li
                        className={`${styles.chat} ${
                            myData.id == chat.id ? styles.myChat : ""
                        }`}
                        key={idx}
                    >
                        <span>{getNickname(chat)}</span>
                        <span>{chat.chat}</span>
                    </li>
                ))}
            </ul>
            <form className={styles.chatForm} onSubmit={(e) => chatSubmit(e)}>
                <input
                    type="text"
                    value={chat}
                    onChange={(e) => setChat(e.currentTarget.value)}
                />
                <button>전송</button>
            </form>
        </section>
    );
}
export default Chat;
