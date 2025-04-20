import React, {useEffect, useState} from 'react';
import {selectAllGet} from "../../api/employeeApi.js";
import useCustomMove from "../../hook/useCustomMove.jsx";
import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Page from "../common/Page.jsx";
import useCustomNavigate from "../../hook/useCustomNavigate.jsx";

const initState = {
    content: [],
    pageNumber: [],
    pageRequestDto: null,
    hasPreviousPage: false,
    prevPage: 0,
    hasNextPage: false,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}

function List() {

    const {page, size, moveToList} = useCustomMove()

    const {navigate} = useCustomNavigate()

    const [serverData, setServerData] = useState(initState)

    useEffect(() => {
        selectAllGet({page: page, size: size}).then(data=>{
            console.log(data)
            setServerData(data)
        })
    }, [page, size])

    const handleRowClick = (employeeId) => {
        navigate('/employee/read/'+employeeId)
    }

    return (
    <TableContainer component={Paper} sx={{ mt: 4, mx: 'auto', maxWidth: 'lg' }}>
        <Typography variant="h4" component="h2" align="center" sx={{ py: 2 }}>
            사원 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">사진</TableCell>
                    <TableCell align="center">이름</TableCell>
                    <TableCell align="center">사번</TableCell>
                    <TableCell align="center">부서</TableCell>
                    <TableCell align="center">직책</TableCell>
                    <TableCell align="center">전화번호</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">고용일자</TableCell>
                    <TableCell align="center">상태</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {serverData.content.map((employee) => (
                    <TableRow key={employee.id}
                              onClick={() => handleRowClick(employee.id)}
                              sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                      backgroundColor: (theme) => theme.palette.action.hover
                                  }
                              }}
                    >
                        <TableCell align="center">
                            <Avatar alt={employee.name} src={employee.imageUrl} />
                        </TableCell>
                        <TableCell align="center">{employee.name}</TableCell>
                        <TableCell align="center">{employee.number}</TableCell>
                        <TableCell align="center">{employee.departmentName}</TableCell>
                        <TableCell align="center">{employee.positionName}</TableCell>
                        <TableCell align="center">{employee.phoneNumber}</TableCell>
                        <TableCell align="center">{employee.email}</TableCell>
                        <TableCell align="center">{employee.hireDate}</TableCell>
                        <TableCell align="center">{employee.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Page serverData={serverData} moveToList={moveToList}/>
    </TableContainer>
    );
}

export default List