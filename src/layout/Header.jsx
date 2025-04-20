// Header.jsx
// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import useCustomLogin from '../hook/useCustomLogin.jsx';
// import { AppBar, Toolbar, Box, Menu, MenuItem, Button, Typography } from '@mui/material';




import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DomainIcon from '@mui/icons-material/Domain';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useCustomLogin from "../hook/useCustomLogin.jsx";
import {useState} from "react";

function Header() {
    const loginState = useSelector((state) => state.loginSlice);
    const { doLogout } = useCustomLogin();
    const navigate = useNavigate();
    //
    const handleClickLogout = (e) => {
        e.preventDefault();
        handleCloseUserMenu()
        if (confirm('로그아웃 하시겠습니까?')) {
            doLogout();
        }
    };

    const handleProfile = () => {
        handleCloseUserMenu()
        navigate('/employee/profile');
    };

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}

                >
                    <DomainIcon sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Hooked
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    {loginState.employeeName ?(
                        <Button onClick={handleOpenUserMenu} color="inherit">
                                {loginState.employeeName}
                        </Button>) :(
                        <Button color="inherit" onClick={() => navigate('/employee/login')}>
                            로그인
                        </Button>)
                    }
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {loginState.username ? [
                                <MenuItem key={'profile'} onClick={handleProfile}>
                                    <Typography sx={{ textAlign: 'center' }}>프로필 보기</Typography>
                                </MenuItem>,
                                <MenuItem key={'logout'} onClick={handleClickLogout}>
                                    <Typography sx={{ textAlign: 'center' }}>로그아웃</Typography>
                                </MenuItem>]
                             : null
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    );
}

export default Header;
