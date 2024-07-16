import React, { useEffect, useReducer, useState } from "react";
import "./header.css";
import carLogo from '../Images/DriveEaseroyalblue 1.png';
import title from "../Images/DriveEasewhitetitle 1.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./dashBoard";
import CarsList from "./CarsList";
import CustomersList from "./CustomersList";
import BookingDetails from "./BookingDetails";
import Payments from "./Payments";
import LogoutIcon from '@mui/icons-material/Logout';
import photo from '../Images/skypassphoto.png';
import Avatar from '@mui/material/Avatar';
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import AccountMenu from "./ProfileDetails";


const adminModules = (state, action) => {
  const photo = localStorage.getItem("userPhoto", "");

  switch (action.type) {
    case 'dashboard':
      return 'Dashboard';
    case 'carsList':
      return 'CarsList';
    case 'customersList':
      return 'CustomersList';
    case 'bookingdetails':
      return 'BookingDetails';
    case 'payments':
      return 'Payments';
    default:
      return state;
  }
};

function AdminHeader() {
  const navigate = useNavigate();
  //--------------------------------------------------------------
  const initialState = localStorage.getItem('curretPage') || 'Dashboard';

  const [currentPage, dispatch] = useReducer(adminModules, initialState);

  //------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);
  //-----------------------------------------------------------

  const [logout, setLogout] = useState(false);
  const handledata = () => {
    setLogout(!logout);
  }
  const result = localStorage.getItem("signInResponse");
  const name = JSON.parse(result);
  const handleLogout = () => {
    localStorage.removeItem("signInResponse");
    navigate('/');
    localStorage.setItem("userPhoto", "");
  }
  //--------------------------------------------------------------

  return (
    <div className="admin-container">
      <div class="admin-modules-list">
        <div className="h-logo-title">
          <span id="admin-title"> <img src={carLogo} width="75px" alt="car" />&nbsp;<img src={title}
            width="150px" height={25} alt="" /></span>
        </div>
        <div className="all-modules">
          <div class="module-text" id={currentPage == 'Dashboard' ? 'bg-color1' : ""}><div onClick={() => dispatch({ type: 'dashboard' })} >DashBoard</div></div>

          <div class="module-text" id={currentPage == 'CarsList' ? 'bg-color1' : ""}><div onClick={() => dispatch({ type: 'carsList' })}>Cars List</div></div>
          <div class="module-text" id={currentPage == 'CustomersList' ? 'bg-color1' : ""}><div onClick={() => dispatch({ type: 'customersList' })}>Customers List</div></div>

          <div class="module-text" id={currentPage == 'BookingDetails' ? 'bg-color1' : ""}><div onClick={() => dispatch({ type: 'bookingdetails' })}>Booking Details</div></div>
          <div class="module-text" id={currentPage == 'Payments' ? 'bg-color1' : ""}><div onClick={() => dispatch({ type: 'payments' })}>Payments</div></div>
          <div className="profile-icon">
            {/* <Avatar  onClick={handledata}>{photo !== "" && <img src={photo} width={40} height={40}  alt="" />}</Avatar>
            {logout ? (
              <div className="logout">
                <span style={{ fontFamily: 'initial', marginLeft: '0px' }}>&nbsp;
                  {name.name}
                </span> <br />
                <span><UploadPhoto/></span>
                <LogoutIcon /><span style={{ fontFamily: 'initial' }} onClick={handleLogout}> &nbsp;log out</span>
              </div>) : ""} */}
              <AccountMenu/>
          </div>
        </div>
      </div>

      <div className="admin-components">
        {currentPage === 'Dashboard' && <AdminDashboard />}
        {currentPage === 'CarsList' && <CarsList />}
        {currentPage === 'CustomersList' && <CustomersList />}
        {currentPage === 'BookingDetails' && <BookingDetails />}
        {currentPage === 'Payments' && <Payments />}

      </div>
    </div>
  )
}

export default AdminHeader;