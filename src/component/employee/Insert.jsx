import React, {useEffect, useRef, useState} from 'react'
import '../../css/form.css'
import {insertPost} from "../../api/employeeApi.js";
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";
import {selectAllGet} from "../../api/positionApi.js";

const initState = {
    number: '', // 사원번호
    name: '', // 이름
    email: '', // 이메일
    phoneNumber: '', // 전화번호
    hireDate: '', // 고용일자
    employeeImage: null, // 사진파일
    employeeImagePreview: '', // 사진 미리보기
}

function Insert() {

    const [employee, setEmployee] = useState(initState) // 서버로 보낼 상태
    const [errors, setErrors] = useState({}) // 서버 에러를 담는 상태

    const {replaceNavigate} = useCustomNavigate()

    const uploadRef = useRef() // component 재사용 시 useRef 유일하게 dom element 식별

    const handleChange = (e) => { // 입력값으로 수정
        const { name, value } = e.target

        setEmployee(prevState => ({
            ...prevState,
            [name]: value})
        )
    }

    const handleFileChange = () => {
        if(uploadRef.current.files[0]){ // 수정한 값이 있을 때만 저장

            const employeeImage = uploadRef.current.files[0] // 이미지 저장

            if(!['image/png', 'image/jpg', 'image/jpeg'].includes(employeeImage.type) || !/\.(jpg|jpeg|png)$/i.test(employeeImage.name)){ // 이미지 형식 검사
                alert('이미지는 jpg, jpeg, png 형식으로만 입력이 가능합니다.')
                uploadRef.current.value = ""; // 파일 초기화
                return false
            }

            const maxSize = 0.5 * 1024 * 1024; // 파일 크기 제한 500KB

            if (employeeImage.size > maxSize) { // 파일의 사이즈가 큰 경우
                alert('파일 크기가 너무 큽니다. 500KB 이하의 파일을 선택해주세요.')
                uploadRef.current.value = ""; // 선택된 파일 초기화
                return false
            }

            const employeeImagePreview = URL.createObjectURL(employeeImage) // 미리보기 이미지 url 저장

            createImageBitmap(employeeImage) // 이미지를 받고 promise 반환
                .then((imageBitmap) => { // 이미지 가로 세로 길이 검증
                    const width = imageBitmap.width;
                    const height = imageBitmap.height;

                    if (width < 350 || width > 450 || height < 450 || height > 550) {
                        alert('사진은 가로: 350~450, 세로: 450~550까지만 가능합니다.');
                        uploadRef.current.value = ""; // 파일 초기화
                        return false;
                    }

                    // 이미지가 유효하면 추가 작업 진행
                    return true;
                }).then(result => { // 검증을 통과할 경우 추가 작업
                    if(result){
                        employee['employeeImage'] = employeeImage
                        employee['employeeImagePreview'] = employeeImagePreview
                        setEmployee({...employee})
                    }
                })
                .catch((error) => {
                    alert('이미지를 처리하는 중 오류가 발생했습니다.');
                    console.error(error);
                    uploadRef.current.value = ""; // 파일 초기화
                    return false;
                });

        }else{ // 수정 값이 없으면 기본 이미지
            employee['employeeImagePreview'] = '/hooked-app/public/image/employee/default.png';
            setEmployee({...employee})
        }
    }

    const handleClick = async (e) => { // 저장
        e.preventDefault()
        setErrors({})

        if(! /^\d+$/.test(employee.number)){ // 사원번호가 숫자로만 이루어 졌는지 확인
            alert('사원번호는 숫자로만 입력이 가능합니다.')
            return false
        }
        if(employee.email){
            if(! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)){ // 이메일 형식이 맞지 않으면
                alert('이메일 형식이 올바르지 않습니다.')
                return false
            }
        }
        if(employee.phoneNumber){
            if(! /^\d+$/.test(employee.phoneNumber)){ // 전화번호가 숫자로만 이루어 졌는지 확인
                alert('전화번호는 숫자로만 입력이 가능합니다.')
                return false
            }
        }
        if(employee.employeeImage){
            if(!['image/png', 'image/jpg', 'image/jpeg'].includes(employee.employeeImage.type) || !/\.(jpg|jpeg|png)$/i.test(employee.employeeImage.name)){ // 이미지 형식 검사
                alert('이미지는 jpg, jpeg, png 형식으로만 입력이 가능합니다.')
                return false
            }
        }


        const formData = new FormData()

        formData.append('number', employee.number)
        formData.append('password', (employee.number+'a!')) // 기본값은 사번+a! 인사 관리자가 생성 후 사원이 비밀번호 변경
        formData.append('name', employee.name)
        formData.append('email', employee.email)
        formData.append('phoneNumber', employee.phoneNumber)
        formData.append('hireDate', employee.hireDate)

        if(employee.employeeImage){ // 저장된 이미지가 있을 경우에만 폼과 같이 요청
            formData.append('employeeImage', employee.employeeImage)
        }

        try {
            console.log('요청')
            const res = await insertPost(formData)
            alert('저장되었습니다.')
            // replaceNavigate('/employee/read/'+res.data.id)
        }catch(error){
            console.log('에러')
            console.log(error)
            setErrors(error.response.data)
        }


    }

    return (
        <>
            <div className='formTitle'>
                <h2>사원등록</h2>
                <p>*는 필수 입력사항입니다.</p>
            </div>
            <form>
                <div>
                    <img
                        src={employee.employeeImagePreview || '/image/employee/default.png'}
                        alt="미리보기"
                        style={{ width: '130px', height: '150px', objectFit: 'fill' }}
                    />
                </div>
                <div>
                    <label htmlFor="number">*사원번호</label>
                    <input
                        id="number" name="number" type="text"
                        placeholder='사원번호는 8자리로 입력하셔야합니다.'
                        minLength={8} maxLength={8} required={true}
                        value={employee.number}
                        onChange={handleChange}
                    />
                </div>
                {errors.number ?
                    <div className="error-message" style={{ color: 'red' }}>
                        {errors.number}
                    </div> : <></>
                }
                <div>
                    <label htmlFor="name">*이름</label>
                    <input
                        id="name" name="name" type="text"
                        placeholder='이름은 2~10자리로 입력하셔야합니다.'
                        minLength={2} maxLength={10} required={true}
                        value={employee.name}
                        onChange={handleChange}
                    />
                </div>
                {errors.name ?
                    <div className="error-message" style={{ color: 'red' }}>
                        {errors.name}
                    </div> : <></>
                }
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email" name="email" type="email"
                        placeholder='이메일은 10~50자리로 입력하셔야합니다.'
                        minLength={10} maxLength={50}
                        value={employee.email}
                        onChange={handleChange}
                    />
                </div>
                {errors.email ?
                    <div className="error-message" style={{ color: 'red' }}>
                        {errors.email}
                    </div> : <></>
                }
                <div>
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input
                        id="phoneNumber" name="phoneNumber" type="tel"
                        placeholder='전화번호는 10~11자리로 입력하셔야합니다.'
                        minLength={10} maxLength={11}
                        value={employee.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                {errors.phoneNumber ?
                    <div className="error-message" style={{ color: 'red' }}>
                        {errors.phoneNumber}
                    </div> : <></>
                }
                <div>
                    <label htmlFor="hireDate">고용일자</label>
                    <input
                        id="hireDate" name="hireDate" type="Date"
                        value={employee.hireDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="employeeImage">사진</label>
                    <input
                        id="employeeImage" name="employeeImage" type="file" accept="image/png, image/jpg, image/jpeg"
                        ref={uploadRef}
                        onChange={handleFileChange}
                    />
                </div>
                <div className='buttonDiv'>
                    <button onClick={handleClick}>등록</button>
                </div>
            </form>
        </>
    );
}

export default Insert