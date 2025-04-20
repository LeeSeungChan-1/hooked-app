import {Navigate, useNavigate} from "react-router-dom";

const useCustomNavigate = () =>{
    const navigate = useNavigate();

    const replaceNavigate = (path) =>{
        navigate({pathname: path}, {replace: true});
    }

    const componentNavigate = (path) =>{
        return <Navigate replace to={path}/>
    }

    return {navigate, replaceNavigate, componentNavigate}
}

export default useCustomNavigate