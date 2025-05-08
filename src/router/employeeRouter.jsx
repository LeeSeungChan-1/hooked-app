import React, {lazy} from "react"
import LoginCheck from "../component/common/LoginCheck.jsx"
import config from "../../config.js"

const Notice = lazy(() => import("../component/common/Notice.jsx"))
const Insert = lazy(() => import("../component/employee/Insert.jsx"))
const Login = lazy(() => import("../component/employee/Login.jsx"))
const List = lazy(() => import("../component/employee/List.jsx"))
const UpdatePassword = lazy(() => import("../component/employee/UpdatePassword.jsx"))
const Select = lazy(() => import("../component/employee/Select.jsx"))

const employeeRouter = () =>{
    return [
    {
        path: '',
        element: <Notice/>
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "register",
        element: <Insert/>
    },
    {
        path: "list",
        element:
            <LoginCheck authority={config.PREFIX_AUTHORITY.employeeSelect}>
                <List/>
            </LoginCheck>
    },
    {
        path: "passwordModify",
        element:
            <LoginCheck>
                <UpdatePassword/>
            </LoginCheck>
    },
    {
        path: "read/:employeeId",
        element:
            <LoginCheck authority={config.PREFIX_AUTHORITY.employeeSelect}>
                <Select/>
            </LoginCheck>
    }
]}

export default employeeRouter