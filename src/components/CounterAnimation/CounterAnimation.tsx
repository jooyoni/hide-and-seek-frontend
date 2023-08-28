import { useAppDispatch } from "../../store/store";
import styles from "./CounterAnimation.module.scss";
import { gameInfoActions } from "../../store/modules/gameInfo";
import { useState, useEffect } from "react";
interface IPropsType {
    setCounterAnimationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function CounterAnimation({ setCounterAnimationOpen }: IPropsType) {
    const [count, setCount] = useState(3);
    const [animation, setAnimation] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (animation)
            setTimeout(() => {
                setAnimation(false);
            }, 1200);
        else
            setTimeout(() => {
                if (count == 0) {
                    dispatch(gameInfoActions.isMovable());
                    setCounterAnimationOpen(false);
                }
                setCount((prev) => prev - 1);
                setAnimation(true);
            }, 10);
    }, [animation]);
    return (
        <div
            className={`${styles.container} ${
                animation ? styles.animation : ""
            }`}
        >
            {count || "GAME START!"}
        </div>
    );
}
export default CounterAnimation;
