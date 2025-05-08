import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookieUtil.js";

const jwtAxios = axios.create();

const API_SERVER_HOST = import.meta.env.VITE_API_SERVER_HOST;

export const refreshJWT = async (accessToken, refreshToken) => {
  // jwt 토큰 만료 시 access토큰 새로 발급받는 함수

  const host = API_SERVER_HOST;

  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("accessToken", accessToken);
  form.append("refreshToken", refreshToken);

  const res = await axios.post(`${host}/api/token/refresh`, form, header);

  return res.data;
};

const beforeReq = (config) => {
  // jwt 토큰을 사용한 인증이 필요한 api 호출 이전에 작동

  const employeeCookie = getCookie("employee");

  if (!employeeCookie) {
    // 쿠키가 없을 경우 에러
    return Promise.reject({
      response: {
        data: {
          error: "REQUIRE_LOGIN_ERROR",
        },
      },
    });
  } // end if

  config.headers.Authorization = `Bearer ${employeeCookie.accessToken}`; // 헤더에 토큰 설정

  return config; // 요청보내기
};

const requestFail = (error) => {
  return Promise.reject(error);
};

const beforeRes = async (res) => {
  // 결과 반환 이전에 작동
  const data = res.data;

  if (data.error === "ExpiredJwtException") {
    // 토큰 만료 에러일 경우
    const employeeCookie = getCookie("employee");

    const result = await refreshJWT(
      employeeCookie.accessToken,
      employeeCookie.refreshToken,
    );

    if (result.error === "ExpiredJwtException") {
      // 리프레쉬 토큰으로 요청한 값이 오류일 경우 새로 로그인 하도록 기존 쿠키 삭제
      removeCookie("employee");
      alert("세션이 만료되었습니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/employee/login";
      return Promise.reject(result.error);
    }

    employeeCookie.accessToken = result.accessToken;
    employeeCookie.refreshToken = result.refreshToken;

    setCookie("employee", JSON.stringify(employeeCookie), 1);

    const originalRequest = res.config; // 원래 요청 가져오기

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`; // 원래 요청에 새로운 access토큰 설정

    return await axios(originalRequest); // 다시요청
  } else if (data.error === "JwtException") {
    // 기타 토큰 에러일 경우
    removeCookie("employee");
    alert("세션이 만료되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/employee/login";
    return Promise.reject(data.error);
  }

  return res; // jwt 관련 에러 없으면 결과값 반환
};

const responseFail = (error) => {
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
