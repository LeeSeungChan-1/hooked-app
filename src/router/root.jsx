import {createBrowserRouter} from "react-router-dom"
import {lazy, Suspense} from "react"
import employeeRouter from "./employeeRouter.jsx";
import Notice from "../component/common/Notice.jsx";

const Loading = lazy(() => import("../component/common/Loading.jsx"))
const Main = lazy(() => import("../page/Main.jsx"))
const NotFound = lazy(() => import("../component/common/NotFound.jsx"))


const root = createBrowserRouter([
    {
        path: '*',
        element: <Suspense fallback={<Loading/>}><NotFound/></Suspense>,
        children: [{index: true, element: <Notice/>}]
    },
    {
        path: '',
        element: <Suspense fallback={<Loading/>}><Main/></Suspense>,
        children: [{index: true, element: <Notice/>}]
    },
    {
        path: 'employee',
        element: <Suspense fallback={<Loading/>}><Main/></Suspense>,
        children: employeeRouter()
    }
])

export default root