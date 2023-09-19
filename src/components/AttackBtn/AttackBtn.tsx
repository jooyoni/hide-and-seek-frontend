import { useAppSelector } from "../../store/store";
import styles from "./AttackBtn.module.scss";
import { useState, useEffect } from "react";

function AttackBtn() {
    const [attackTimestamp, setAttackTimestamp] = useState(0);
    const [attackCooltime, setAttackCooltime] = useState(0);
    const myData = useAppSelector((state) => state.me);

    useEffect(() => {
        if (myData.attacked) setAttackTimestamp(new Date().getTime());
    }, [myData.attacked]);
    useEffect(() => {
        if (!attackTimestamp) return;
        setTimeout(() => {
            setAttackCooltime(() => {
                const NOW = new Date().getTime();
                let newVal = NOW - attackTimestamp;
                if (newVal >= 3000) newVal = 0;
                return newVal;
            });
        }, 15);
    }, [attackTimestamp, attackCooltime]);
    return (
        <article className={styles.attackBtn}>
            <span>SPACEBAR</span>
            <div
                className={`${styles.coolTimeShadow} ${
                    myData.attacked ? styles.coolTime : ""
                }`}
                style={{
                    background: `conic-gradient(
                            rgba(0, 0, 0, 1) ${
                                (attackCooltime / 3000) * 360
                            }deg,
                            rgba(255, 255, 255, 0) 0deg
                        )`,
                }}
            ></div>
        </article>
    );
}
export default AttackBtn;
