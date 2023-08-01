import { initSocketConnection, joinRoom, setNickname } from '../../socketio';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Me.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { meActions } from '../../store/modules/me';
interface IUserType {
  id: string;
  nickname: string;
}
function Me() {
  const myData = useAppSelector((state) => state.me);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const [nicknameInput, setNicknameInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { roomNumber } = useParams();
  useEffect(() => {
    initSocketConnection();
    joinRoom(roomNumber, dispatch);
  }, []);

  function nicknameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(meActions.update({ id: myData.id, nickname: nicknameInput }));
    setNickname(myData.id, nicknameInput);
  }

  return (
    <>
      <div>me</div>
      {!myData.nickname && (
        <form
          onSubmit={(e) => nicknameSubmit(e)}
          className={styles.nicknameForm}
        >
          <h3>닉.</h3>
          <input
            type="text"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.currentTarget.value)}
          />
          <button>확인</button>
        </form>
      )}
    </>
  );
}
export default Me;
