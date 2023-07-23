import styles from "./Map01.module.scss";
import Me from "../../Components/Me/Me";
import Chat from "../../Components/Chat/Chat";
function Map01() {
    return (
        <main className={styles.map}>
            <Me />
            <Chat />
        </main>
    );
}
export default Map01;
