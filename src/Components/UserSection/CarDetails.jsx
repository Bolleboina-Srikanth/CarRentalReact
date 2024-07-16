import React, { useContext, useEffect, useState } from "react";
import "../UserSection/CarDetails.css";
import baleno from "../Images/baleno.png.jpg";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ChairIcon from "@mui/icons-material/Chair";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ColorLens from "@mui/icons-material/ColorLens";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import seat from "../Images/carseat.svg";
import fuel from "../Images/fuel.svg";
import transmission from "../Images/transmission.svg";
import EditIcon from "@mui/icons-material/Edit";
import cariocn from "../Images/car-icon.svg";
import agreementicon from "../Images/agreement-icon.svg";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addHours } from "date-fns";
import { subHours } from "date-fns";

import { UserContext } from "./Context/UserContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

function CarDetails() {
  const { data, saveData, updateData } = useContext(UserContext);
  const navigate = useNavigate();
  const sessionData = sessionStorage.getItem("cardetails");
  const formattedData = JSON.parse(sessionData);

  const millisecondsPerHour = 3600000;
  const millisecondsPerDay = 86400000;
  const DifferenceInTime =
    (data.dropOfdate - data.pickUpdate) / millisecondsPerHour;
  //------------------------------------------------------------------------

  const district = {
    Telangana: ["Hyderabad", "Warangal"],
    AndhraPradesh: ["Tirupati", "Vijayawada"],
  };

  const places = {
    Hyderabad: ["Hitech-City", "Uppal"],
    Warangal: ["HanamKonda", "Kazipet"],
    Tirupati: ["Srikalahasti", "Venkatagiri"],
    Vijayawada: ["Tadepalli", "BenzCircle"],
  };
  const districtsByState = district[sessionStorage.getItem("state")] || [];
  const place = places[sessionStorage.getItem("district")] || [];

  const handleSelectState = (e) => {
    updateData("state", e.target.value);
    updateData("district", "");
    updateData("place", "");
    sessionStorage.setItem("state", e.target.value);
    sessionStorage.setItem("district", "");
    sessionStorage.setItem("place", "");
  };

  const handleChange = (event) => {
    updateData("district", event.target.value);
    updateData("place", "");
    sessionStorage.setItem("district", event.target.value);
    sessionStorage.setItem("place", "");
  };
  const handlePlace = (e) => {
    updateData("place", e.target.value);
    sessionStorage.setItem("place", e.target.value);
  };
  //---------------------------------------------------
  const [cancelDate, setCancelDate] = useState(new Date());
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handlepickUpDate = (date) => {
    if (date < new Date()) {
        updateData("pickUpdate", new Date());
    } else {
      updateData("pickUpdate", date);
    }
    const minDropOfDate = date ? addHours(date, 6) : null;
    if (data.dropOfdate && minDropOfDate && data.dropOfdate < minDropOfDate) {
      updateData("dropOfdate", minDropOfDate);
    }
    const dataaa = new Date(date);
    subtractHours(dataaa, 2);
  };

  const handledropOfdate = (date) => {
    const minDropOfDate = addHours(data.pickUpdate, 6);
    if (date && minDropOfDate && date < minDropOfDate) {
      alert("Minimum booking time period is 6hrs..!");
      updateData("dropOfdate", minDropOfDate);
    } else {
      updateData("dropOfdate", date);
    }
  };

  function subtractHours(date, hours) {
    const newDate = date.setHours(date.getHours() - hours);
    setCancelDate(newDate);
    // return date;
  }
  const [check, setCheck] = useState(false);
  const handleCheckBox = () => {
    setCheck(!check);
  };
  //----------------------------------------------------------------------------
  const handleTopreview = () => {
    if (check) {
      navigate("/previewpage");
    } else {
      alert("please agree to the terms and conditions..!");
    }
  };
  // ------------------------------------------------------------------
  useEffect(() => {
    if (DifferenceInTime < 24) {
      updateData("priceType", "hourly");
      setPrice("hour");
    } else {
      updateData("priceType", "daily");
      setPrice("day");
    }
  }, [DifferenceInTime]);
  const [price, setPrice] = useState("");
  const handlePricehour = () => {
    updateData("priceType", "hourly", "carPrice", 200);
    setPrice("hour");
  };
  const handlePriceday = () => {
    updateData("priceType", "daily", "carPrice", 200);
    setPrice("day");
  };
  //------------------------------------------------------------------
  var toggle = false;
  function subtractHours(date, hours) {
    date.setHours(date.getHours() - hours);
    const dateDiff = data.pickUpdate - new Date();
    const hourss = Math.floor(dateDiff / 3600000);
    console.log("cond", hourss < 2);
    if (hourss < 2) {
      toggle = true;
    } else {
      toggle = false;
    }
    return date;
  }

  console.log(toggle);

  const originalDate = new Date(data.pickUpdate);
  const resultDate = subtractHours(originalDate, 2);

  const formattedResult = resultDate.toLocaleString("en-US", options);

  //-----------------------------------------------------------------------------------
  return (
    <div className="carDetalis-p-c">
      <div className="car-container">
        <div className="car-img">
          <img
            src={formattedData.carPhoto}
            style={{
              width: "95%",
              height: "90%",
              padding: "5px",
              boxShadow: "0 0 10px rgb(220, 216, 216)",
              borderRadius: ".2em",
            }}
            alt=""
          />
        </div>
        <div className="car-details">
          <div className="car-name">
            <span style={{ fontFamily: "monospace", color: "green" }}>
              {formattedData.carBrand}
            </span>
            <strong>{formattedData.carName}</strong>
            <div className="reviews">
              <Rating
                name="half-rating-read"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <span className="noofreviews">&nbsp;30 Reviews</span>
            </div>
          </div>
          <div className="car-full-details">
            <div className="seating">
              <span className="font-color-car">Seating</span>
              <span>
                {" "}
                {formattedData.seating} &nbsp; <img src={seat} alt="" />
              </span>
            </div>
            <div className="seating">
              <span className="font-color-car">Color</span>
              <span>
                {formattedData.carColor}&nbsp;
                <ColorLens style={{ color: "green" }} />{" "}
              </span>
            </div>
            <div className="seating">
              <span className="font-color-car">Type</span>
              <span>
                {formattedData.fuel}&nbsp;
                <img src={fuel} alt="" />{" "}
              </span>
            </div>
            <div className="seating">
              <span className="font-color-car">Transmission</span>
              <span>
                {formattedData.transmission}&nbsp;
                <img src={transmission} alt="" />{" "}
              </span>
            </div>
            <div className="Prices">
              <div
                className="p-hour"
                value="hour"
                id={price == "hour" ? "p-bg-c" : ""}
              >
                <CurrencyRupeeIcon style={{ width: "1.5vw" }} />
                {formattedData.priceperHour} <sub>/hr</sub>
              </div>
              <div
                className="p-day"
                value="day"
                id={price == "day" ? "p-bg-c" : ""}
              >
                <CurrencyRupeeIcon style={{ width: "1.5vw" }} />
                {formattedData.priceperDay} <sub>/day</sub>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="car-policy">
        <div className="selectdate">
          <div className="stateEdit">
            <span style={{ fontWeight: "bold" }}>
              <CalendarTodayIcon /> &nbsp;-Select date{" "}
            </span>
            {/* <span >
                            <select id="stateEdit" onChange={handleSelectState}>
                                <option style={{ color: 'black' }} for="statesOPtions" value="">-Select State-</option>
                                <option style={{ color: 'black' }} value="Telangana">Telangana</option>
                                <option style={{ color: 'black' }} value="AndhraPradesh">AndhraPradesh</option>
                                <option style={{ color: 'black' }} value="Karnataka">Karnataka</option>
                            </select>
                        </span> */}
          </div>
          <div className="select-date">
            <div>
              <span className="font-color-car">DISTRICT</span>
              <br />
              {/* <FormControl sx={{ width: '17vw' }}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    sx={{ height: '8.2vh', textAlign: 'left' }}
                                    placeholder="jgkuuy"
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    // name="state"
                                    value={sessionStorage.getItem("district")}
                                    onChange={handleChange}
                              
                                >
                                    <MenuItem value="">
                                        <em style={{ color: 'gray' }}>-District-</em>
                                    </MenuItem>
                                    {districtsByState.map((d) => (
                                        <MenuItem key={d} value={d}>{d}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl> */}
              <input
                type="text"
                value={sessionStorage.getItem("district")}
                className="cardetails-d-p"
              />
            </div>
            <div>
              <span className="font-color-car">PLACE</span>
              <br />
              {/* <FormControl sx={{ width: '17vw' }}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    sx={{ height: '8.2vh', textAlign: 'left' }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    // name="state"
                                    value={sessionStorage.getItem("place")}
                                    onChange={handlePlace}
                                >
                                    <MenuItem value="">
                                        <em style={{ color: 'gray' }}>-place-</em>
                                    </MenuItem>
                                    {place.map((p) => (
                                        <MenuItem key={p} value={p}>{p}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl> */}
              <input
                type="text"
                value={sessionStorage.getItem("place")}
                className="cardetails-d-p"
              />
            </div>
            <div>
              <span className="font-color-car">PICK-UP DATE</span>
              <br />
              {/* <input type="datetime-local" min="{{date('Y-m-d')}}" value={data.pickUpdate} style={{ width: '17vw', height: '8vh', outline: 'none' }} onChange={handlepickUpDate} /> */}
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
              {/* <input type="datetime-local" value={data.dropOfdate} style={{ width: '17vw', height: '8vh', outline: 'none' }} onChange={handleDropOfDate} /> */}
              <DatePicker
                className="startDate"
                selected={data.dropOfdate}
                onChange={handledropOfdate}
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
              <br />
              <button className="car-edit-btn">
                Edit &nbsp;
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="car-cancellation">
          <div>
            <p style={{ fontWeight: "bolder" }}>Cancellation Policy</p>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {" "}
                <img src={cariocn} alt="" /> Free Cancellation
              </span>
              <div className="cancel-text">
                <p className="font-color-car">
                  Change of plans? No problem! Zero cancellation fee if the booking is cancelled before 2 hours. <br />
                  <span style={{ fontWeight: "bolder", color: "black" }}>
                    <div>
                      {toggle ? <del>{formattedResult}</del> : formattedResult}
                    </div>
                  </span>
                  Quick refund after cancellation
                </p>
              </div>
              <hr />
              <span style={{ fontWeight: "bold" }}>
                {" "}
                <img src={agreementicon} alt="" /> Agreement Policy
              </span>
              <div className="cancel-text">
                <span className="font-color-car">
                  I here by agree to the terms and conditions of the Lease
                  Agreement with Host{" "}
                </span>
                <br />
                <span>
                  <span style={{ fontWeight: "bold" }}> Note: </span>
                  <span className="font-color-car">
                    Minimum booking time period is{" "}
                    <strong>
                      <ins>6 hours</ins>
                    </strong>{" "}
                  </span>
                </span>{" "}
                <br />
                <input
                  type="checkbox"
                  id="car-checkbox"
                  name="car"
                  onChange={handleCheckBox}
                />{" "}
                <label for="car"> I agree to the terms and conditions</label>
              </div>
            </div>
          </div>
          <hr />
          <div className="confirm-booking">
            <button className="confirm-btn" onClick={handleTopreview}>
              Confrim Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
