import axiosClient from "./axiosClient";

export const createRoom = async () => {
    let res = await axiosClient.post(`/create-room`);
    if (res.data.success) return res.data;
    else return false;
};
