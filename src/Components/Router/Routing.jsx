import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../Pages/SignInPage";
import ForgotPassword from "../Pages/forgotPassword";
import ResetPassword from "../Pages/resetPassword";
// import DashBoard from "../Dashboard/dashboard";
import AdminDashboard from "../AdminSection/dashBoard";
import CustomersList from "../AdminSection/CustomersList";
import BookingDetails from "../AdminSection/BookingDetails";



import React from "react";
import CarsList from "../AdminSection/CarsList";
import AdminHeader from "../AdminSection/header";
import UserNavbar from "../UserSection/Navbar/userNavbar";
import BookingSummary from "../UserSection/BookingSummary";
import CarDetails from "../UserSection/CarDetails";
import PreviewPage from "../UserSection/Previewpage";
import Payments from "../UserSection/Payments/Payments";
import NavbarStatic from "../UserSection/Navbar/NavbarStatic";
import AvailableCars from "../UserSection/Cars";
import LandingPage from "../LandingPage/landingPage";
import MyOrders from "../UserSection/MyOrders/MyOrders";
import { ContextComponent } from "../UserSection/Context/UserContext";
import SignUpPage from "../Pages/SignUpPage";
import RazorPayTest from "../UserSection/Payments/RazorpayTest";

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <NavbarStatic>
                    <ContextComponent>
                        <Routes>
                            <Route exact path={"/"} element={<LandingPage />} />
                            <Route exact path={"/signin"} element={<SignInPage />} />
                            <Route exact path={'/register'} element={<SignUpPage/>} />
                            <Route exact path={"/forgotpwd"} element={<ForgotPassword />} />
                            <Route exact path={"/resetpwd"} element={<ResetPassword />} />
                            <Route exact path={"/adminheader"} element={<AdminHeader />} />
                            <Route exact path={"/carslist"} element={<CarsList />} />
                            <Route exact path={"/admindashoard"} element={<AdminDashboard />} />
                            <Route exact path={"/customers"} element={<CustomersList />} />
                            <Route exact path={"/bookingDetails"} element={<BookingDetails />} />
                            {/* ---------------------------------------------------------------- */}
                            <Route exact path={"/usernavbar"} element={<UserNavbar />} />
                            <Route path={'/cars'} element={<AvailableCars />} />
                            <Route exact path={"/bookingsummary"} element={<BookingSummary />} />
                            <Route exact path={"/cardetails"} element={<CarDetails />} />
                            <Route exact path={"/previewpage"} element={<PreviewPage />} />
                            <Route exact path={"/payments"} element={<Payments />} />
                            <Route exact path={"/orders"} element={<MyOrders />} />
                            <Route exact path={"/razorpayMode"} element={<RazorPayTest/>}/>
                        </Routes>
                    </ContextComponent>
                </NavbarStatic>
            </BrowserRouter>
        </>
    );
}