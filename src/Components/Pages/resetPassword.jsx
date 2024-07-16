import React, { useState } from "react";
import title from "../Images/DriveEasetitleblack 1.png";
import '../Pages/resetPassword.css';
import { Navigate, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { ResetApi } from "../Services/UserServices";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showConfPassword, setShowConfPassword] = React.useState(false);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

    const [resetPassword, setResetPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    let name, value;
    const handleinput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setResetPassword({ ...resetPassword, [name]: value })
    }
    const [error, setError] = useState({});
    const navigateToSignIn = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,13}$/;
        let passwordTest = passwordRegex.test(resetPassword.newPassword);

        let s1 = resetPassword.newPassword;
        let s2 = resetPassword.confirmPassword;
        const result = s1 === s2;
        setError(() => ({
            pwdError: !passwordTest,
            pwdHelperText: passwordTest ? " " : "enter valid password",

            confPwdError: !result,
            confPwdHelperText: result ? "" : "password must be equal"
        }))
        
        const token = localStorage.getItem("token");
        const config ={
            headers : {
                Authorization: `Bearer ${token}`,
            }
        }
        if (passwordTest === true && result == true) {
            try{
                let response = await ResetApi(resetPassword, config);
                console.log("jhbkjyu",response.data.success);
                if(localStorage.key("token"))
                {
                    if(response.data.success == true)
                    {
                    localStorage.removeItem("token");
                    alert("password reset successfully...!");
                    navigate("/signin");
                    }
                    else{
                        alert("New password cannot be the same as old password");
                        setResetPassword(()=>({
                            newPassword: "",
                            confirmPassword: ""
                        }))
                    }
                }
            }
            catch(error)
            {
                console.log(error);
            }
            
        }
    }
    return (
        <div className="resetPwd-p-c">
            <div action="" className="reset-form">
                <img src={title} style={{ marginBottom: '5vh', width: "40vh" }} alt="" />
                <h4 style={{ marginBottom: '0vh' }}>Reset Password</h4>
                <div className="signIn-inputData">
                    <div className="input-data-field">
                        <div style={{ height: '10vh' }}>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                id="size-small"
                                placeholder='New Password'
                                size="small"
                                InputProps={{
                                    sx: { width: '21.2vw', height: '6vh', background: "rgb(232, 241, 250)" },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                name="newPassword"
                                value={resetPassword.newPassword}
                                onChange={handleinput}
                                error={error.pwdError}
                                helperText={error.pwdHelperText}
                            />
                        </div>

                        <div >
                            <TextField
                                id="size-small"
                                placeholder='Confirm password'
                                type={showConfPassword ? 'text' : 'password'}
                                size="small"
                                InputProps={{
                                    sx: { width: '21.2vw', height: '6vh', background: "rgb(232, 241, 250)" },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfPassword}
                                                edge="end"
                                            >
                                                {showConfPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                name="confirmPassword"
                                value={resetPassword.confirmPassword}
                                onChange={handleinput}
                                error={error.confPwdError}
                                helperText={error.confPwdHelperText}
                            />
                        </div>
                    </div>
                    <button id="reset-btn" onClick={navigateToSignIn}>Reset</button>
                </div><br />
            </div>
        </div>
    );
}