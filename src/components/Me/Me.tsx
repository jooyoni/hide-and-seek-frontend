import {
    initSocketConnection,
    joinRoom,
    setLocation,
    setNickname,
} from "../../socketio";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Me.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { meActions } from "../../store/modules/me";
interface IUserType {
    id: string;
    nickname: string;
}

function Me() {
    const myData = useAppSelector((state) => state.me);
    const gameInfo = useAppSelector((state) => state.gameInfo);
    const myDataRef = useRef({ ...myData });
    const [top, setTop] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [intervalHelper, setIntervalHelper] = useState(0);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const [nicknameInput, setNicknameInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const { roomNumber } = useParams();
    useEffect(() => {
        initSocketConnection();
        joinRoom(roomNumber, dispatch);
    }, []);
    function nicknameSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(meActions.update({ ...myData, nickname: nicknameInput }));
        setNickname(myData.id, nicknameInput);
    }

    const handleClientKeyDown = useCallback((e: KeyboardEvent) => {
        console.log("keydown");
        if (e.keyCode == 37) {
            setLeft(true);
        } else if (e.keyCode == 38) setTop(true);
        else if (e.keyCode == 39) {
            setRight(true);
        } else if (e.keyCode == 40) setBottom(true);
        setIsMoving(true);
    }, []);
    const handleClientKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.keyCode == 37) {
            setLeft(false);
        } else if (e.keyCode == 38) setTop(false);
        else if (e.keyCode == 39) {
            setRight(false);
        } else if (e.keyCode == 40) setBottom(false);
    }, []);
    useEffect(() => {
        if (!top && !left && !bottom && !right) {
            setIsMoving(false);
            return;
        }
        let move = 5;
        if (top)
            myDataRef.current.top = Math.max(
                myDataRef.current.top - move,
                -225
            );
        if (left)
            myDataRef.current.left = Math.max(
                myDataRef.current.left - move,
                -425
            );
        if (bottom)
            myDataRef.current.top = Math.min(
                myDataRef.current.top + move,
                1225
            );
        if (right)
            myDataRef.current.left = Math.min(
                myDataRef.current.left + move,
                1525
            );
        dispatch(
            meActions.location({
                top: myDataRef.current.top,
                left: myDataRef.current.left,
            })
        );
        setLocation();

        setTimeout(() => {
            setIntervalHelper((prev) => prev + 1);
        }, 10);
    }, [isMoving, intervalHelper]);

    useEffect(() => {
        if (gameInfo.isMovable) {
            document.addEventListener("keydown", handleClientKeyDown);
            document.addEventListener("keyup", handleClientKeyUp);
        } else {
            document.removeEventListener("keydown", handleClientKeyDown);
            document.removeEventListener("keyup", handleClientKeyUp);
        }

        return () => {
            document.removeEventListener("keydown", (e) =>
                handleClientKeyDown(e)
            );
            document.removeEventListener("keyup", (e) => handleClientKeyUp(e));
        };
    }, [gameInfo.isMovable]);
    useEffect(() => {
        myDataRef.current = { ...myData };
    }, [myData.top, myData.left]);
    return (
        <>
            <article
                className={styles.character}
                style={{ backgroundColor: myData.team }}
            >
                <span className={styles.nickname}>
                    {!gameInfo.isGaming &&
                        `(${
                            myData.isAdmin
                                ? "방장"
                                : myData.isReady
                                ? "준비완료"
                                : "준비안함"
                        })`}
                    {myData.nickname}
                </span>
            </article>
            {!myData.nickname && (
                <form
                    onSubmit={(e) => nicknameSubmit(e)}
                    className={styles.nicknameForm}
                >
                    <h3>닉네임을 입력해주세요.</h3>
                    <input
                        type="text"
                        value={nicknameInput}
                        onChange={(e) =>
                            setNicknameInput(e.currentTarget.value)
                        }
                    />
                    <button>확인</button>
                </form>
            )}
        </>
    );
}
export default Me;
