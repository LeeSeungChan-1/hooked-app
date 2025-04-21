import jwtAxios from "../util/jwtUtil.js";
import Config from "../../config.js";
const { API_SERVER_HOST } = Config

const host = `${API_SERVER_HOST}/api/position`

export const selectAllGet = async (pageParam) => {
    const { page, size } = pageParam;

    const res = await jwtAxios.get(`${host}/password`, { params: { page, size } });

    return res.data;
};