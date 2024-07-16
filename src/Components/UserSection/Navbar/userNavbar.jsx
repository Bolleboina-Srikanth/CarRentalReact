import React, { useContext, useEffect, useReducer, useState } from "react";
import "../../UserSection/Navbar/userNavbar.css";
import carLogo from "../../Images/DriveEaseroyalblue 1.png";
import title from "../../Images/DriveEasewhitetitle 1.png";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "../../AdminSection/ProfileDetails";

const UserNavbar = () => {
  const result = localStorage.getItem("signInResponse");
  const formatted = JSON.parse(result);
  const getPhoto = localStorage.getItem("userPhoto");
  const location = useLocation();
  const activeOrders = location.state;
  console.log(location);
  //-----------------------------------------------------------------------------------

  const [activeModule, setActiveModule] = useState("cars");

  useEffect(() => {
    if (activeOrders !== null) setActiveModule(activeOrders);
  }, []);

  const navigate = useNavigate();
  const navigateTocars = () => {
    navigate("/cars");
    setActiveModule("cars");
  };
  //----------------------------------------------------------
  const [logout, setLogout] = useState(false);
  const handledata = () => {
    setLogout(!logout);
  };
  const handleLogout = () => {
    localStorage.removeItem("signInResponse");
    localStorage.removeItem("token");
    localStorage.removeItem("carid");
    navigate("/");
  };
  //---------------------------------------------------------------
  const handlehome = () => {
    navigate("/");
  };

  const handleorders = () => {
    setActiveModule("orders");
    if (formatted != null) {
      navigate("/orders");
    } else {
      sessionStorage.setItem("prevPage", "/orders");
      navigate("/signin");
    }
  };
  const handleNavigate = () => {
    navigate("/signin");
  };

  //--------------------------------------------------------------
  return (
    <div className="admin-container" style={{ overflowY: "hidden" }}>
      <div class="admin-modules-list" id="user-z">
        <div className="h-logo-title">
          <span id="admin-title">
            {" "}
            <img src={carLogo} width="75px" alt="car" />
            &nbsp;
            <img src={title} width="150px" height={25} alt="" />
          </span>
        </div>
        <div className="user-all-modules">
          <div class="module-text" onClick={handlehome}>
            <div>Home</div>
          </div>
          {location.pathname !== "/orders" && (
            <div
              class="module-text"
              id={activeModule == "cars" ? "bg-color" : ""}
              onClick={navigateTocars}
            >
              <div>Cars</div>
            </div>
          )}
          {/* <div class="module-text" id={activeModule == "orders" ? "bg-color" : ""} onClick={handleorders}><div >MyOrders</div></div> */}
          <div className="profile-icon">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;

{
  /* <Avatar  onClick={handledata}>{ getPhoto !== "" && <img src={localStorage.getItem("userPhoto")} width={40} height={40}  alt="" />}</Avatar> 
                        {logout ? (
                            <div className={result == null ? "logout2" : "logout1"}>
                                <span style={{ fontFamily: 'initial' }}>&nbsp;
                               {result != null ? formatted.name : <span onClick={handleNavigate}><img src={loginicon} alt="" />&nbsp; login</span> }
                                </span><br />
                                {result != null ?  <span> <UploadPhoto/></span> : ""} 
                                {result != null ? <div> <LogoutIcon /><span style={{ fontFamily: 'initial' }} onClick={handleLogout}> &nbsp;log out</span></div> : "" }
                            </div>) : ""} */
}
