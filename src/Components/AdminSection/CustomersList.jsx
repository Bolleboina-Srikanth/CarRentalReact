import React, { useContext, useEffect, useState } from 'react';
import '../AdminSection/CarsList.css';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Modal, Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import '../AdminSection/CustomerList.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import deleteX from '../Images/deleteX.svg';
import { DeleteUserApi, GetAllUsersApi, Register, UpdateUserApi } from '../Services/UserServices';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomersList = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const modalClose = () => {
        setShow(false);
        setError((prevdata)=>({
            ...prevdata,
            usernameError: false,
            usernameHelperText: "",

            phoneError: false,
            phoneHelperText:  "" ,

            emailError: false,
            emailHelperText: "" ,

            addressError: false,
            addressHelperText:  "" ,

            stateError: false,
            stateHelperText:  "",

            cityError: false,
            cityHelperText:  "" ,

            roleError: false,
            roleHelperText:  "" ,

            statusError: false,
            statusHelperText: "" ,

            pwdError: false,
            pwdHelperText:  " ",

            aconfPwdError: false,
            aconfPwdHelperText: " ",
        }))
    } 
    const[selectedRow, setSelectedRow] = useState(null);
    //------------------------------------------------
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
        confmPwd: "",
    });

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const states = ['Telangana', 'AndhraPradesh',];
    const citiesBystate = {
        Telangana: ['Warangal', 'Hyderabad', 'Karimnagar'],
        AndhraPradesh: ['Tirupati', 'Vizag', 'Amaravati']
    }
    const cities = citiesBystate[selectedState] || [];

    const handleChange = (e) => {
        setSelectedState(e.target.value)
        setSignupdata((prevdata) => (
            {
                ...prevdata,
                state: e.target.value,
                city: ""
            }
        ))
        setSelectedCity("")
    };


    const handleCity = (e) => {
        setSelectedCity(e.target.value);
        setSignupdata((prevdata) => (
            {
                ...prevdata,
                city: e.target.value,
            }
        ))
    }

    const handleRole = (e) => {
        setSignupdata((prevdata) => (
            {
                ...prevdata,
                role: e.target.value,
            }
        ))
    }

    const handleStatus = (e) => {
        setSignupdata((prevdata) => (
            {
                ...prevdata,
                status: e.target.value,
            }
        ))
    }


    let name, value;

    const handleInput = (e) => {
        if (e.target.name == 'name') {
            name = e.target.name;
            value = (e.target.value).replace(/[0-9@!^|&\/\\#,+()$~%.'":*?<>{}]/g, "");
            setSignupdata({ ...signupdata, [name]: value })
        }

        if (e.target.name == 'phoneNumber') {
            name = e.target.name;
            value = (e.target.value).replace(/[A-Za-z@!^|&\/\\#,+()$~%.'":*?<>{}]/g, "");
            setSignupdata({ ...signupdata, [name]: value })
        }
        if (e.target.name == "email" || e.target.name == "password" || e.target.name == "confmPwd" || e.target.name == "address") {
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
    const licenseRegex = /[A-Z]{2}[0-9]{2}-[0-9]{8}/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,13}$/;
    const nameTest = nameRegex.test(signupdata.name);
    const phoneTest = phoneRegex.test(signupdata.phoneNumber);
    const emailTest = emailregex.test(signupdata.email);
    const licenseTest = licenseRegex.test(signupdata.licenseNumber);
    const passwordTest = passwordRegex.test(signupdata.password);

    const confPwdTest = signupdata.password == signupdata.confmPwd;

    const handleBlur = (e) => {
        const p1 = signupdata.password;
        const p2 = signupdata.confmPwd;
        const isPwdEqual = p1 === p2;
        switch (e.target.name) {
            case 'name':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        usernameError: !nameTest,
                        usernameHelperText: nameTest ? "" : "enter valid name",
                    }
                ))
                }
                break;
            case 'phoneNumber':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        phoneError: !phoneTest,
                        phoneHelperText: phoneTest ? "" : "enter valid phonenumber",

                    }
                ))
                }
                else{
                setError((prevdata) => (
                    {
                        ...prevdata,
                        phoneError: false,
                        phoneHelperText: "",

                    }
                ))
                }
                break;

                  case 'state':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        stateError: false,
                        stateHelperText: "",

                    }
                ))
                }
                break;
                       case 'city':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        cityError: false,
                        cityHelperText: "",

                    }
                ))
                }
                break;
                       case 'role':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        roleError: false,
                        roleHelperText: "",

                    }
                ))
                }
                break;

                       case 'status':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        statusError: false,
                        statusHelperText: "",

                    }
                ))
                }
                break;

                        case 'address':
            if(e.target.value !== ""){
                setError((prevdata) => (
                    {
                        ...prevdata,
                        addressError: false,
                        addressHelperText: "",

                    }
                ))
                }
                break;

            case 'email':
            if(e.target.value !== "")
            {
                setError((prevdata) => (
                    {
                        ...prevdata,
                        emailError: !emailTest,
                        emailHelperText: emailTest ? "" : "enter valid email",
                    }
                ))
                }
                else{
                setError((prevdata) => (
                    {
                        ...prevdata,
                        emailError: false,
                        emailHelperText: "",
                    }
                ))

                }
                break;
            case 'licenseNumber':
                setError((prevdata) => (
                    {
                        ...prevdata,
                        licenseError: !licenseTest,
                        licenseHelperText: licenseTest ? "" : "enter valid license number",
                    }
                ))
                break;
            case 'password':
            if(e.target.value !== "")
            {
                setError((prevdata) => (
                    {
                        ...prevdata,
                        pwdError: !passwordTest,
                        pwdHelperText: passwordTest ? " " : "enter valid password",

                    }
                ))
                }
                else{
                        setError((prevdata) => (
                    {
                        ...prevdata,
                        pwdError: false,
                        pwdHelperText: "",

                    }
                ))
                }
                break;
            case 'confmPwd':
            const result = signupdata.confmPwd !== "";
            if(signupdata.confmPwd){
            console.log(result);
                setError((prevdata) => (
                    {
                        ...prevdata,
                        aconfPwdError: !confPwdTest,
                        aconfPwdHelperText: confPwdTest ? "" : "password does not match",
                    }
                ))
                }
                else{
                 setError((prevdata) => (
                    {
                        ...prevdata,
                        aconfPwdError: false,
                        aconfPwdHelperText: "",
                    }
                ))

                }
                break;
        }
    }
   
    
    const handlepage = async () => {
        const isNameEmpty = signupdata.name === "";
        const isPhoneEmpty = signupdata.phoneNumber == "";
        const isEmailEmpty = signupdata.email == "";
        const isAddressEmpty = signupdata.address == "";
        const isPwdEmpty = signupdata.password == "";
        const isConfPwdEmpty = signupdata.confmPwd == "";
        const isStateEmpty = selectedState == '';
        const isCityEmpty = selectedCity === '';
        const isRoleEmpty = signupdata.role == "";
        const isStatusEmpty = signupdata.status == "";

        setError(() => (
            {
                ...error,
                usernameError: isNameEmpty,
                usernameHelperText: !isNameEmpty ? "" : "name can\'t be empty",
                ...error,
                phoneError: isPhoneEmpty,
                phoneHelperText: !isPhoneEmpty ? "" : "phone number can\'t be empty",

                ...error,
                emailError: isEmailEmpty,
                emailHelperText: !isEmailEmpty ? "" : "email can\'t be empty",
                ...error,
                addressError: isAddressEmpty,
                addressHelperText: !isAddressEmpty ? "" : "address can\'t be empty",
                ...error,
                stateError: isStateEmpty,
                stateHelperText: !isStateEmpty ? "" : "please select state",
                ...error,
                cityError: isCityEmpty,
                cityHelperText: !isCityEmpty ? "" : "please select city",
                ...error,
                roleError: isRoleEmpty,
                roleHelperText: !isRoleEmpty ? "" : "please select role",
                ...error,
                statusError: isStatusEmpty,
                statusHelperText: !isStatusEmpty ? "" : "please select status",
                ...error,
                pwdError: isPwdEmpty,
                pwdHelperText: !isPwdEmpty ? " " : "password can\'t be empty",

                ...error,
                aconfPwdError: isConfPwdEmpty,
                aconfPwdHelperText: !isConfPwdEmpty ? "" : "password can\'t be empty",
            }
        ))

         if ( nameTest == true && phoneTest == true && emailTest == true && signupdata.state != '' && signupdata.city != '' && signupdata.address != '' && passwordTest == true && confPwdTest == true
        && signupdata.role != "" && signupdata.status !== "") {
            try {
                let response = await Register(signupdata);
                console.log(response);
                alert(response.data.data)
                setShow(false);
            }
            catch (Exception) {
                console.log(Exception);
            }
        }
    }

    const [editChanges, setEditChanges] = useState(false);

    const handleCarEdit = async () => {
     const isNameEmpty = signupdata.name === "";
        const isPhoneEmpty = signupdata.phoneNumber == "";
        const isAddressEmpty = signupdata.address == "";
        const isStateEmpty = selectedState == '';
        const isCityEmpty = selectedCity === '';
        const isRoleEmpty = signupdata.role == "";
        const isStatusEmpty = signupdata.status == "";
        setError((prevdata) => (
            {
                ...prevdata,
                usernameError: isNameEmpty,
                usernameHelperText: !isNameEmpty ? "" : "name can\'t be empty",

                phoneError: isPhoneEmpty,
                phoneHelperText: !isPhoneEmpty ? "" : "phone number can\'t be empty",

                addressError: isAddressEmpty,
                addressHelperText: !isAddressEmpty ? "" : "address can\'t be empty",

                stateError: isStateEmpty,
                stateHelperText: !isStateEmpty ? "" : "please select state",

                cityError: isCityEmpty,
                cityHelperText: !isCityEmpty ? "" : "please select city",

                roleError: isRoleEmpty,
                roleHelperText: !isRoleEmpty ? "" : "please select role",

                statusError: isStatusEmpty,
                statusHelperText: !isStatusEmpty ? "" : "please select status", 
            }
        ))

        try {
            if ( nameTest == true && phoneTest == true  && signupdata.state != '' && signupdata.city != '' && signupdata.address != '' && 
         signupdata.role != "" && signupdata.status !== ""){
            let response = await UpdateUserApi(signupdata);
            alert("Details updated successfully...!");
            setShow(false);
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    // --------------------------------------------------------
    const [show, setShow] = useState(false);


    const modalShow = () => {
        setSignupdata(() => (
            {
                name : "",
                phoneNumber: "",
                state: "",
                city : "",
                address: "",
                role: "",
                status: "",
                licenseNumber: "",
                email: "",
                password: "",
            }
        ))
        setSelectedCity("");
        setShow(true);
        setEditChanges(false);
    }
    const editCustomer = (users) => {
        setSelectedRow(users.userID);
        setShow(true);
        setSelectedState(users.state);
        setSelectedCity(users.city);
        setEditChanges(true);
        setSignupdata(users);
    }
    //----------------------------------------------------------
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [deleteUSerId, setDeleteUserId] = useState(null);
    const openDeleteModal = (users) => {
        setSelectedRow(users.userID);
        setDeleteUserModal(true);
        setDeleteUserId(users.userID)
    }
    const DeleteUser = async () => {
        try {
            let response = await DeleteUserApi(deleteUSerId);
            alert(response.data.message);
            setDeleteUserModal(false);
        }
        catch (error) {
            console.log(error);
        }
    }
    //-----------------------------------------------------
    const [viewUser, setViewUser] = useState(false);
    const [viewData, setViewData] = useState({});
    const handleviewUser = (users) => {
        setSelectedRow(users.userID);
        setViewUser(true);
        setViewData(users);
    }
    //---------------------------------------------------------
    const [usersDataFetch, setUsersDataFetch] = useState([]);

    useEffect(() => {
        const GetUsers = async () => {
            try {
                let response = await GetAllUsersApi();
                setUsersDataFetch(response.data.data);
                localStorage.setItem("totalCustomers", usersDataFetch.length);
            }
            catch (error) {
                console.log(error);
            }
        }
        GetUsers();
    }, [usersDataFetch])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentpage(1);
    }

    const filteredData = usersDataFetch.filter((data) =>
        Object.values(data).some((value) =>
           value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
        ));

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (event, value) => {
        setCurrentpage(value);
    };

    return (
        <div className='customers-p-c'>
            <div className="App p-2 launch-modal">
                <Button variant="primary" onClick={modalShow}>
                    Add Admin
                </Button>
                <Modal show={show} onHide={modalClose} >
                    <Modal.Header closeButton>
                        {
                            editChanges ? (<Modal.Title style={{ color: "black" }}>Update Admin</Modal.Title>) :
                                (<Modal.Title style={{ color: "black" }}>Add Admin</Modal.Title>)
                        }
                    </Modal.Header>

                    <Modal.Body>

                        <div className={editChanges ? 'admin-form-c2' : 'admin-form-c'}  >
                            <div className='admin-form-input'>
                                <TextField id="name-input" placeholder='Name' size="small" sx={{ width: 'px', height: 'px' }} inputProps={{maxLength:30, sx: { height: '3.5vh', background: "rgb(232, 241, 250)" } }}
                                    name="name"
                                    value={signupdata.name}
                                    onChange={handleInput}
                                    error={error.usernameError}
                                    helperText={error.usernameHelperText}
                                    onBlur={handleBlur}

                                />
                                <TextField id="size-small" placeholder='Phonenumber' size="small" inputProps={{maxLength:10, sx: { height: '3.5vh', background: "rgb(232, 241, 250)" } }}
                                    name="phoneNumber"
                                    value={signupdata.phoneNumber}
                                    onChange={handleInput}
                                    error={error.phoneError}
                                    helperText={error.phoneHelperText}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className='admin-form-input'>
                                <FormControl sx={{ width: '49%' }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6.5vh', textAlign: 'left', background: "rgb(232, 241, 250)" }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="state"
                                        value={signupdata.state}
                                        onChange={handleChange}
                                        error={error.stateError}
                                        helperText={error.stateHelperText}
                                        onBlur={handleBlur}
                                    >

                                        <MenuItem value="">
                                            <em style={{ color: 'gray', }}>-State-</em>
                                        </MenuItem>
                                        {states.map((state) => (
                                            <MenuItem key={state} value={state}>{state}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.stateHelperText}</FormHelperText>
                                </FormControl>
                                <FormControl sx={{ width: '49%', }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6.5vh', textAlign: 'left', background: "rgb(232, 241, 250)" }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="city"
                                        value={selectedCity}
                                        onChange={handleCity}
                                        error={error.cityError}
                                        helperText={error.cityHelperText}
                                           onBlur={handleBlur}
                                    >
                                        <MenuItem value="" >
                                            <em style={{ color: 'gray' }}>-City-</em>
                                        </MenuItem>
                                        {cities.map((city) => (
                                            <MenuItem key={city} value={city}>{city}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.cityHelperText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='admin-form-input'>
                                <TextField id="size-small" placeholder='Address' size="small" InputProps={{ sx: { height: '6vh', background: "rgb(232, 241, 250)" } }}
                                    name="address"
                                    value={signupdata.address}
                                    error={error.addressError}
                                    helperText={error.addressHelperText}
                                    onChange={handleInput}
                                    onBlur={handleBlur}
                                />
                                <FormControl sx={{ width: '49%' }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6vh', textAlign: 'left', background: "rgb(232, 241, 250)" }}
                                        placeholder="jgkuuy"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="role"
                                        value={signupdata.role}
                                        onChange={handleRole}
                                        error={error.roleError}
                                        helperText={error.roleHelperText}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value="">
                                            <em style={{ color: 'gray' }}>-Role-</em>
                                        </MenuItem>
                                        <MenuItem value='Admin'>Admin</MenuItem>
                                        <MenuItem value='User' disabled>User</MenuItem>

                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.roleHelperText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='admin-form-input'>  
                                <FormControl sx={{ width: '49%' }}>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        sx={{ height: '6vh', textAlign: 'left', background: "rgb(232, 241, 250)" }}
                                        placeholder="jgkuuy"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="status"
                                        value={signupdata.status}
                                        onChange={handleStatus}
                                        error={error.statusError}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value="">
                                            <em style={{ color: 'gray' }}>-Status-</em>
                                        </MenuItem>
                                        <MenuItem value='Active'>Active</MenuItem>
                                        <MenuItem value='Inactive'>Inactive</MenuItem>


                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.statusHelperText}</FormHelperText>
                                </FormControl>
                                {editChanges ? "" : <>
                                    <TextField id="size-small" placeholder='Email' size="small" InputProps={{ sx: { height: '6vh', background: "rgb(232, 241, 250)" } }}
                                        name="email"
                                        value={signupdata.email}
                                        onChange={handleInput}
                                        error={error.emailError}
                                        helperText={error.emailHelperText}
                                        onBlur={handleBlur}
                                    /></>
                                }
                            </div>
                            {editChanges ? "" : 
                            <div className='admin-form-input'>
                                    <TextField id="size-small" placeholder='Password' size="small" InputProps={{ sx: { height: '6vh', background: "rgb(232, 241, 250)" } }}
                                        name="password"
                                        value={signupdata.password}
                                        onChange={handleInput}
                                        error={error.pwdError}
                                        helperText={error.pwdHelperText}
                                        onBlur={handleBlur}
                                    />
                                

                                    <TextField id="size-small" placeholder='Confirm Password' size="small" InputProps={{ sx: { height: '6vh', background: "rgb(232, 241, 250)" } }}
                                        name="confmPwd"
                                        value={signupdata.confmPwd}
                                        onChange={handleInput}
                                        error={error.aconfPwdError}
                                        helperText={error.aconfPwdHelperText}
                                        onBlur={handleBlur}
                                    />
                                
                            </div>}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="#ffeb3b" style={{ backgroundColor: '#ffeb3b' }} onClick={modalClose}>Close</Button>
                        {
                            editChanges ? (<Button variant="primary" onClick={handleCarEdit}>Save changes</Button>) :
                                (<Button variant="primary" onClick={handlepage}>Save</Button>)
                        }
                    </Modal.Footer>
                </Modal>
                <Modal centered show={deleteUserModal} onHide={modalClose}>
                    <Modal.Body>
                        <div className='delete-modal'>
                            <img src={deleteX} alt="" width={'13%'} />
                            <div style={{ fontSize: '2vw' }}>Are you sure you want to delete?</div><br />
                            <div className='d-btn'>
                                <button className='c-btn' onClick={() => setDeleteUserModal(false)}>Cancel</button>
                                <button className='c-btn' style={{ backgroundColor: 'red' }} onClick={DeleteUser}>Delete</button>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>

                <Modal centered show={viewUser} >
                    <Modal.Body closeButton className='v'>
                        <div className='viewUser'>
                            <table style={{ width: '80%', marginLeft: '2vw', border: '0' }}>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold', width: '100vw' }}>UserId:</td>
                                    <td>{viewData.userID}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>Name: </td>
                                    <td>{viewData.name}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>License-Number:</td>
                                    <td>{viewData.licenseNumber}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>Email:</td>
                                    <td>{viewData.email}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>PhoneNumber:</td>
                                    <td>{viewData.phoneNumber}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>Address:</td>
                                    <td>{viewData.address}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>District:</td>
                                    <td>{viewData.city}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>State:</td>
                                    <td>{viewData.state}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>Role:</td>
                                    <td>{viewData.role}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td style={{ fontWeight: 'bold' }}>Status:</td>
                                    <td>{viewData.status}</td>
                                </tr>
                                <tr className='view-table'>
                                    <td><button style={{ backgroundColor: '#ffeb3b' }} className='viewclose' onClick={() => setViewUser(false)}>Close</button></td>
                                </tr>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div className='table-card-container-c'>
                <div className='table-card-c'>
                    <div className='table-search'>
                        <div>
                            <label >Show entries: </label> &nbsp;
                            <select className='selectoptions' value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <input type="text" id='searchinput' value={searchTerm} onChange={handleSearch} placeholder='Search...' />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>CustomerId</th>
                                <th>Name</th>
                                <th>License-Number</th>
                                <th>Phone-Number</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {currentRows == "" ?<tr>
                <td colSpan={9}>
                 <span className="norecords-css">No Records Found </span> 
                </td>
              </tr>: ""}
                        {currentRows.map((data) => (
                            <tr style={{backgroundColor: selectedRow === data.userID ? "silver" : ""}}>
                                <td>{data.userID}</td>
                                <td>{data.name}</td>
                                <td>{data.licenseNumber}</td>
                                <td>{data.phoneNumber}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                                <td>{data.status}</td>
                                <td>
                                    <div className='actions'>
                                        <button className='viewIcon' onClick={() => handleviewUser(data)}><VisibilityIcon /></button>
                                        <button className='edit' onClick={() => editCustomer(data)}><EditIcon /></button>
                                        <button className='delete' onClick={() => openDeleteModal(data)}><DeleteForeverIcon /></button></div>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className='pagination'>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(filteredData.length / rowsPerPage)}
                                page={currentPage}
                                color="primary"
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomersList;













