import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config.js';
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function MenuEmployee({ authorityList }) {
    // 하위 메뉴 펼침 상태 관리
    const [insertOpen, setInsertOpen] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);

    return (
        <>
            {/* 인사 - 등록 메뉴 (권한 확인) */}
            {(authorityList.includes('dvAll') ||
                authorityList.includes(config.PREFIX_AUTHORITY.employeeInsert)) && (
                <>
                    <ListItemButton onClick={() => setInsertOpen(!insertOpen)}>
                        <ListItemText primary="인사 - 등록" />
                        {insertOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={insertOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/employee/register"
                            >
                                <ListItemText primary="사원등록" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/department/register"
                            >
                                <ListItemText primary="부서등록" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/position/register"
                            >
                                <ListItemText primary="직책등록" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </>
            )}

            {/* 인사 - 조회 메뉴 (권한 확인) */}
            {(authorityList.includes('dvAll') ||
                authorityList.includes(config.PREFIX_AUTHORITY.employeeSelect)) && (
                <>
                    <ListItemButton onClick={() => setSelectOpen(!selectOpen)}>
                        <ListItemText primary="인사 - 조회" />
                        {selectOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={selectOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/employee/read"
                            >
                                <ListItemText primary="사원조회" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/employee/list"
                            >
                                <ListItemText primary="사원전체조회" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/department/list"
                            >
                                <ListItemText primary="부서조회" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/department/list"
                            >
                                <ListItemText primary="부서전체조회" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/position/list"
                            >
                                <ListItemText primary="직책조회" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                component={Link}
                                to="/position/list"
                            >
                                <ListItemText primary="직책전체조회" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </>
            )}
        </>
    );
}

export default MenuEmployee;
