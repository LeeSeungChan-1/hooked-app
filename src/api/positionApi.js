import jwtAxios from "../util/jwtUtil.js";

const API_SERVER_HOST = import.meta.env.VITE_API_SERVER_HOST;
const host = `${API_SERVER_HOST}/api/position`

export const selectAllGet = async (pageParam) => {
    const { page, size } = pageParam;

    const res = await jwtAxios.get(`${host}/password`, { params: { page, size } });

    return res.data;
};