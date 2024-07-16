import React, { useContext, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { CreateOrderId } from "../../Services/CarServices";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import {
  AddOrderApi,
  BookingApi,
  PaymentApi,
  ReportApi,
} from "../../Services/CarServices";

export default function RazorPayTest({setLoading}) {
  const navigate = useNavigate();
  const [Razorpay, isLoaded] = useRazorpay();
  const { data } = useContext(UserContext);
  const amount = Math.round(data.carFinalPriceTax) + "00";
  const result = localStorage.getItem("signInResponse");
  const localData = JSON.parse(result);
  const [order_id, setOder_id] = useState("");
  const [isloadingTrue, setIsloadingTrue] = useState(true);

  const [bookingData, setBookingData] = useState({
    carId: data.carID,
      carBrand: data.Brand,
      carName: data.carName,
      customerId: localData.userId,
      name: localData.name,
      email: localData.email,
      phoneNumber: localData.phonenumber,
      rentDate: data.pickUpdate.toISOString(),
      returnDate: new Date(data.dropOfdate).toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
  });

  const handlePayment = useCallback(async () => {
    try {
      let response = await CreateOrderId(amount);
      setOder_id(response.data);
    } catch (error) {
      console.log(error);
    }

    const options = {
      key: "rzp_test_ynlZlonNRZiT0a",
      amount: amount,
      currency: "INR",
      name: "Drive Ease",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: async (res) => {
        if (
          bookingData.carId != "" &&
          bookingData.customerId != "" &&
          bookingData.name != "" &&
          bookingData.email != "" &&
          bookingData.phoneNumber != "" &&
          bookingData.rentDate != "" &&
          bookingData.returnDate != ""
        ) {
        try {
         setLoading(true);
          let response = await BookingApi(bookingData);
          localStorage.setItem("BKID", response.data.data.bookingId);
          if (response.data.success) {
            setPayment();
          }
        } catch (error) {
          console.log(error);
        }
        }
      },
      prefill: {
        name: localData.name,
        email: localData.email,
        contact: localData.phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "royalblue",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, amount, order_id]);

  const setPayment = async () => {
    setIsloadingTrue(true);
    const paymentData = {
      BookingId: localStorage.getItem("BKID"),
      CarId: data.carID,
      UserId: bookingData.customerId,
      paymentType: "DebitCard",
      paymmentDate: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
      Amount: data.carFinalPriceTax,
    };

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
      RentDate: new Date(data.pickUpdate).toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
      ReturnDate: new Date(data.dropOfdate).toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
      BookingTime: data.totalDays,
      Amount: data.carFinalPriceTax,
    };

    try {
      let response = await PaymentApi(paymentData);
      if (response.data.success) {
        let response = await ReportApi(data.carID);
        if (response.data.success) {
          let response = await AddOrderApi(orderApiData);
          const Id = localStorage.getItem("BKID");
          navigate("/bookingsummary", { state: { Id } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <button
          style={{ backgroundColor: "transparent", color: "ghostwhite" }}
          onClick={handlePayment}
        >
          Proceed to pay
        </button>

        <div className="loading-a">
        </div>
      </div>
    </>
  );
}
