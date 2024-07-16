import React  from "react";
import axios from 'axios';



export const SignIn = async (obj) =>{
    let response = await axios.post("https://localhost:44324/api/User/Login",
    obj
    );
    return response;
}


export const Register = async (obj) =>{
    let response = await axios.post("https://localhost:44324/api/User/Register",
    obj
    );
    return response;
}


export const ForgotApi = async (obj) =>{
    let response = await axios.post("https://localhost:44324/api/User/ForgotPassword",
    obj
    );
    return response;
}



export const ResetApi =  async(obj, config) =>{
    let response = await  axios.put("https://localhost:44324/api/User/ResetPassword",
    obj, config
    )
    return response;
}
 
export const GetAllUsersApi = async () =>{
    let response = await axios.get("https://localhost:44324/api/User/GetAllUSers");
    return response;
}
 



export const UpdateUserApi = async (obj) =>{
    let response = await axios.put("https://localhost:44324/api/User/UpdateUser",
    obj)
    // let response = await axios.get(`https://localhost:44324/api/User/UserCar${Id}`);
    return response;
}

export const DeleteUserApi = async (id) =>{
    let response = await axios.delete(`https://localhost:44324/api/User/deleteUser?userId=${id}`); 
    return response;
}

export const UploadUserPhoto = async (obj) => {
    let response = await  axios.put("https://localhost:44324/api/User/UploadUserPhoto",
    obj
);
    return response;
} 
 


