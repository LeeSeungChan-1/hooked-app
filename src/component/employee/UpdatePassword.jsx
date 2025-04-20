import React, {useState} from 'react'
import '../../css/form.css'
import {updatePasswordPut} from "../../api/employeeApi.js";
import {getCookie} from "../../util/cookieUtil.js";
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";

const initState = {
    number: getCookie('employee').username || '',
    password: '', // 현재 비밀번호
    newPassword: '', // 새 비밀번호
    newPasswordCheck: '', // 새 비밀번호확인
}


function UpdatePassword() {

    const [password, setPassword] = useState(initState)
    const [errors, setErrors] = useState({})

    const {replaceNavigate} = useCustomNavigate()


    const handleChange = (e) => { // 입력값으로 수정
        password[e.target.name] = e.target.value

        setPassword({...password})
    }

    const handleClick = async (e) => { // 저장
        e.preventDefault()
        setErrors({})

        if(password.newPassword !== password.newPasswordCheck){ // 비밀번호와 비밀번호 확인이 서로 같은지 확인
            alert('입력하신 비밀번호가 서로 다릅니다.')
            return null
        }

        const formData = new FormData()

        formData.append('number', password.number) // 사원번호
        formData.append('password', password.password) // 현재 비밀번호
        formData.append('newPassword', password.newPassword) // 새 비밀번호

        const res = await updatePasswordPut(formData)

        console.log(res)
        if(res.status === 200){ // ok
            alert('변경되었습니다.')
            replaceNavigate('/')
        }else if(res.status === 400){ // badRequest
            if(res.response.data){ // 반환된 오류가 있을 경우
                setErrors(res.response.data)
            }
        }

    }

    return (
        <>
            <div className='formTitle'>
                <h2>비밀번호변경</h2>
                <p>*는 필수 입력사항입니다.</p>
            </div>
            <form>
                <div>
                    <label htmlFor="password">*현재 비밀번호</label>
                    <input
                        id="password" name="password" type="password"
                        placeholder='현재 사용중인 비밀번호를 입력하세요.'
                        minLength={8} maxLength={20} required={true}
                        value={password.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.password ?
                    <div className="error-message" style={{ color: 'red' }}>
                        {errors.password}
                    </div> : <></>
                }
                <br/> {/* 현재, 새 비밀번호 보기 편하게 한칸 */}
                <div>
                    <label htmlFor="newPassword">*새 비밀번호</label>
                    <input
                        id="newPassword" name="newPassword" type="password"
                        placeholder='8~20자리(영어, 숫자, 특수문자)로 입력하셔야 합니다.'
                        minLength={8} maxLength={20} required={true}
                        value={password.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="newPasswordCheck">*새 비밀번호확인</label>
                    <input
                        id="newPasswordCheck" name="newPasswordCheck" type="password"
                        placeholder='8~20자리(영어, 숫자, 특수문자)로 입력하셔야 합니다.'
                        minLength={8} maxLength={20} required={true}
                        value={password.newPasswordCheck}
                        onChange={handleChange}
                    />
                </div>
                <div className='buttonDiv'>
                    <button onClick={handleClick}>변경</button>
                </div>
            </form>
        </>
    );
}

export default UpdatePassword