import { initSocketConnection, joinRoom, setNickname } from "../../socketio";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Me.module.scss";
interface IUserType {
    id: string;
    nickname: string;
}
function Me() {
    const [userData, setUserData] = useState<IUserType>({
        id: "",
        nickname: "",
    });
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id)
            setUserData((prev) => ({ ...prev, id: location.state.id }));
    }, []);
    const [nicknameInput, setNicknameInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const { roomNumber } = useParams();
    useEffect(() => {
        initSocketConnection();
        joinRoom(roomNumber, userData, setUserData);
    }, []);
    function nicknameSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUserData((prev) => {
            return { ...prev, nickname: nicknameInput };
        });
        setNickname(userData.id, nicknameInput);
    }
    return (
        <>
            <div>me</div>
            {!userData.nickname && (
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
