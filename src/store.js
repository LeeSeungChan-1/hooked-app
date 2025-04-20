// 앱의 상태를 유지하기 위한 스토어 -> app.js나 main.js에 적용
// 하나의 스토어 -> 여러 리듀서로 각각 관리
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./sclice/loginSlice.js";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});
