import { useLocation } from "react-router-dom";
import UserNavbar from "./userNavbar";
import { useEffect } from "react";


 const DefiningPaths = () =>{
    const location = useLocation();
    useEffect(()=>{
        if('/signin' !== location.pathname && '/register' !== location.pathname && '/forgotpwd' !== location.pathname && '/resetpwd' !== location.pathname){
        sessionStorage.setItem("prevPage",location.pathname);
        }
    },[location.pathname])
    const excludesPath = ['/','/signin','/register','/forgotpwd','/resetpwd', '/adminheader', '/bookingsummary'];
    if(excludesPath.includes(location.pathname))
    {
        return  null;
    }
    return <UserNavbar/>;
}
export default DefiningPaths;
