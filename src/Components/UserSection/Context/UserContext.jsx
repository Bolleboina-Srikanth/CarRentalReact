import React, { createContext, useContext, useEffect, useState } from "react";
import {addHours} from 'date-fns';
export const UserContext = createContext();
export const ContextComponent = ({ children }) => {
    const currentDate = new Date();
    const minDropOfDate =  addHours(currentDate, 6);
    const [data, setData] = useState({
        Brand: '',
        carName: '',
        state: '',
        district: '',
        place: '',
        pickUpdate: new Date(),
        dropOfdate: minDropOfDate,
        priceType:'',
        carPriceHour: 0,
        carPriceDay: 0,
        carColor: '',
        carID:null,
        carPhoto: null,
        fuel: "",
        seating: "",
        transmission: "",
        carFinalPrice: 0,
        carFinalPriceTax: 0,
        totalDays:0, 
        totalCustomers: 0,
        totalCars: 0,
        newDropOfDate: null,
        cancellationdate: new Date() 

    },
    );
     localStorage.setItem("carid", data.carID);
   useEffect(()=>{
        sessionStorage.setItem("userData", JSON.stringify(data));
   }, [data])



    // const retriveDataFromLocalStorage = (key) =>{
    //     const dataString = sessionStorage.getItem(key);
    //     return JSON.parse(dataString);
    // }

    // const saveData = retriveDataFromLocalStorage('userData');

    
    const updateData = (key, value) => {
        setData((prev) => (
            {
                ...prev,
                [key]: value,
            }
        ))
    }

    return (
        <>
            <UserContext.Provider value={{ data, updateData }}>
                {children}
            </UserContext.Provider>
        </>

    );
}