import React, { useRef, useState } from 'react';
import { Container, Paper, Box, Typography, TextField, Button, Link } from '@mui/material';
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";
import {loginPost} from "../../api/employeeApi.js";
import {useDispatch} from "react-redux";
import {login} from "../../sclice/loginSlice.js";

const initState = {
    username: '',
    password: ''
}

function Login() {
    const [loginParam, setLoginParam] = useState({ ...initState });
    const inputUsername = useRef()
    const inputPassword = useRef()

    const {replaceNavigate} = useCustomNavigate()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...loginParam})
    }

    const dispatch = useDispatch()

    const handleClickLogin = async (e) => {
        e.preventDefault();
        if (!loginParam.username) {
            alert('아이디를 입력하세요.');
            inputUsername.current.focus();
            return;
        }
        if (!loginParam.password) {
            alert('비밀번호를 입력하세요.');
            inputPassword.current.focus();
            return;
        }

        try {
            const data = await loginPost(loginParam);
            dispatch(login(data))
            replaceNavigate('/')
        } catch (error) { // 에러가 발생하면
            alert(error.response.data.error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    로그인
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    *는 필수 입력사항입니다.
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleClickLogin}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                >
                    <TextField
                        label="아이디 (사원번호)"
                        name="username"
                        type="text"
                        required
                        fullWidth
                        autoFocus
                        margin="normal"
                        InputProps={{
                            inputProps: { minLength: 8, maxLength: 8 }
                        }}
                        inputRef={inputUsername}
                        value={loginParam.username}
                        onChange={handleChange}
                    />
                    <TextField
                        label="비밀번호"
                        name="password"
                        type="password"
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            inputProps: { minLength: 8, maxLength: 20 }
                        }}
                        inputRef={inputPassword}
                        value={loginParam.password}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        로그인
                    </Button>
                    {/* 비밀번호 찾기 링크를 포함한 Box */}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link href="#" variant="body2">
                            비밀번호를 잊으셨나요?
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
