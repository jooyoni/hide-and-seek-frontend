import { useState, useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import Me from "../../components/Me/Me";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./Map01.module.scss";
import { meActions } from "../../store/modules/me";
import { ready, socket } from "../../socketio";
import { usersActions } from "../../store/modules/users";
import CounterAnimation from "../../components/CounterAnimation/CounterAnimation";
import User from "../../components/User/User";
function Map01() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users);
    const myData = useAppSelector((state) => state.me);
    const gameInfo = useAppSelector((state) => state.gameInfo);
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
                room.allReady.push(user[1].isReady);
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
    const [counterAnimationOpen, setCounterAnimationOpen] = useState(false);
    useEffect(() => {
        if (!gameInfo.isGaming) return;
        setCounterAnimationOpen(true);
    }, [gameInfo.isGaming]);
    console.log(users);
    return (
        <main className={styles.container}>
            <Me />
            <div
                className={styles.map}
                style={{
                    top: -1 * myData.top,
                    left: -1 * myData.left,
                }}
            >
                {Object.entries(users.val).map((user, idx) => {
                    return <User user={user} />;
                })}
            </div>
            <Chat chatOpen={chatOpen} setChatOpen={setChatOpen} />
            <div className={styles.userInfoBox}>
                <div
                    className={styles.healthBar}
                    style={{ width: `${myData.health}%` }}
                >
                    {myData.health}%
                </div>
            </div>
            <div className={styles.chatBtn} onClick={() => setChatOpen(true)}>
                채팅
            </div>
            <div className={styles.attackBtn}>
                <span>SPACEBAR</span>
            </div>
            {!gameInfo.isGaming && (
                <div className={styles.readyBtn} onClick={handleReady}>
                    {myData.isAdmin
                        ? "게임 시작"
                        : myData.isReady
                        ? "준비 완료"
                        : "게임 준비"}
                </div>
            )}
            {counterAnimationOpen && (
                <CounterAnimation
                    setCounterAnimationOpen={setCounterAnimationOpen}
                />
            )}
        </main>
    );
}
export default Map01;
