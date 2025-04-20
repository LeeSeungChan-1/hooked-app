import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";

export default function NotFound() {
    const {replaceNavigate} = useCustomNavigate();

    const handleGoHome = () => {
        replaceNavigate('/'); // 홈으로 이동
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 2,
                    p: 2,
                }}
            >
                <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
                    404
                </Typography>
                <Typography variant="h5" component="h2">
                    페이지를 찾을 수 없습니다.
                </Typography>
                <Typography variant="body1">
                    요청하신 페이지가 존재하지 않거나, 주소가 잘못되었습니다.
                </Typography>
                <Button variant="contained" onClick={handleGoHome} sx={{ mt: 4 }}>
                    홈으로 돌아가기
                </Button>
            </Box>
        </Container>
    );
}


