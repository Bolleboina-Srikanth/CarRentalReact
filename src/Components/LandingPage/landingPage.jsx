import React, { createContext, useContext, useEffect, useState } from "react";
import "../LandingPage/landingPage.css";
import titleImage from "../Images/DriveEaselogoBlack.png";
import titleImageblack from "../Images/1-removebg-preview (1).png";
import title from "../Images/DriveEasetitleblack 1.png";
import carImage from "../Images/hero-1 1 (2).png";
import carImage2 from "../Images/DriveEaselogoBlack.png";
import hpycust from "../Images/DriveEaselogoBlack.png";
import tayota from "../Images/Toyota.png";
import footerimg from "../Images/DriveEaselogoBlack.png";
import phoneimage from "../Images/phone-icon.svg";
import mailimage from "../Images/mail.svg";
import instagramimage from "../Images/instagram.svg";
import twitterimage from "../Images/twitter.svg";
import youtubeimage from "../Images/youtube.svg";
import facebookimage from "../Images/facebook.svg";
import aboutusimg from "../Images/aboutusimg.png";
import cariocn from "../Images/Vector.svg";
import tickicon from "../Images/circletick.svg";
import mobileimg from "../Images/Drivestep1.png";
import selecttimeimg from "../Images/selecttimeimg.png";
import drivedeposit from "../Images/depositimg.png";
import driveawayimg from "../Images/driveaway.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserSection/Context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import carimg from "../Images/blackcarimage.png";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import phoneiconsvg from "../Images/phonesvgf.svg";
import mailiconsvg from "../Images/mailsvgf.svg";
import locationiconsvg from "../Images/locationsvgf.svg";
import titlef from "../Images/DriveEasewhitetitle 1.png";
import arrowright from "../Images/arrowright.svg";
import emailfly from '../Images/emailfly.svg';
import facebook from '../Images/facebooksvg.svg';
import twitter from '../Images/twittersvg.svg';
import linkedin from '../Images/linkedinsvg.svg';
import youtube from '../Images/youtubesvg.svg';
import {addHours} from 'date-fns';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import AccountMenu from "../AdminSection/ProfileDetails";

