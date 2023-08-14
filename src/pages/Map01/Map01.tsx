import { useState } from "react";
import Chat from "../../components/Chat/Chat";
import Me from "../../components/Me/Me";
import { useAppSelector } from "../../store/store";
import styles from "./Map01.module.scss";
function Map01() {
    const users = useAppSelector((state) => state.users);
    const myData = useAppSelector((state) => state.me);
    const [chatOpen, setChatOpen] = useState(false);
    console.log(users);
    return (
        <main
            className={styles.container}
            // style={{paddingTop:}}
        >
            <Me />

            <div
                className={styles.map}
                style={{
                    top: Math.min(-1 * myData.top, 0),
                    left: Math.min(-1 * myData.left, 0),
                }}
            >
                {Object.entries(users.val).map((user, idx) => {
                    return (
                        <div
                            className={styles.user}
                            style={{ top: user[1].top, left: user[1].left }}
                        >
                            {user[1].nickname ? user[1].nickname : idx}
                        </div>
                    );
                })}
            </div>
            {chatOpen && <Chat setChatOpen={setChatOpen} />}
            <div className={styles.chatBtn} onClick={() => setChatOpen(true)}>
                채팅
            </div>
        </main>
    );
}
export default Map01;
