import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../utils/api";
import { disconnectSocket } from "../../socketio";

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
            navigate(`/play/1/${res.roomNumber}`, {
                state: {
                    id: res.id,
                },
            });
    }
    return (
        <>
            <div>
                <span>방 번호</span>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.currentTarget.value)}
                />
                <button onClick={() => navigate(`/play/1/${room}`)}>
                    입장
                </button>
            </div>
            <div>
                <span onClick={create}>방개설</span>
            </div>
        </>
    );
}
export default Main;
