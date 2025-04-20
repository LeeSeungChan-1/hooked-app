import axios from "axios";
import Config from "../../config.js";
import jwtAxios from "../util/jwtUtil.js";
import apiHeader from "./apiHeader.js";

const { API_SERVER_HOST } = Config
const {X_WWW_FORM_URLENCODED, MULTIPART_FORM_DATA} = apiHeader

const host = `${API_SERVER_HOST}/api/employee`

export const loginPost = async (loginParam) => {
  const form = new FormData()
  form.append("username", loginParam.username)
  form.append("password", loginParam.password)

  const res = await axios.post(`${host}/login`, form, X_WWW_FORM_URLENCODED)

  return res.data
};

export const insertPost = async (employee) => {
    const res = await jwtAxios.post(`${host}/`, employee, MULTIPART_FORM_DATA)

    return res; // 상태값 사용으로 res 전체
};

export const updatePasswordPut = async (password) => {
  try {

    const res = await jwtAxios.put(`${host}/password`, password, X_WWW_FORM_URLENCODED);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const selectAllGet = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await jwtAxios.get(`${host}/list`, { params: { page, size } });

  return res.data;
};

export const selectGet = async (employeeId) => {
  const res = await jwtAxios.get(`${host}/read/${employeeId}`);

  return res.data;
};

export const deletePut = async (employeeId) => {
  // 삭제 x 상태값만 바꿈
  const res = await jwtAxios.put(`${host}/${employeeId}`);
  return res.data;
};
