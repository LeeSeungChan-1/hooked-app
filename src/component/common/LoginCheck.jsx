import {getCookie, setCookie} from "../../util/cookieUtil.js"
import {Navigate, useNavigate} from "react-router-dom"
import {refreshJWT} from "../../util/jwtUtil.js";
import {useEffect, useState} from "react";
import {logout} from "../../sclice/loginSlice.js";
import {useDispatch} from "react-redux";
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";

export default function LoginCheck ({authority, children}) {

    const [token, setToken] = useState(true);

    const dispatch = useDispatch()

    const {componentNavigate} = useCustomNavigate();

    useEffect(() => {
        if(employeeCookie){ // 쿠키가 존재하면
            refreshJWT(employeeCookie.accessToken, employeeCookie.refreshToken).then(data => { // 쿠키 상태 확인
                if(data.accessToken && data.refreshToken){ // 토큰 정상 반환 시

                    employeeCookie.accessToken = data.accessToken
                    employeeCookie.refreshToken = data.refreshToken
                    setCookie('employee', JSON.stringify(employeeCookie), 1) // 쿠키 새로 설정
                }else{ // 토큰 예외처리로 값이 없을 때
                    setToken(false)
                    dispatch(logout()) // 로그아웃 loginSlice에 반영
                }
            })
        }

    }, [children]) // 하위 컴포넌트가 바뀔 때 마다 실행(토큰 검사)

    const employeeCookie = getCookie("employee") // useEffect에서도 같은 값 사용
    if(!employeeCookie){ // 로그인 후 발급된 쿠키가 있는지 확인
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
        return componentNavigate('/employee/login')
    }

    if(!token){
        alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.')
        return componentNavigate('/employee/login')
    }

    if(authority) { // 검사할 권한이 설정되어 있을 경우
        const employeeAuthorityList = employeeCookie.authorityList
        if(employeeAuthorityList.includes('dvAll')){ // 개발자 권한 패스
            return children
        }
        if (employeeAuthorityList.includes(authority)) { // 권한이 있는 경우
            return children
        }else{
            alert('권한이 없습니다. 메인 화면으로 이동합니다.')
            return componentNavigate('/')
        }
    }else{
        return children
    }

}


