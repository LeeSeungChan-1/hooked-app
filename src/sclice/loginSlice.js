import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/employeeApi.js";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil.js";

const initState = {
  username: "", // 사번
  employeeName: "", // 사원이름
  department: "", // 부서
  position: "", // 직책
  authorityList: [], // 권한 리스트
};

// export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
//   loginPost(param),
// );

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: getCookie("employee") || initState,
  reducers: { // 비동기 호출이 아닌 동기 즉각적으로 상태를 변경하는 데 사용
    login: (state, action) => { // 로그인 후 서버에서 받은 데이터를 쿠키와 상태값으로 저장
      const data = action.payload
      setCookie("employee", JSON.stringify(data), 1)
      return data
    },
    logout: () => { // 로그아웃 시 저장된 쿠키 삭제 및 상태값 초기화
      removeCookie("employee");
      return { ...initState };
    },
  },
  // extraReducers: (builder) => {
  //   // api와 같은 비동기 호출에 대한 요청을 처리하는 데 사용
  //   builder
  //     .addCase(loginPostAsync.pending, (state, action) => {
  //       // 작업 전
  //     })
  //     .addCase(loginPostAsync.fulfilled, (state, action) => {
  //       // 성공 시
  //       const payload = action.payload;
  //       if (!payload.error) {
  //         // 결과 값에 에러가 없을 경우 employee 쿠키 생성
  //         setCookie("employee", JSON.stringify(payload), 1);
  //       }
  //       return payload;
  //     })
  //     .addCase(loginPostAsync.rejected, (state, action) => {
  //       // 실패 시
  //       const payload = action.payload;
  //     });
  // },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
