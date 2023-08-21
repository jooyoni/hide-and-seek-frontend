import { useState } from "react";
import Chat from "../../components/Chat/Chat";
import Me from "../../components/Me/Me";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./Map01.module.scss";
import { meActions } from "../../store/modules/me";
import { ready } from "../../socketio";
function Map01() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users);
    const myData = useAppSelector((state) => state.me);
    const [chatOpen, setChatOpen] = useState(false);
    function handleReady() {
        if (myData.isAdmin) {
            //내가 방장일경우
            let room: { red: number; blue: number; allReady: boolean[] } = {
                red: 0,
                blue: 0,
                allReady: [],
            };
            Object.entries(users.val).map((user) => {
                room[user[1].team]++;
                if (user[1].isReady) room.allReady.push(true);
            });
            room[myData.team!]++;
            if (room.red !== room.blue) alert("양팀 수가 맞지 않습니다.");
            else if (room.allReady.includes(false))
                alert("준비하지 않은 유저가 있습니다.");
            else ready();
        } else {
            dispatch(meActions.ready(!myData.isReady));
            ready();
        }
    }
    return (
        <main
            className={styles.container}
            // style={{paddingTop:}}
        >
            <Me />
            <div
                className={styles.map}
                style={{
                    top: -1 * myData.top,
                    left: -1 * myData.left,
                }}
            >
                {Object.entries(users.val).map((user, idx) => {
                    return (
                        <div
                            className={styles.user}
                            style={{
                                top: user[1].top + 225,
                                left: user[1].left + 425,
                                backgroundColor: user[1].team,
                            }}
                        >
                            <span className={styles.nickname}>
                                (
                                {user[1].isAdmin
                                    ? "방장"
                                    : user[1].isReady
                                    ? "준비완료"
                                    : "준비안함"}
                                ){user[1].nickname ? user[1].nickname : idx}
                            </span>
                        </div>
                    );
                })}
            </div>
            <Chat chatOpen={chatOpen} setChatOpen={setChatOpen} />
            <div className={styles.chatBtn} onClick={() => setChatOpen(true)}>
                채팅
            </div>
            <div className={styles.readyBtn} onClick={handleReady}>
                {myData.isAdmin
                    ? "게임 시작"
                    : myData.isReady
                    ? "준비 완료"
                    : "게임 준비"}
            </div>
        </main>
    );
}
export default Map01;
