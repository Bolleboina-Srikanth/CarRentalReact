import React, { useContext, useEffect, useState } from "react";
import "../Pages/SignInPage.css";
import title from "../Images/DriveEasetitleblack 1.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import $ from 'jquery';
import { Navigate, unstable_HistoryRouter, useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { SignIn } from "../Services/UserServices";
import { UserContext } from "../UserSection/Context/UserContext";

export default function SignInPage() {
    const{data,updateData} = useContext(UserContext);
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    localStorage.setItem("userPhoto", "");

    
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    //------------------------------------
    const [loginINput, setLoginInput] = useState(
        {
            email: "",
            password: "",
        }
    )
    let name, value;
    const handleinput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setLoginInput({ ...loginINput, [name]: value })
    }

    const [error, setError] = useState({
        // passwordError: false,
        // passwordHelperText: ""
    });
  
    const navigateToAdminDashboard = async () => {
        const isEmailEmpty = loginINput.email == "";
        const isPwdEmpty = loginINput.password == "";
        setError(() => (
            {
                ...error,
                emailError: isEmailEmpty,
                emailHelperText: isEmailEmpty && "email field required",

                ...error,
                passwordError: isPwdEmpty,
                passwordHelperText: isPwdEmpty && "password field required",

            }
        ))

        if (isEmailEmpty != true && isPwdEmpty != true) {
            try {
                let response = await SignIn(loginINput);  
                localStorage.setItem("signInResponse", JSON.stringify(response.data.data))
                localStorage.setItem("token", response.data.data.token)
                const localData = localStorage.getItem("signInResponse");
                const carid = localStorage.getItem("carid");
                const result = JSON.parse(localData);
                if(result.UserPhoto !== null)
                    {
                localStorage.setItem("userPhoto", result.UserPhoto);
                    }
                const prevPage = sessionStorage.getItem("prevPage");
                console.log(prevPage);
                if (result.role == "Admin") {
                    navigate("/adminheader");
                }
                else if(prevPage){
                    navigate(prevPage);
                }
                // else{
                //     navigate("/");
                // }
                setSuccess(false);
            }
            catch (Exception) {
                setSuccess(true);
                console.log(Exception);
            }
        }
    }
    
   
    //-------------------------------------------------------------

    const NavigateToSignUp = () => {
        navigate('/register');
    }
    const navigateToForgotpwd = () => {
        navigate("/forgotpwd");
    }
    return (
        <div className="signin-p-c">
            <div class="signin-container ">

                <div class="form-container signIn-form">
                    <div className="signin-alert">
                        {success &&
                            <Stack sx={{ width: '100%', marginTop: '0' }} spacing={0}>
                                <Alert variant="filled" severity="error">
                                    invalid email or password
                                </Alert>
                            </Stack>}
                    </div>
                    <div>
                        <img src={title} id="signIN-img" alt="" />
                    </div>
                    <div>
                        <h3 style={{ marginBottom: "8px" }}>Sign In</h3>
                    </div>
                    <div class="social-icons">
                        <GoogleIcon style={{fontSize: '18px', }} className="g-icon" />
                        <FacebookIcon style={{ fontSize: '18px', }} className="g-icon" />
                        <XIcon style={{ fontSize: '18px',}} className="g-icon" />
                    </div>
                    <span>or use your email & password</span>

                    <div className="signIn-inputData">
                        <div className="input-data-field">
                            <div style={{ height: '10vh' }}>
                                <TextField
                                    className="standard-basic"
                                    id="size-small"
                                    placeholder='Email'
                                    size="small"
                                    InputProps={{ sx: { width: '21.2vw', height: '7vh', } }} name="email"
                                    value={loginINput.email}
                                    onChange={handleinput}
                                    error={error.emailError}
                                    helperText={error.emailHelperText}
                                    required
                                />
                            </div>
                            <div style={{ height: '12vh' }}>

                                <TextField id="outlined-basic" placeholder='Password' size="small" sx={{ width: "21vw" }}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        sx: { height: '6.6vh' },
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
                                    name="password"
                                    value={loginINput.password}
                                    onChange={handleinput}
                                    error={error.passwordError}
                                    helperText={error.passwordHelperText}
                                />
                            </div>
                        </div>
                        <div>
                            <button class="login-bttn" onClick={navigateToAdminDashboard}>SignIn</button><br /> 
                            <div id="forgotpwd" onClick={navigateToForgotpwd}>forgotpassword?</div>
                        </div>

                    </div>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1 style={{ color: 'ghostwhite' }}>Hello, Friend!</h1>
                    <p style={{ color: "ghostwhite" }}>Register with your personal details to use all of our site features</p>
                    <button class="hidden" id="register" onClick={NavigateToSignUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );


}












