import Chat from '../../components/Chat/Chat';
import Me from '../../components/Me/Me';
import styles from './Map01.module.scss';
function Map01() {
  return (
    <main className={styles.map}>
      <Me />
      <Chat />
    </main>
  );
}
export default Map01;
