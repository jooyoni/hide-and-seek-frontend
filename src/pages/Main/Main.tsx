import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../utils/api";
import { disconnectSocket } from "../../socketio";
import styles from "./Main.module.scss";
function Main() {
    const [nickname, setNickname] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        disconnectSocket();
    }, []);
    async function create() {
        let res = await createRoom();
        if (res)
            navigate(
                `/play/1/${res.roomNumber}`
                // {
                //     state: {
                //         id: res.id,
                //     },
                // }
            );
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        axiosClient.get(`/join-room/${room}`).then((res) => {
            if (!res.data) {
                alert("올바른 방번호를 입력해주세요.");
                return;
            }
            navigate(`/play/1/${room}`);
        });
    }
    return (
        <main className={styles.container}>
            <article className={styles.contentWrap}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.currentTarget.value)}
                    />
                    <button>방 참여</button>
                </form>
                <button className={styles.createRoom} onClick={create}>
                    방개설
                </button>
            </article>
        </main>
    );
}
export default Main;
