import React, { useState } from "react";
import "../Pages/SignUpPage.css";
import title from "../Images/DriveEasetitleblack 1.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate, useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Register } from "../Services/UserServices";

function SignUpPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showConfPassword, setShowConfPassword] = React.useState(false);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);


    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    const states = ['Telangana', 'AndhraPradesh',];
    const citiesBystate = {
        Telangana: ['Warangal', 'Hyderabad', 'Karimnagar'],
        AndhraPradesh: ['Tirupati', 'Vizag', 'Amaravati']
    }

    const cities = citiesBystate[selectedState] || [];
    //-----------------------------------------------------------------
    const navigate = useNavigate();
    const [signupdata, setSignupdata] = useState({
        name: "",
        phoneNumber: "",
        state: "",
        city: "",
        address: "",
        role: "",
        status: "",
        licenseNumber: "",
        email: "",
        password: "",
        confPwd: ""
    });

    const handleState = (event) => {
        setSelectedState(event.target.value);
        setSignupdata((prevdata) => ({
            ...prevdata,
            state: event.target.value
        }))
        setSelectedCity('');
    };
console.log(signupdata.state);
    const handleCity = (e) => {
        setSelectedCity(e.target.value);
        setSignupdata((prevdata) => ({
            ...prevdata,
            city: e.target.value
        }))
    }

    let name, value;

    const handleInput = (e) => {

        if (e.target.name == 'name') {
            name = e.target.name;
            value = (e.target.value).replace(/[0-9]/g, "");
            setSignupdata({ ...signupdata, [name]: value })
        }

        if (e.target.name == 'phoneNumber') {
            name = e.target.name;
            value = (e.target.value).replace(/[A-Za-z]/g, "");
            setSignupdata({ ...signupdata, [name]: value })
        }
        if (e.target.name == "email" || e.target.name == "licenseNumber" || e.target.name == "password" || e.target.name == "address" || e.target.name == 'confPwd') {
            name = e.target.name;
            value = e.target.value;
            setSignupdata({ ...signupdata, [name]: value })
        }
    }

    const [error, setError] = useState({

    });


    const nameRegex = /^[A-Za-z ]{3,30}/;
    const phoneRegex = /^[6-9][0-9]{9}$/;
    const emailregex = /^[a-z]{2,8}.*@[a-z]{1,15}\.[a-z]{2,3}$/;
    const licenseRegex = /^[A-Z]{2}[0-9]{2}-[0-9]{8}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,13}$/;


    const nameTest = nameRegex.test(signupdata.name);
    const phoneTest = phoneRegex.test(signupdata.phoneNumber);
    const emailTest = emailregex.test(signupdata.email);
    const licenseTest = licenseRegex.test(signupdata.licenseNumber);
    const passwordTest = passwordRegex.test(signupdata.password);
    const ispasswordEqual = signupdata.password === signupdata.confPwd;
    const isStateEmpty = selectedState === '';
    const isCityEmpty = selectedCity === '';
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'name':
                setError(() => (
                    {
                        ...error,
                        nameError: !nameTest,
                        nameHelperText: nameTest ? "" : "enter valid name",
                    }
                ))
                break;
            case 'phoneNumber':
                setError(() => (
                    {
                        ...error,
                        phoneError: !phoneTest,
                        phoneHelperText: phoneTest ? "" : "enter valid phonenumber",

                    }
                ))
                break;
            case 'email':
                setError(() => (
                    {
                        ...error,
                        emailError: !emailTest,
                        emailHelperText: emailTest ? "" : "enter valid email",

                    }
                ))
                break;
            case 'licenseNumber':
                setError(() => (
                    {
                        ...error,
                        licenseError: !licenseTest,
                        licenseHelperText: licenseTest ? "" : "enter valid license number",

                    }
                ))
                break;
            case 'password':
                setError(() => (
                    {
                        ...error,
                        pwdError: !passwordTest,
                        pwdHelperText: passwordTest ? " " : "enter valid password",
                    }
                ))
                break;
            case 'confPwd':
                setError(() => (
                    {
                        ...error,
                        confPwdError: !ispasswordEqual,
                        confPwdHelperText: ispasswordEqual ? " " : " password does not match",
                    }
                ))
                break;
            case 'state':
                setError(() => (
                    {
                        ...error,
                        stateError: false,
                        stateHelperText: " ",
                    }
                ))
                break;
            case 'city':
                setError(() => (
                    {
                        ...error,
                        cityError: false,
                        cityHelperText: " ",
                    }
                ))
                break;
            case 'address':
                setError(() => (
                    {
                        ...error,
                        addressError: false,
                        addressHelperText: " ",
                    }
                ))
                break;

        }


    }
    console.log(signupdata);
    const handleregister = async () => {
        const isNameEmpty = signupdata.name == "";
        const isPhoneEmpty = signupdata.phoneNumber == "";
        const isEmailEmpty = signupdata.email == "";
        const isLicenseEmpty = signupdata.licenseNumber == "";
        const isAddressEmpty = signupdata.address == "";
        const isPwdEmpty = signupdata.password == "";
        const isConfPwdEmpty = signupdata.confPwd == "";
        const stateEmpty = signupdata.state == "";
        const cityEmpty = signupdata.city == "";

        setError(() => (
            {
                ...error,
                nameError: isNameEmpty,
                nameHelperText: !isNameEmpty ? "" : "name field required",

                ...error,
                phoneError: isPhoneEmpty,
                phoneHelperText: !isPhoneEmpty ? "" : "phone number field required",
                ...error,
                emailError: isEmailEmpty,
                emailHelperText: !isEmailEmpty ? "" : "email field required",

                ...error,
                stateError: stateEmpty,
                stateHelperText: !stateEmpty ? "" : "please select state",

                ...error,
                cityError: cityEmpty,
                cityHelperText: !cityEmpty ? "" : "please select state",


                ...error,
                licenseError: isLicenseEmpty,
                licenseHelperText: !isLicenseEmpty ? "" : "license number field required",

                ...error,
                addressError: isAddressEmpty,
                addressHelperText: !isAddressEmpty ? "" : "address field required",

                ...error,
                pwdError: isPwdEmpty,
                pwdHelperText: !isPwdEmpty ? " " : "password field required",

                ...error,
                confPwdError: isConfPwdEmpty,
                confPwdHelperText: !isConfPwdEmpty ? " " : "password field required",

                ...error,
                stateError: isStateEmpty,
                stateHelperText: !isStateEmpty ? " " : "please select state",

                ...error,
                cityError: isCityEmpty,
                cityHelperText: !isCityEmpty ? " " : "please select city",


            }
        ))
        console.log(signupdata);
        console.log(nameTest, phoneTest, emailTest, signupdata.state, signupdata.city, passwordTest);
        if (nameTest == true && phoneTest == true && emailTest == true &&
            selectedState != '' && signupdata.city != '' &&
            signupdata.address != '' && passwordTest == true && ispasswordEqual == true) {
            try {
                let response = await Register(signupdata);
                console.log(response);
                alert(response.data.data)
                setSignupdata((prevdata)=>(
                    {
                    ...prevdata,
                    name: "",
                    phoneNumber: "",
                    state: "",
                    city: "",
                    address: "",
                    role: "",
                    status: "",
                    licenseNumber: "",
                    email: "",
                    password: "",
                    confPwd: ""

                    }
                ));
                setSelectedState("");
                setSelectedCity("");
                
            }
            catch (Exception) {
                console.log(Exception);
            }
        }
    }
    const navigateTosignIn = () => {
        navigate('/signin');
    }





    return (
        <div className="signup-p-c1">
            <div class="signup-container1">
                <div class="toggle-panel toggle-left1">
                    <div className="signup-Welcome-greetings-signinbtn1">
                        <div className="signup-welcome1"><h1>Welcome Back!</h1></div>
                        <div className="signup-greetings1">Enter Your personal details to use all of our site features</div>
                        <div className="signup-signinbtn1"><button id="idsignin-for-signup1" onClick={navigateTosignIn}>SignIn</button> </div>
                    </div>
                </div>
                <div class="form-container1 signUp-form-car1">
                    <div className="signup-form1">
                        <div className="signup-title-icons1">
                            <div className="signup-title-image1">
                                <img src={title} alt="" />
                            </div>
                            <div className="signup-createaccount1">
                                <div className="signup-createaccount-Name1">Create Account</div>
                            </div>
                            <div className="social-icons1">
                                <GoogleIcon className="g-icon1" style={{ fontSize: "20px", boxShadow: '0 0 10px rgb(220, 216, 216)' }} />
                                <FacebookIcon className="g-icon1" style={{ fontSize: "20px", boxShadow: '0 0 10px rgb(220, 216, 216)' }} />
                                <XIcon className="g-icon1" style={{ fontSize: "20px", boxShadow: '0 0 10px rgb(220, 216, 216)' }} />
                            </div>
                        </div>
                        <div className="signup-details1">
                            <div className="signup-textfield1">
                                <TextField id="name-input" placeholder='Name' size="small" sx={{ width: "49%" }} inputProps={{maxLength:30, sx: { height: '55%' } }}
                                    name="name"
                                    value={signupdata.name}
                                    onChange={handleInput}
                                    error={error.nameError}
                                    helperText={error.nameHelperText}
                                    onBlur={handleBlur}
                                />
                                <TextField id="outlined-basic" placeholder='Phone Number' size="small" sx={{ width: "49%" }} inputProps={{maxLength:13, sx: { height: '55%' } }}
                                    name="phoneNumber"
                                    value={signupdata.phoneNumber}
                                    onChange={handleInput}
                                    error={error.phoneError}
                                    helperText={error.phoneHelperText}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="signup-textfield1">
                                <TextField id="outlined-basic" placeholder='Email' size="small" fullWidth inputProps={{ sx: { height: '55%' } }}
                                    name="email"
                                    value={signupdata.email}
                                    onChange={handleInput}
                                    error={error.emailError}
                                    helperText={error.emailHelperText}
                                    onBlur={handleBlur}
                                />

                            </div>
                            <div className="signup-textfield1">
                                {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}

                                <FormControl sx={{ width: '49%' }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6.5vh', textAlign: 'left' }}
                                        placeholder="jgkuuy"
                                        displayEmpty
                                        // inputProps={{ 'aria-label': 'Without label' }}
                                        name="state"
                                        value={selectedState}
                                        onChange={handleState}
                                        error={error.stateError}
                                        helperText={error.stateHelperText}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value="">
                                            <em style={{ color: 'gray', }}>-State-</em>
                                        </MenuItem>
                                        {states.map((state) => (
                                            <MenuItem key={state} value={state}>{state}</MenuItem>
                                        )
                                        )}

                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.stateHelperText}</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ width: '49%' }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6.5vh', textAlign: 'left' }}
                                        placeholder="jgkuuy"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="city"
                                        value={selectedCity}
                                        onChange={handleCity}
                                        error={error.cityError}
                                        helperText={error.cityHelperText}
                                        onBlur={handleBlur}
                                    >

                                        <MenuItem value="">
                                            <em style={{ color: 'gray' }}>-City-</em>
                                        </MenuItem>
                                        {cities.map((city) => (
                                            <MenuItem key={city} value={city}>{city}</MenuItem>
                                        ))}

                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.cityHelperText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="signup-textfield1">
                                <TextField id="outlined-basic" placeholder='Address' size="small" sx={{ width: "49%" }} inputProps={{ sx: { height: '55%' } }}
                                    name="address"
                                    value={signupdata.address}
                                    onChange={handleInput}
                                    error={error.addressError}
                                    helperText={error.addressHelperText}
                                    onBlur={handleBlur}

                                />
                                <TextField id="outlined-basic" placeholder='Lisence Number' size="small" sx={{ width: "49%" }} inputProps={{ sx: { height: '55%' } }}
                                    name="licenseNumber"
                                    value={signupdata.licenseNumber}
                                    onChange={handleInput}
                                    error={error.licenseError}
                                    helperText={error.licenseHelperText}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="signup-textfield1">
                                <TextField id="outlined-basic" placeholder='Password' size="small" sx={{ width: "49%" }}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        sx: { height: '6.5vh' },
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
                                    value={signupdata.password}
                                    onChange={handleInput}
                                    error={error.pwdError}
                                    helperText={error.pwdHelperText}
                                    onBlur={handleBlur}
                                />
                                <TextField id="outlined-basic" placeholder='Confirm Password' size="small" sx={{ width: "49%" }}
                                    type={showConfPassword ? 'text' : 'password'}
                                    InputProps={{
                                        sx: { height: '6.4vh' },
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
                                    name="confPwd"
                                    value={signupdata.confPwd}
                                    onChange={handleInput}
                                    error={error.confPwdError}
                                    helperText={error.confPwdHelperText}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="signup-button1"><button id="signup-submit-btn1" onClick={handleregister} >Submit</button></div>
                    </div>
                </div>
            </div>
        </div >

    );
}
export default SignUpPage;














