const header = {
    X_WWW_FORM_URLENCODED: {headers: {"Content-Type": "x-www-form-urlencoded"}}, // 기본 폼 전송 시
    MULTIPART_FORM_DATA: {headers: { "Content-Type": "multipart/form-data" }} // 파일이 같이 있는 경우 헤더 설정
}

export default header