import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import styles from "./User.module.scss";
import { useState, useEffect, useRef } from "react";
import { usersActions } from "../../store/modules/users";

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
    const myData = useAppSelector((state) => state.me);
    const dispatch = useDispatch();
    const [attackMotion, setAttackMotion] = useState(false);
    const [getHitMotion, setGetHitMotion] = useState(false);
    const getHitTimer = useRef<ReturnType<typeof setTimeout>>();
    useEffect(() => {
        if (!user[1].attacked) return;
        setAttackMotion(true);
        setTimeout(() => {
            setAttackMotion(false);
            dispatch(usersActions.attack({ id: user[0], attack: false }));
        }, 300);
    }, [user[1].attacked]);
    useEffect(() => {
        if (!user[1].getHitted) return;
        setGetHitMotion(true);
        if (getHitTimer.current) clearTimeout(getHitTimer.current);
        getHitTimer.current = setTimeout(() => {
            setGetHitMotion(false);
        }, 1000);
    }, [user[1].getHitted]);
    return (
        <div
            className={`${styles.user} ${attackMotion ? styles.attack : ""} ${
                getHitMotion ? styles.getHit : ""
            }`}
            style={{
                top: user[1].top + 225,
                left: user[1].left + 425,
                backgroundColor: user[1].team,
                opacity:
                    myData.health > 0 && user[1].health <= 0
                        ? 0
                        : myData.health <= 0 && user[1].health <= 0
                        ? 0.3
                        : 1,
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
