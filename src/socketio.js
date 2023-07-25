import { io } from 'socket.io-client';
import axiosClient from './utils/axiosClient';
import { meActions } from './store/modules/me';
import GetMyData from './hoc/GetMyData';

export let socket;
//소켓 연결
export const initSocketConnection = () => {
  if (socket) return;
  socket = io('http://172.30.1.71:5000/', {
    transports: ['websocket'],
  });
  socket.connect();
};

//채널 입장, 개설 및 해당 채널로 재연결
export const joinRoom = (roomNumber, userData, dispatch) => {
  socket.emit('joinRoom', roomNumber);
  socket.on('joinSuccess', (id) => {
    if (!userData.id) dispatch(meActions.update({ id, nickname: '' }));
    alert('입장');
  });
};

export const sendChat = (id, chat) => {
  socket.emit('chat', id, chat);
};

export const getChat = (setChat) => {
  socket.on('chat', (id, chat) => {
    setChat((prev) => [...prev, { id, chat }]);
  });
};
export const setNickname = (id, nickname) => {
  socket.emit('setNickname', id, nickname);
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
  socket = undefined;
};
