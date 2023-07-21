import { io } from 'socket.io-client';

export let socket = io('172.30.1.71:5000', {
  transports: ['websocket'],
});
export const initSocketConnection = () => {
  if (socket) return;
  socket.connect();
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketMessage = (message) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  socket.emit('receivetest', message);
};

let cbMap = new Map();

// 해당 이벤트를 받고 콜백 함수를 실행함
export const socketInfoReceived = (setChats) => {
  console.log(setChats);
  socket.on('message', (data) => {
    setChats((prev) => [...prev, data]);
    console.log(data);
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
