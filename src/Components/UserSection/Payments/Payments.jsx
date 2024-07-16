import React, { useContext, useEffect, useState } from "react";
import '../Payments/Payments.css';
import TextField from '@mui/material/TextField';
import googlepey from "../../Images/googlepeIcon.png";
import phonepey from "../../Images/phonepeIcon.png";
import debitcard from "../../Images/debitcard.png";
import paymentimage from "../../Images/paymentSuccess.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { AddOrderApi, BookingApi, PaymentApi, ReportApi } from "../../Services/CarServices";

export default function Payments() {
    const { data } = useContext(UserContext);
    const navigate = useNavigate();
    const Id = localStorage.getItem("BKID");
    const handleInvoice = () => {
        navigate("/bookingsummary", { state: { Id } });
    }
    const [opengooglepey, setopengooglepey] = useState(false)
    const handlegooglepey = () => {
        setopengooglepey(!opengooglepey)
        setopenphonepe(false)
        setopendebitcard(false)


    }
    const [openphonepe, setopenphonepe] = useState(false)
    const handlephonepe = () => {
        setopenphonepe(!openphonepe)
        setopengooglepey(false)
        setopendebitcard(false)

    }
    const [opendebitcard, setopendebitcard] = useState(false)
    const handledebitcard = () => {
        setopendebitcard(!opendebitcard)
        setopengooglepey(false)
        setopenphonepe(false)
    }
    const [gopaynow, setgopaynow] = useState(true)


    const [bookingData, setBookingData] = useState({
        carId: "",
        carBrand: "",
        carName: "",
        customerId: "",
        name: "",
        email: "",
        phoneNumber: "",
        rentDate: "",
        returnDate: ""
    });

    const result = localStorage.getItem("signInResponse");
    const localData = JSON.parse(result);
    useEffect(() => {
        function myfunction() {

            setBookingData((prevdata) => ({
                ...prevdata,
                carId: data.carID,
                carBrand: data.Brand,
                carName: data.carName,
                customerId: localData.userId,
                name: localData.name,
                email: localData.email,
                phoneNumber: localData.phonenumber,
                rentDate: data.pickUpdate.toISOString(),
                returnDate: new Date(data.dropOfdate).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
            }))
        }
        myfunction();
    }, [])


    const setPayment = async () => {
        const paymentData = {
            BookingId: localStorage.getItem("BKID"),
            CarId: data.carID,
            UserId: bookingData.customerId,
            paymentType: "DebitCard",
            paymmentDate: new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
            Amount: data.carFinalPriceTax
        }

        const orderApiData = {
            BookingId: localStorage.getItem("BKID"),
            UserID: localData.userId,
            Name: localData.name,
            PhoneNumber: localData.phonenumber,
            Email: localData.email,
            CarPhoto: data.carPhoto,
            CarBrand: data.Brand,
            CarName: data.carName,
            Transmission: data.transmission,
            Fuel: data.fuel,
            CarColor: data.carColor,
            Seating: data.seating,
            RentDate: new Date(data.pickUpdate).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
            ReturnDate: new Date(data.dropOfdate).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
            BookingTime: data.totalDays,
            Amount: data.carFinalPriceTax
        }

        try {
            let response = await PaymentApi(paymentData);
            if (response.data.success) {
                let response = await ReportApi(data.carID);
                if (response.data.success) {
                    let response = await AddOrderApi(orderApiData);
                    console.log(response);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlegopaynow = async () => {
        setgopaynow(false)
        if (bookingData.carId != "" && bookingData.customerId != "" && bookingData.name != "" && bookingData.email != "" && bookingData.phoneNumber != "" && bookingData.rentDate != "" && bookingData.returnDate != "") {
            try {
                let response = await BookingApi(bookingData);
                localStorage.setItem("BKID", response.data.data.bookingId);
                if (response.data.success) {
                    setPayment();
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const [mobilnum, setMobilnum] = useState("")
    const validmobilnum = (mobnum) => {
        setMobilnum(mobnum.target.value)

    }

    const phoneNumberregex = /^[0-9]{10}$/;

    const [error, setError] = useState({

        phoneNumbererror: false,
        phoneNumerrorhelper: "",

    })

    const paygooglepey = () => {

        let phoneNumcheck = phoneNumberregex.test(setMobilnum)


        if (phoneNumcheck == false) {
            setError((prevState) => ({
                ...prevState,
                phoneNumbererror: true,
                phoneNumerrorhelper: "enter Valid phonenumber"
            }))
        }
        else {
            setError((prevState) => ({
                ...prevState,
                phoneNumbererror: false,
                phoneNumerrorhelper: ""
            }))
        }
    }

    return (
        <div className="payments-Container">
            <div className="Payments-name">
                Payments
            </div>
            <div className="payment-method-price">
                <div className="payment-methods">
                    <div className="payment-method-name">
                        Choose Payments method
                    </div>
                    <div className="payment-method1">
                        <div className="payment-type">
                            <div className="payment-selection">
                                <div className="paymnent-logo"><img src={googlepey} alt="" width="100%" /></div>
                                <div className="payment-type-name">pay with googlepey</div>
                                {opengooglepey ? (
                                    <div className="arrow" onClick={handlegooglepey}>&#11165;</div>) : (<div className="arrow" onClick={handlegooglepey}>&#11167;</div>
                                )}
                            </div>
                            {opengooglepey ? (<div className="paymentname">

                                <div className="mob-sendotp">
                                    <TextField id="size-small" placeholder='phone number' size="small" fullWidth inputProps={{ sx: { height: '70%' } }} />
                                    <div className="send-otp">send otp</div>
                                </div>
                                <TextField id="size-small" placeholder='enter otp' size="small" sx={{ width: "28%" }} inputProps={{ sx: { height: '90%' } }} />
                                <button className="proceed-btn">Send otp</button>
                            </div>) : ""}

                        </div>

                        <div className="payment-type">
                            <div className="payment-selection">
                                <div className="paymnent-logo"><img src={phonepey} alt="" width="100%" /></div>
                                <div className="payment-type-name">pay with phonepe</div>
                                {openphonepe ? (
                                    <div className="arrow" onClick={handlephonepe}>&#11165;</div>) : (<div className="arrow" onClick={handlephonepe}>&#11167;</div>
                                )}
                            </div>
                            {openphonepe ? (<div className="paymentname">

                                <div className="mob-sendotp">
                                    <TextField id="size-small" placeholder='enter mobile number' size="small" fullWidth inputProps={{ sx: { height: '70%' } }} />
                                    <div className="send-otp">send otp</div>
                                </div>
                                <TextField id="size-small" placeholder='enter otp' size="small" sx={{ width: "28%" }} inputProps={{ sx: { height: '90%' } }} />
                                <button className="proceed-btn">proceed</button>
                            </div>) : ""}

                        </div>
                        <div className="payment-type">
                            <div className="payment-selection">
                                <div className="paymnent-logo"><img src={debitcard} alt="" width="100%" /></div>
                                <div className="payment-type-name">pay with Debit/creditcard</div>
                                {opendebitcard ? (
                                    <div className="arrow" onClick={handledebitcard}>&#11165;</div>) : (<div className="arrow" onClick={handledebitcard}>&#11167;</div>
                                )}
                            </div>
                            {opendebitcard ? (
                                <div className="payment-debit-card">
                                    <div className="paymentdebit">

                                        <TextField id="size-small" placeholder='enter card number' size="small" sx={{ width: "45%" }} inputProps={{ sx: { height: '70%' } }} />

                                        <TextField id="size-small" placeholder=' expiry date  mm/yy' size="small" sx={{ width: "45%" }} inputProps={{ sx: { height: '90%' } }} />

                                    </div>
                                    <div className="paymentdebit">
                                        <TextField id="size-small" placeholder='cvv' size="small" sx={{ width: "30%" }} inputProps={{ sx: { height: '90%' } }} />

                                        <TextField id="size-small" placeholder='enter otp' size="small" sx={{ width: "28%" }} inputProps={{ sx: { height: '90%' } }} />
                                        <button className="proceed-btn">proceed</button>
                                    </div>
                                </div>

                            ) : ""}
                        </div>
                    </div>
                </div>
                <div className="payement-order">
                    <div className="payment-price-details">
                        Price details
                    </div>
                    <div className="payment-order-details">
                        <div className="payment-order-summary">Order Summary</div>
                        <div className="payment-order-summary">Car Name </div>


                        <div className="payment-order-total">
                            <div className="payment-order-total1">
                                <div> carprice </div>
                                <div className="order-amount">&#8377;&nbsp; {data.carFinalPrice}</div>
                            </div>
                            <div className="payment-order-total1">
                                <div> extras </div>
                                <div className="order-amount"> &#8377;&nbsp;  99.99</div>
                            </div>
                            <div className="payment-order-total1">
                                <div> gst </div>
                                <div className="order-amount">&#8377;&nbsp; 49</div>
                            </div>
                            <div className="payment-order-total2">
                                <div> Total Price </div>
                                <div className="order-amount"> &#8377;&nbsp; {data.carFinalPrice + 99.99 + 49}</div>
                            </div>
                        </div>
                        <div className="payment-paynow">
                            {gopaynow ? (<div className="paynow" onClick={handlegopaynow}>Pay Now</div>) : (<img src={paymentimage} alt="" />)}
                        </div>
                    </div>
                    {gopaynow ? "" : (<div className="payment-sucessful" onClick={handlegopaynow}>

                        <span id="pay-sucessful" >paymentsucesful</span>
                        <span id="payment-invoice" onClick={handleInvoice}>click here to download the invoice</span>

                    </div>)}

                </div>
            </div>
        </div>
    )
}