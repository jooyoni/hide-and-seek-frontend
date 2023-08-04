import { initSocketConnection, joinRoom, setNickname } from '../../socketio';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './Me.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { meActions } from '../../store/modules/me';
interface IUserType {
  id: string;
  nickname: string;
}
function Me() {
  const myData = useAppSelector((state) => state.me);
  const myDataRef = useRef({ ...myData });
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [intervalHelper, setIntervalHelper] = useState(0);

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

  function handleClientKeyDown(e: KeyboardEvent) {
    if (e.keyCode == 37) {
      setLeft(true);
    } else if (e.keyCode == 38) setTop(true);
    else if (e.keyCode == 39) {
      setRight(true);
    } else if (e.keyCode == 40) setBottom(true);
    setIsMoving(true);
  }
  function handleClientKeyUp(e: KeyboardEvent) {
    if (e.keyCode == 37) {
      setLeft(false);
    } else if (e.keyCode == 38) setTop(false);
    else if (e.keyCode == 39) {
      setRight(false);
    } else if (e.keyCode == 40) setBottom(false);
  }
  useEffect(() => {
    if (!top && !left && !bottom && !right) {
      setIsMoving(false);
      return;
    }
    let move = 5;
    if (top) myDataRef.current.top = myDataRef.current.top - move;
    if (left) myDataRef.current.left = myDataRef.current.left - move;
    if (bottom) myDataRef.current.top = myDataRef.current.top + move;
    if (right) myDataRef.current.left = myDataRef.current.left + move;
    dispatch(
      meActions.location({
        top: myDataRef.current.top,
        left: myDataRef.current.left,
      }),
    );
    setTimeout(() => {
      setIntervalHelper((prev) => prev + 1);
    }, 10);
  }, [isMoving, intervalHelper]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleClientKeyDown(e));
    document.addEventListener('keyup', (e) => handleClientKeyUp(e));
    return () => {
      document.removeEventListener('keydown', (e) => handleClientKeyDown(e));
      document.addEventListener('keyup', (e) => handleClientKeyUp(e));
    };
  }, []);
  console.log(myData.top);
  return (
    <>
      <article
        className={styles.character}
        style={{ top: myData.top, left: myData.left }}
      >
        me
      </article>
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
