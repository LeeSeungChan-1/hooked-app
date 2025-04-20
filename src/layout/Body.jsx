// AppLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const Body = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* 왼쪽 사이드바 */}
            <Sidebar />
            {/* 오른쪽 메인 콘텐츠 영역 */}
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                {children}
            </Box>
        </Box>
    );
};

export default Body;
