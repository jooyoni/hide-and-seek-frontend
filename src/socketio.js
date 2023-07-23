import { io } from "socket.io-client";
import axiosClient from "./utils/axiosClient";

export let socket;

//소켓 연결
export const initSocketConnection = () => {
    if (socket) return;
    socket = io("http://localhost:5000/", {
        transports: ["websocket"],
    });
    socket.connect();
};

//채널 입장, 개설 및 해당 채널로 재연결
export const joinRoom = (roomNumber, userData, setUserData) => {
    socket.emit("joinRoom", roomNumber);
    socket.on("joinSuccess", (id) => {
        console.log(id);
        if (!userData.id) setUserData((prev) => ({ ...prev, id }));
        alert("입장");
    });
};

export const sendChat = (chat) => {
    socket.emit("chat", chat);
};

export const getChat = (setChat) => {
    socket.on("chat", (chat) => {
        setChat((prev) => [...prev, chat]);
    });
};
export const setNickname = (id, nickname) => {
    socket.emit("setNickname", id, nickname);
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
    if (socket == null || socket.connected === false) {
        return;
    }
    socket.disconnect();
    socket = undefined;
};
