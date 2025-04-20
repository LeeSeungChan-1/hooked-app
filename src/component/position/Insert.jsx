import React from 'react';
import '../../css/form.css'

const initState = {
    number: '',
    name: ''
}

function Insert(props) {
    return (
        <>
            <div className='formTitle'>
                <h2>사원등록</h2>
                <p>*는 필수 입력사항입니다.</p>
            </div>
            <form>
                <div>
                    <label htmlFor="number">*사원번호</label>
                    <input id="number" name="number" type="text" minLength={8} maxLength={8} required={true}/>
                </div>
                <div>
                    <label htmlFor="password">*비밀번호</label>
                    <input id="password" name="password" type="password" minLength={8} maxLength={20} required={true}/>
                </div>
                <div>
                    <label htmlFor="passwordCheck">*비밀번호확인</label>
                    <input id="passwordCheck" name="passwordCheck" type="password" minLength={8} maxLength={20} required={true}/>
                </div>
                <div>
                    <label htmlFor="name">*이름</label>
                    <input id="name" name="name" type="text" minLength={3} maxLength={10} required={true}/>
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input id="email" name="email" type="email" minLength={10} maxLength={50}/>
                </div>
                <div>
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input id="phoneNumber" name="phoneNumber" type="tel" minLength={10} maxLength={11}/>
                </div>
                <div>
                    <label htmlFor="hireDate">고용일자</label>
                    <input id="hireDate" name="hireDate" type="Date"/>
                </div>
                <div>
                    <label htmlFor="employeeImage">사진</label>
                    <input id="employeeImage" name="employeeImage" type="file"/>
                </div>
                <div className='buttonDiv'>
                    <button>등록</button>
                </div>
            </form>
        </>
    );
}

export default Insert;