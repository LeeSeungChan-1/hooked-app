import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../sclice/loginSlice.js";

const useCustomLogin = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const loginState = useSelector(state => state.loginSlice)

    const isLogin = loginState.username ? true : false

    const doLogout = () => {
        dispatch(logout())
        alert('로그아웃 되었습니다.')
        moveToPath('/employee/login')
    }

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace: true})
    }

    return {loginState, isLogin, moveToPath, doLogout}
}

export default useCustomLogin