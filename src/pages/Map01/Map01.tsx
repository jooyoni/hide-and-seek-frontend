import Chat from '../../components/Chat/Chat';
import Me from '../../components/Me/Me';
import { useAppSelector } from '../../store/store';
import styles from './Map01.module.scss';
function Map01() {
  const users = useAppSelector((state) => state.users);
  console.log(users);
  return (
    <main className={styles.map}>
      <Me />
      <Chat />
      {users.map((user, idx) => (
        <div className={styles.user}>{idx}</div>
      ))}
    </main>
  );
}
export default Map01;
