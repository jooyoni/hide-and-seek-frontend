import { configureStore } from "@reduxjs/toolkit";
import me from "./modules/me";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import users from "./modules/users";
import gameInfo from "./modules/gameInfo";
export const store = configureStore({
    reducer: {
        me,
        users,
        gameInfo,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
