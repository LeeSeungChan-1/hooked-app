import React, {useEffect,useState} from 'react'
import '../../css/form.css'
import {selectGet} from "../../api/employeeApi.js";
import {useParams} from "react-router-dom";
import useCustomLogin from "../../hook/useCustomLogin.jsx";
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";

const initState = {
    id: '', // 사원id
    number: '', // 사원번호
    name: '', // 이름
    email: '', // 이메일
    phoneNumber: '', // 전화번호
    hireDate: '', // 고용일자
    status: '', // 상태
    department: {name: ''}, // 부서
    position: {name: ''}, // 직책
    imageUrl: '', // 사진파일
}




function Select() {

    const [employee, setEmployee] = useState(initState)

    const {replaceNavigate} = useCustomNavigate()

    const {employeeId} = useParams()

    useEffect(() => {
        selectGet(employeeId).then(data=>{
            setEmployee(data)
        })
    }, [employeeId])


    return (
        <>
            <div className='formTitle'>
                <h2>사원조회</h2>
            </div>
            <form>
                <div>
                    <img
                        src={employee.imageUrl || '/public/image/employee/default.png'}
                        alt="미리보기"
                        style={{ width: '130px', height: '150px', objectFit: 'fill' }}
                    />
                </div>
                <div>
                    <label htmlFor="number">사원번호</label>
                    <input
                        id="number" name="number" type="text"
                        minLength={8} maxLength={8} required={true} readOnly={true}
                        value={employee.number}
                    />
                </div>
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        id="name" name="name" type="text"
                        minLength={2} maxLength={10} required={true} readOnly={true}
                        value={employee.name}
                    />
                </div>
                <div>
                    <label htmlFor="name">부서</label>
                    <input
                        id="departmentName" name="departmentName" type="text"
                        minLength={2} maxLength={10} required={true} readOnly={true}
                        value={employee.department.name}
                    />
                </div>
                <div>
                    <label htmlFor="name">직책</label>
                    <input
                        id="positionName" name="positionName" type="text"
                        minLength={2} maxLength={10} required={true} readOnly={true}
                        value={employee.position.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email" name="email" type="email"
                        minLength={10} maxLength={50} readOnly={true}
                        value={employee.email}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input
                        id="phoneNumber" name="phoneNumber" type="tel"
                        minLength={10} maxLength={11} readOnly={true}
                        value={employee.phoneNumber}
                    />
                </div>
                <div>
                    <label htmlFor="hireDate">고용일자</label>
                    <input
                        id="hireDate" name="hireDate" type="Date"
                        readOnly={true}
                        value={employee.hireDate}
                    />
                </div>
                <div>
                    <label htmlFor="status">상태</label>
                    <input
                        id="status" name="status" type="text"
                        readOnly={true}
                        value={employee.status}
                    />
                </div>
                <div className='buttonDiv'>
                    <button
                        className='button-yellow'
                        onClick={() => replaceNavigate('/employee/modify')}
                    >수정</button>
                    <button
                        className='button-red'
                        onClick={() => replaceNavigate('/employee/delete')}
                    >삭제</button>
                </div>
            </form>
        </>
    );
}

export default Select