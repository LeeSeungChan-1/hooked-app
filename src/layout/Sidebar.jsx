// Sidebar.jsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    Collapse,
    Divider,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {getCookie} from "../util/cookieUtil.js";
import MenuEmployeeMui from "../component/employee/MenuEmployee.jsx";

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        menu1: false,
        menu2: false,
    });

    const handleToggleMenu = (menuId) => {
        setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
    };

    const loginState = useSelector((state) => state.loginSlice);

    const authorityList = getCookie('employee') ? getCookie('employee').authorityList : []; // 쿠키가 있으면 권한리스트 반환

    return (
        <Box
            sx={{
                width: 250,
                backgroundColor: 'grey.100',
                p: 2,
                borderRight: 1,
                borderColor: 'grey.300',
                overflowY: 'auto',
            }}
        >
            {/* 사용자 정보 영역 */}
            {loginState.username ?
                <>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            사용자 정보
                        </Typography>
                        <Typography variant="body2">사번: {loginState.username}</Typography>
                        <Typography variant="body2">이름: {loginState.employeeName}</Typography>
                        <Typography variant="body2">부서: {loginState.department}</Typography>
                        <Typography variant="body2">직책: {loginState.position}</Typography>
                        <Typography variant="body2">권한: {loginState.authorityList}</Typography>
                    </Box>
                </> : <></>
            }
            <Divider />
            {/* 사이드바 메뉴 영역 */}
            <List>
                <MenuEmployeeMui authorityList={authorityList} /> {/* 인사 */}

            </List>
        </Box>
    );
};

export default Sidebar;