function LandingPage() {
  const navigate = useNavigate();
  const result = localStorage.getItem("signInResponse");
  const formattedData = JSON.parse(result);
  const [searchCars, setSearchCars] = useState(false);

  const { data, updateData } = useContext(UserContext);

  

  const district = {
    Telangana: ["Hyderabad", "Warangal"],
    AndhraPradesh: ["Tirupati", "Vijayawada"],
  };

  const places = {
    Hyderabad: ["HitechCity", "Uppal"],
    Warangal: ["HanamKonda", "Kazipet"],
    Tirupati: ["Srikalahasti", "Venkatagiri"],
    Vijayawada: ["Tadepalli", "BenzCircle"],
  };

  const districtByState = district[data.state] || [];
  const place = places[data.district] || [];

  const handleSelectState = (event) => {
    setSearchCars(false);
    updateData("state", event.target.value);
    updateData("district", "");
    updateData("place", "");
    sessionStorage.setItem("state", event.target.value);
  };

  const handleSelectDistrict = (event) => {
    updateData("district", event.target.value);
    updateData("place", "");
    sessionStorage.setItem("district", event.target.value);
  };

  const handlePlace = (e) => {
    updateData("place", e.target.value);
    sessionStorage.setItem("place", e.target.value);
  };

  const handlepickUpDate = (date) => {
    if (date < new Date()) {
      updateData("pickUpdate", new Date());
  } else {
    updateData("pickUpdate", date);
  }
    const minDropOfDate = date ? addHours(date, 6) : null;
    if(data.dropOfdate && minDropOfDate && data.dropOfdate < minDropOfDate)
    {
        updateData("dropOfdate", minDropOfDate);
    }
  };
  


  const handledropOfdate = (date) => {
    const minDropOfDate = date ? addHours(data.pickUpdate, 6) : null;
    if(date && minDropOfDate && date < minDropOfDate){
      alert("Minimum booking time period is 6hrs..!");
    updateData("dropOfdate", minDropOfDate);
    }
    else{
        updateData("dropOfdate",date);
    }
  };
  //--------------------------------------------------------------------------
  const [activeModule, setActiveModule] = useState("home");
  const handleHome = () => {
    setActiveModule("home");
  };

  const handleStateModule = () => {
    setActiveModule("states");
  };

  const handleaboutus = () => {
    setActiveModule("aboutus");
  };

  const handleconditions = () => {
    setActiveModule("terms");
  };

  const handleReviews = () => {
    setActiveModule("reviews");
  };
  //----------------------------------------------------------------
  const[date, setDate] = useState(data.pickUpdate);
  const navigatetomycars = () => {
    setActiveModule("states");
    setSearchCars(data.state == "");
    if (
      data.district != "" &&
      data.place != "" &&
      data.pickUpdate != "" &&
      data.dropOfdate != ""
    )
    {
      navigate("/cars");
    }
  };

  const navigatetologin = () => {
    navigate("/signin");
  };

  const navigatetoregister = () => {
    navigate("/register");
  };
  const [isTrue, setIstrue] = useState(false);
  const handlelogout = () => {
    localStorage.removeItem("signInResponse");
    localStorage.setItem("userPhoto", "");
    setIstrue(true);
  };

  function myfunction() {}
  
  const[districtError, setDistrictError] = useState(false);
  const handleDistrictError = () =>{
    if(data.state === ""){
    setDistrictError(true)
    }
    else{
      setDistrictError(false)
    }
  }

  const[placeError, setPlaceError] = useState(false);
  const handlePlaceError = () =>{
    if(data.district === ""){
      setPlaceError(true)
    }
    else{
      setPlaceError(false)
    }
  }

  return (
    <div className="landingbody">
      <div className="landing-Header">
        <div className="contact-detalis">
          <div className="details">
            <MailOutlineIcon style={{ fontSize: "1.3vw" }} />{" "}
            driveeasecars@gmail.com
          </div>
          <div className="details">
            <PhoneIcon style={{ fontSize: "1.3vw" }} />
            +12-096-2371
          </div>
          <div className="details">
            <AccessTimeIcon style={{ fontSize: "1.3vw" }} /> Sun-Sat(8am-9pm)
          </div>
          <div className="welcome-l-m">
          <div
            className="details"
            onClick={formattedData != null ? myfunction : navigatetologin}
          >
            {formattedData != null ? (
              <span className="welcometext">Welcome {formattedData.name}</span>
            ) : (
              <span>
                <LoginIcon style={{ fontSize: "1.3vw" }} />
                &nbsp;Login
              </span>
            )}
          </div>
          <div
            className="details"
            onClick={formattedData != null ? myfunction : navigatetoregister}
          >
            {formattedData != null ? (
              // <button className="l-logout" onClick={handlelogout}>
              //   Logout
              // </button>
              <AccountMenu/>
            ) : (
              <span>
                <PersonIcon style={{ fontSize: "1.4vw" }} />
                &nbsp;Register
              </span>
            )}
          </div>
          </div>
        </div>

        <div class="modules">
          <div class="module1">
            <div>
              <img src={titleImage} width="75px" alt="car" />
            </div>
            <div>
              <img src={title} width="140px" alt="bbnn" />
            </div>
          </div>
          <div
            class="module"
            style={{ width: "6%", height: "70%" }}
            id={activeModule === "home" ? "bg-color-l" : ""}
            onClick={handleHome}
          >
            <a
              href="#home"
              className="landing-anchor"
              id={activeModule === "home" ? "bg-color-l1" : ""}
            >
              Home
            </a>{" "}
          </div>

          <div
            class="module"
            style={{ width: "10%", height: "70%" }}
            id={activeModule === "states" ? "bg-color-l" : ""}
            onClick={handleStateModule}
          >
            <select
              name="states"
              id="statesOPtionslanding"
              onChange={handleSelectState}
            >
              <option style={{ color: "black" }} for="statesOPtions" value="">
                States
              </option>
              <option style={{ color: "black" }} value="Telangana">
                Telangana
              </option>
              <option style={{ color: "black" }} value="AndhraPradesh">
                Andhra Pradesh
              </option>
            </select>
            <div className="p-a-a">
              <a
                href="#loca-date"
                id={activeModule === "states" ? "bg-color-l12" : ""}
              >
              </a>
            </div>
          </div>

          <div
            class="module"
            style={{ color: "black", width: "7%", height: "70%" }}
            id={activeModule === "aboutus" ? "bg-color-l" : ""}
            onClick={handleaboutus}
          >
            <a
              href="#aboutus"
              className="landing-anchor"
              id={activeModule === "aboutus" ? "bg-color-l1" : ""}
            >
              {" "}
              About us
            </a>
          </div>

          <div
            class="module"
            style={{ color: "black", width: "13%", height: "70%" }}
            id={activeModule === "terms" ? "bg-color-l" : ""}
            onClick={handleconditions}
          >
            <a
              href="#termsandcond"
              className="landing-anchor"
              id={activeModule === "terms" ? "bg-color-l1" : ""}
            >
              Terms&Conditions{" "}
            </a>
          </div>

          <div
            class="module"
            style={{ color: "black", width: "7%", height: "70%" }}
            id={activeModule === "reviews" ? "bg-color-l" : ""}
            onClick={handleReviews}
          >
            <a
              href="#reviews"
              className="landing-anchor"
              id={activeModule === "reviews" ? "bg-color-l1" : ""}
            >
              Reviews
            </a>
          </div>
        </div>
      </div>

      <div className="fullbody">
        <div class="r" id="home">
          <div class="text">
            <p className="naviagte-text">
              {" "}
              Navigate your journey with effort less rentals!
            </p>{" "}
            <br />
            <div className="welcome-text">
              <span>Welcome To Drive Ease</span>
              <br />
              <span>Best</span>
              <span>Way To find your Dream Car </span>
            </div>
          </div>
          <div className="cimage">
            <img
              src={tayota}
              alt="car image"
              width="90%"
              height="75%"
              style={{ marginTop: "10vh" }}
            />
            <div className="circle"></div>
          </div>
        </div>
        <div className="location" id="loca-date">
          <div className="select-date-landing">
            <div>
              <span className="font-color-car" >DISTRICT</span>
              <br />
              <br />
              <div className="district-error">
              <FormControl sx={{ width: "17vw"}}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  sx={{ height: "8.2vh", textAlign: "left" }}
                  placeholder="jgkuuy"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={data.district}
                  onMouseEnter={handleDistrictError}
                  onMouseLeave={handleDistrictError}
                  onChange={handleSelectDistrict}
                >
                  <MenuItem value="">
                    <em style={{ color: "gray" }}>-District-</em>
                  </MenuItem>
                  {districtByState.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {districtError && (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{width: "17vw",  position: "absolute",top: 0 }}
                  >
                    please select state 
                  </Alert>
                )}
                </div>
            
            </div>
            <div>
              <span className="font-color-car">PLACE</span>
              <br />
              <br />
              <div className="district-error">
              <FormControl sx={{ width: "17vw" }}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  sx={{ height: "8.2vh", textAlign: "left" }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={data.place}
                  onChange={handlePlace}
                  onMouseEnter={handlePlaceError}
                  onMouseLeave={handlePlaceError}
                >
                  <MenuItem value="">
                    <em style={{ color: "gray" }}>-place-</em>
                  </MenuItem>
                  {place.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {placeError && (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{width: "17vw",  position: "absolute",top: 0 }}
                  >
                    please select district
                  </Alert>
                )}
              </div>
            </div>
            <div>
              <span className="font-color-car">PICK-UP DATE</span>
              <br />
              <br />
              <DatePicker
                className="startDate"
                selected={data.pickUpdate}
                onChange={handlepickUpDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                maxDate={addDays(new Date(), 90)}
              />
            </div>
            <div>
              <span className="font-color-car">DROP-OFF DATE</span>
              <br />
              <br />
              <DatePicker
                className="startDate"
                selected={data.dropOfdate}
                onChange={handledropOfdate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={data.pickUpdate ? addHours(data.pickUpdate, 6) : addHours(data.pickUpdate, 6)}
                maxDate={addDays(new Date(), 90)}
              />
            </div>

            <div className="search-car-alert">
              <button className="car-search" onClick={navigatetomycars} >
                Search cars
              </button>
              {searchCars && (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{  position: "absolute", top: "0" }}
                  >
                    please select state,district,place 
                  </Alert>
                )}  
            </div>
          </div>
        </div>

        <div class="bookcar">
          <div class="bookcar1"> How to book a car with DriveEase Cars?</div>
          <div class="bookcar2">
            <div class="bookcar3">
              <div class="bookcar4">
                <img src={mobileimg} alt="car" width="95%" />
              </div>
              <div class="bookcar5">Login to driveease.com or use the app</div>
            </div>
            <div class="bookcar3">
              <div class="bookcar4">
                <img src={selecttimeimg} alt="car" width="95%" />
              </div>
              <div class="bookcar5">Select city, date and time</div>
            </div>
            <div class="bookcar3">
              <div class="bookcar4">
                <img src={drivedeposit} alt="car" width="95%" />
              </div>
              <div class="bookcar5">
                Pick a car of your choice at 0 security deposit
              </div>
            </div>
            <div class="bookcar3">
              <div class="bookcar4">
                <img src={driveawayimg} alt="car" width="90%" />
              </div>
              <div class="bookcar5">
                Driveaway with the freedom of unlimited KMs
              </div>
            </div>
          </div>
        </div>

        <div className="about-us " id="aboutus">
          <div className="about-us-p">
            <div className="about-us-c1">
              <img src={aboutusimg} alt="" />
            </div>
            <div className="about-us-c2">
              <img src={cariocn} width={30} id="about-us-car" alt="" />
              <span id="about-text">
                &nbsp; A&nbsp;B&nbsp;O&nbsp;U&nbsp;T&nbsp; U&nbsp;S
              </span>
              <p style={{ fontWeight: "bold", fontSize: "3vw" }}>
                World Largest{" "}
                <span style={{ color: "royalblue" }}>
                  Car <br /> Dealer{" "}
                </span>
                Marketplace.
              </p>
              <p style={{ color: "gray" }}>
                DriveEase is the leading marketplace for car sharing in emerging
                markets,with over 20,000 cars on its technology-driven platform
                across India.
              </p>
              <img src={tickicon} alt="" />
              <span style={{ fontWeight: "600" }}>
                &nbsp; Guests in the DriveEase community enjoy a diverse.
              </span>
              <br />
              <br />
              <img src={tickicon} alt="" />
              <span style={{ fontWeight: "600" }}>
                &nbsp; DriveEase employs over 250 people and operates in over 45
                cities across India.
              </span>
              <br />
              <br />
              <img src={tickicon} alt="" />
              <span style={{ fontWeight: "600" }}>
                &nbsp; Founded in 2024 and headquartered in Hyderabad, India.
              </span>
              <br />
            </div>
          </div>
        </div>

        <div class="faq">
          <div class="faq1">FAQs</div>
          <div class="faq2">
            <div class="faq21">
              <div class="faq22">
                How much does it cost to travel in a rental car in Hyderabad?
              </div>
              <div class="faq23">
                The cost of a self-driven car rental depends upon several
                factors such as - car model, fuel prices, and the number of
                traveling days. However, at DriveEase, you can get a self-drive
                car for as low as Rs. 1000/day to ride in Hyderabad.
              </div>
            </div>
            <div class="faq21">
              <div class="faq22">Can I extend/ cancel/ modify?</div>
              <div class="faq23">
                Yes, extensions are possible subject to availability & charges.
                Cancellations & modifications will attract nominal charges as
                per our policy.Yes, extensions are possible subject to
                availability & charges. Cancellations & modifications will
                attract nominal charges as per our policy.
              </div>
            </div>
            <div class="faq21">
              <div class="faq22">Is there a speed limit?</div>
              <div class="faq23">
                DriveEase allows up to 125 km/hr. However it is 80 km/hr in a
                few cities where some cars might be equipped with speed
                governors as per government directives and strictly advises to
                follow local speed limits.
              </div>
            </div>
            <div class="faq21">
              <div class="faq22">
                How much security deposit do I have to pay for a self-driving
                car in Hyderabad?
              </div>
              <div class="faq23">
                The amount for the security deposit depends upon the self-drive
                car package you choose. However, the security amount generally
                gets refunded within 5 to 12 working days.
              </div>
            </div>
          </div>
        </div>

        <div className="Tc" id="termsandcond">
          <div className="Tc1"> Terms and Conditions</div>
          <div className="Tc2">
            <div className="Tc3">
              Upon accepting the terms and conditions as set out here in after,
              the User agrees and acknowledges that: DriveEase has established a
              website having the registered domain address as
              www.DriveEase.co.in (“Website”) where the terms and conditions of
              use of vehicles provided by Revv have been displayed. It is the
              responsibility of the user to ask representatives of
              DriveEase.co.in and obtain a soft copy of the agreement if they
              are unable to view or access the terms & conditions as set out in
              website/ Mobile applications. The User has read and understood the
              terms and conditions as set out herein and agrees to abide and be
              bound by such terms and conditions including those relating to
              rental of cars, fee schedule and privacy policy and
              confidentiality terms. Revv reserves the right to change the terms
              of this Agreement from time to time with the provision of notice
              to the User which shall be considered given when these terms and
              conditions are updated on the Website, iOS / Android apps. The
              User agrees that the amended terms and conditions of this
              Agreement shall be effective and binding on the date when such
              change is posted on the Website. The provision of vehicles to the
              User is subject to the acceptance by the User of all the terms and
              conditions as set out herein. In the event that the User does not
              accept any term and/or condition as provided herein or as may be
              amended, the User will not be authorized to use any vehicles or
              services provided by Revv. For the avoidance of doubt it is
              clarified that use of any vehicles or services provided by Revv
              would signify an acceptance by the User of all the terms and
              conditions including as set out herein including any terms and
              conditions as may be amended, substituted or novated from time to
              time. Moreover, this agreement doesn’t provide the exclusive right
              to the User for use of vehicle and in all situations, Revv shall
              be authorized to exercise required controls during the rental
              period.
            </div>
          </div>
        </div>

        <div class="hc" id="reviews">
          <div class="hc1">HAPPY CUSTOMERs</div>
          <div class="hc2">
            <div class="hc3">
              <div class="hc4">
                {/* <img src={hpycust} alt="userphoto"
                                id="pimage" /> */}
                <AccountCircleIcon id="pimage" />
              </div>
              <div class="hc5">Yashwanth</div>
              <div class="hc6">
                Yes, extensions are possible subject to availability & charges.
                Cancellations & modifications will attract nominal charges as
                per our policy .
              </div>
            </div>

            <div class="hc3">
              <div class="hc4">
                <AccountCircleIcon id="pimage" />
              </div>
              <div class="hc5">Yashwanth</div>
              <div class="hc6">
                Yes, extensions are possible subject to availability & charges.
                Cancellations & modifications will attract nominal charges as
                per our policy.
              </div>
            </div>

            <div class="hc3">
              <div class="hc4">
                <AccountCircleIcon id="pimage" />
              </div>
              <div class="hc5">Yashwanth</div>
              <div class="hc6">
                Yes, extensions are possible subject to availability & charges.
                Cancellations & modifications will attract nominal charges as
                per our policy.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer class="footer">
        <div class="footer1">
          <div class="footer2">
            <div class="footer21">
              <img src={carimg} width="250px" alt="car" />
            </div>
            <div class="footer22">
              At DriveEase, we're committed, driven, and unwavering in our
              pursuit to craft exceptional automotive experiences that empower
              you to unlock your fullest potential. We deliver top-tier
              vehicles, community, support, and avenues for you to thrive on the
              road.
            </div>
          </div>
        </div>

        <div class="footer3">
          <div class="footer4">
            <div class="footer5">
              <div class="footer51">
                <div class="footer511">
                  <img src={phoneimage} alt="" />
                </div>
                <div class="footer512">+12-096-2371</div>
              </div>

              <div class="footer51">
                <div class="footer511">
                  <img src={mailimage} alt="" />
                </div>
                <div class="footer512">driveeasecars@gmail.com</div>
              </div>
              <div class="footer52">
                23-212/23,YashTreeePark Building,2nd Floor, Near Raidurg Metro
                Station, Hitech city Road, Hyderabad - 500081,Telangana, India.
              </div>
              <div class="footer53">
                <img src={instagramimage} alt="" />
                <img src={twitterimage} alt="" />
                <img src={youtubeimage} alt="" />
                <img src={facebookimage} alt="" />
              </div>
            </div>
            <div class="footer6">
              <div class="footer61">All Branches</div>
              <div class="footer61">Testinomials</div>
              <div class="footer61">Gallery</div>
              <div class="footer61">FAQ</div>
              <div class="footer61">Blog</div>
              <div class="footer61">Sitemap</div>
            </div>
            <div class="footer6">
              <div class="footer61">Cars</div>
              <div class="footer61">DriveEase Connect</div>
              <div class="footer61">Carrers</div>
              <div class="footer61">Partner With Us</div>
              <div class="footer61">Investors</div>
            </div>
            <div class="footer6">
              <div class="footer61">Contact Us</div>
              <div class="footer61">Terms & Conditions</div>
              <div class="footer61">Privacy Policy</div>
              <div class="footer61">Refund Policy</div>
              <div class="footer61">Contact</div>
            </div>
            <div class="footer6">
              <div class="footer61">Cars in Gachibowli</div>
              <div class="footer61">Cars in Shamshabad</div>
              <div class="footer61">Cars in Uppal</div>
              <div class="footer61">Cars in Kukatpally</div>
              <div class="footer61">Cars in Alwal</div>
              <div class="footer61">Cars in Medchal </div>
              <div class="footer61">Cars in Warangal </div>
            </div>
          </div>
        </div>
        <div class="navbar7">
          <div>Copyright @ 2024 DriveEase private limited</div>
          <div> Designed By Yashwanth Srikanth</div>
        </div>
      </footer> */}
      <footer className="footer2s">
        <div className="footerDetails">
          <div className="img-div-f">
            <span>
              <img src={carimg} alt="" width={100} />
              <img src={titlef} alt="" width={110} height={25}/>
            </span>
            <p className="img-text-f">
              We are many variations of passages available but the majority have
              suffered alteration in some form <br />
            </p>
            <div className="cont-d-f2">
              <span>
                <img src={phoneiconsvg} alt="" width={20} />
                &nbsp; +912100237829{" "}
              </span>
              <span>
                <img src={locationiconsvg} alt="" width={20} />
                &nbsp; Telangana, India{" "}
              </span>
              <span>
                <img src={mailiconsvg} alt="" width={20} />
                &nbsp; driveEase@gmail.com{" "}
              </span>
            </div>
          </div>
          <div className="img-div-f2">
            <ul className="list-items-f">
              <span className="quick-links">Quick Links</span>
              <li>
                <img src={arrowright} alt="" /> About Us
              </li>
              <li>
                <img src={arrowright} alt="" />
                Update News
              </li>
              <li>
                <img src={arrowright} alt="" />
                Testimonials
              </li>
              <li>
                <img src={arrowright} alt="" />
                Privacy Policy
              </li>
              <li>
                <img src={arrowright} alt="" />
                Our Dealers
              </li>
            </ul>
          </div>
          <div className="img-div-f3">
            <ul className="list-items-f">
              <span className="quick-links">Support Center</span>
              <li>
                <img src={arrowright} alt="" /> FAQs
              </li>
              <li>
                <img src={arrowright} alt="" />
                Affilities
              </li>
              <li>
                <img src={arrowright} alt="" />
                Booking Tips
              </li>
              <li>
                <img src={arrowright} alt="" />
                Privacy & Policy
              </li>
              <li>
                <img src={arrowright} alt="" />
                Contact Us
              </li>
            </ul>
          </div>
          <div className="img-div-f4">
            <ul className="list-items-f">
              <li>
                <span className="quick-links">News Letter</span>
              </li>
             <li> <span style={{fontSize: "13px", marginBottom: "15px"}}>
                Subscribe Our Newsletter To Get Latest Update And News
              </span></li>
             <li> <input type="text" placeholder="Your Email" id="f-email-input"/></li>
              <li><button>Subscribe Now <img src={emailfly} alt="" /></button></li>
            </ul>
          </div>
        </div>
        <div className="socialicons-div">
            <div className="footer-c-icons1">
            <span>&#169; Copyright 2024 <span style={{color: "royalblue", }}>DriveEase</span> All Rights are Reserved</span><br />
            <span>Designed and customized by <span style={{color: "royalblue",}}>Yashwanth & Srikanth</span></span>
            </div>
            <div className="footer-c-icons2">
                <div className="footer-c-icons3">
                <img src={facebook} alt="" width={20} height={20}/>
                <img src={twitter} alt="" width={20} height={20}/>
                <img src={linkedin} alt="" width={20} height={20}/>
                <img src={youtube} alt="" width={25} height={21.5}/>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;
