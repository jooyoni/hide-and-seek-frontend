import { useAppSelector } from "../../store/store";
import styles from "./User.module.scss";
interface IUserDataType {
    user: [
        string,
        {
            nickname: string;
            top: number;
            left: number;
            team: "red" | "blue";
            isAdmin: boolean;
            isReady: boolean;
            health: number;
            attacked: boolean;
            getHitted: number;
        }
    ];
}
function User({ user }: IUserDataType) {
    const gameInfo = useAppSelector((state) => state.gameInfo);

    return (
        <div
            className={styles.user}
            style={{
                top: user[1].top + 225,
                left: user[1].left + 425,
                backgroundColor: user[1].team,
            }}
        >
            <div className={styles.health}>
                <div
                    style={{
                        width: `${user[1].health}%`,
                        background: user[1].team,
                    }}
                ></div>
            </div>
            <span className={styles.nickname}>
                {!gameInfo.isGaming &&
                    `(${
                        user[1].isAdmin
                            ? "방장"
                            : user[1].isReady
                            ? "준비완료"
                            : "준비안함"
                    })`}

                {user[1].nickname ? user[1].nickname : ""}
            </span>
        </div>
    );
}
export default User;
