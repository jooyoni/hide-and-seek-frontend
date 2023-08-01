import { io } from 'socket.io-client';
import axiosClient from './utils/axiosClient';
import { meActions } from './store/modules/me';
import GetMyData from './hoc/GetMyData';
import { usersActions } from './store/modules/users';
import { store } from './store/store';

export let socket;
//소켓 연결
export const initSocketConnection = () => {
  if (socket) return;
  socket = io(`${process.env.REACT_APP_API_URL}`, {
    transports: ['websocket'],
  });
  socket.connect();
  socket.on('disconnect', () => {
    alert('연결이 종료되었습니다.');
    window.location.href = '/';
  });
  socket.on('updateNickname', (id, nickname) => {
    alert(nickname);
    if (id == store.getState().me.id) return;
    store.dispatch(usersActions.updateNickname({ id, nickname }));
  });
};

//채널 입장, 개설 및 해당 채널로 재연결
export const joinRoom = (roomNumber, dispatch) => {
  socket.emit('joinRoom', roomNumber);
  socket.on('joinSuccess', (id, data) => {
    const myData = store.getState().me;

    //id는 joinSuccess를 발생시킨 유저의 id, data는 전체 유저의 데이터
    if (!myData.id) dispatch(meActions.update({ id, nickname: '' }));
    dispatch(usersActions.join(data.filter((user) => user[0] !== id)));
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
