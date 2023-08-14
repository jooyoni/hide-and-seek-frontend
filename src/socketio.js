import { io } from "socket.io-client";
import axiosClient from "./utils/axiosClient";
import { meActions } from "./store/modules/me";
import GetMyData from "./hoc/GetMyData";
import { usersActions } from "./store/modules/users";
import { store } from "./store/store";

export let socket;
//소켓 연결
export const initSocketConnection = () => {
    if (socket) return;
    socket = io(`${process.env.REACT_APP_API_URL}`, {
        transports: ["websocket"],
    });
    socket.connect();
    socket.on("disconnect", () => {
        alert("연결이 종료되었습니다.");
        window.location.href = "/";
    });
    socket.on("updateNickname", (id, nickname) => {
        console.log(id, store.getState().me.id);
        if (id == store.getState().me.id) return;
        store.dispatch(usersActions.updateNickname({ id, nickname }));
    });
    socket.on("updateLocation", (id, top, left) => {
        if (id == store.getState().me.id) return;
        store.dispatch(usersActions.updateLocation({ id, top, left }));
    });
};

//채널 입장, 개설 및 해당 채널로 재연결
export const joinRoom = (roomNumber, dispatch) => {
    socket.emit("joinRoom", roomNumber);
    socket.on("joinSuccess", (id, data) => {
        //id는 joinSuccess를 발생시킨 유저의 id, data는 전체 유저의 데이터
        const myData = store.getState().me;
        let myId = "";

        if (!myData.id) {
            dispatch(meActions.update({ id, nickname: "" }));
            myId = id;
        }
        dispatch(
            usersActions.join(
                data.filter((user) => user[0] !== myId && user[0] !== myData.id)
            )
        );
        alert("입장");
    });
};

export const sendChat = (id, chat) => {
    socket.emit("chat", id, chat);
};

export const getChat = (setChat) => {
    socket.on("chat", (id, chat) => {
        setChat((prev) => [...prev, { id, chat }]);
    });
};
export const setNickname = (id, nickname) => {
    socket.emit("setNickname", id, nickname);
};

export const setLocation = () => {
    const myData = store.getState().me;
    socket.emit("setLocation", myData.id, {
        top: myData.top,
        left: myData.left,
    });
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
    if (socket == null || socket.connected === false) {
        return;
    }
    socket.disconnect();
    socket = undefined;
};
