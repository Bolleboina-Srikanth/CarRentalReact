import React, { useState } from "react";
import title from "../Images/DriveEasetitleblack 1.png";
import '../Pages/forgotpassword.css';
import { Navigate, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ForgotApi } from "../Services/UserServices";
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    //------------------------------------------------------
    const [forgotinput, setForgotinput] = useState({
        email: '',

    })
    let name, value;
    const handleinput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setForgotinput({ ...forgotinput, [name]: value })
    }


    const [errorObj, setErrorObj] = useState({
        emailError: false,
        emailHelperText: ''

    })
    const navigateToResetPage = () => {
        const isEmailEmpty = forgotinput.email == "";
        setErrorObj((prevstate) => (
            {
                ...prevstate,
                emailError: isEmailEmpty,
                emailHelperText: isEmailEmpty && "email field required",
            })
        )


        if (isEmailEmpty != true) {
            const FetchForgot = async () => {
                try {
                    let response = await ForgotApi(forgotinput);
                    localStorage.setItem("token", response.data.data);
                    if(localStorage.key("token"))
                    {
                       navigate("/resetpwd");
                    }
                }
                catch (error) {
                    setSuccess(true);
                    console.log(error);
                }

            }
            FetchForgot();
            
        }
    }
    return (
        <div className="forgotPwd-p-c">
            <div action="" className="forgot-form">
                <img src={title} style={{ marginBottom: '6vh' }} width="120px" alt="" />
                <h4 style={{ marginBottom: '1vh' }}>Forgot Password</h4>
                <div className="signIn-inputData">
                    <div className="input-data-field">
                        <div style={{ height: '13vh' }}>
                            <TextField
                                id="size-small"
                                placeholder='Email'
                                size="small"
                                InputProps={{ sx: { width: '21.2vw', height: '8vh', background: "rgb(232, 241, 250)" } }}
                                name="email"
                                value={forgotinput.email}
                                onChange={handleinput}
                                error={errorObj.emailError}
                                helperText={errorObj.emailHelperText}
                            />
                            {/* <span > &nbsp; send otp</span> */}
                        </div>
                        <div>
                            <button id="reset-btnf" onClick={navigateToResetPage}>Reset</button>
                        </div>


                    </div> <div className="forgot-alert">
                        {success &&
                            <Stack sx={{ width: '100%', height: '1vh', }} spacing={0}>
                                <Alert variant="filled" severity="error">
                                    invalid email
                                </Alert>
                            </Stack>}
                    </div>

                </div>
            </div>
        </div>
    );
}