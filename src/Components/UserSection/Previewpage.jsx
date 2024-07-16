import React, { useContext, useEffect, useState } from "react";
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
import CalendarToday from "@mui/icons-material/CalendarToday";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../UserSection/PreviewPage.css";
import TextField from "@mui/material/TextField";
import carmap from "../Images/car-gps-image.jpg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import RazorPayTest from "./Payments/RazorpayTest";
import carlocation from '../Images/carlocationimg.png';

function PreviewPage() {
  const result = localStorage.getItem("signInResponse");
  const dataformatted = JSON.parse(result);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data, updateData } = useContext(UserContext);
  
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDatepickUp = data["pickUpdate"].toLocaleString(
    "en-IN",
    options
  );
  const formattedDatedropOf = data["dropOfdate"].toLocaleString(
    "en-IN",
    options
  );
  const[amountTimePeriod, setAmountTimePeriod] = useState(0);
  const[hours, setHoures] = useState(0);
  useEffect(() => {
    const millisecondsPerHour = 3600000;
    const millisecondsPerDay = 86400000;
    const DifferenceInTime = data.dropOfdate - data.pickUpdate;
    let totalDays = DifferenceInTime /  86400000;
    
    if (data.priceType == "hourly") {
      const hours = DifferenceInTime / millisecondsPerHour;
      setAmountTimePeriod(Math.round(hours));
      const amount = Math.round(hours * data.carPriceHour);
      updateData("carFinalPrice", amount);
      updateData("carFinalPriceTax", Math.round(amount + 99 + amount*18/100));
      updateData("totalDays", Math.round(hours));
    } else {
      const days = (DifferenceInTime / millisecondsPerDay);
      const hours = Math.round((DifferenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setAmountTimePeriod(Math.round(days));
      setHoures(hours);
      const amount = Math.round(days * data.carPriceDay);
      updateData("carFinalPrice", amount);
      updateData("carFinalPriceTax", amount + 99 + 49);
      updateData("totalDays",
        Math.round(days).toString().concat(".", hours.toString())
      );
    }
  },[]);


  const singinData = localStorage.getItem("signInResponse");
  const navigateTopayments = () => {
    if (singinData == null) {
      //  navigate('/previewpage');
      // navigate('/payments');
      // navigate('/razorpayMode');
      navigate("/signin");
    }
  };
  return (
    <div className="carDetalis-p-c-preview">
      <div className="preview-car-price">
        <div className="car-container-preview">
          <div className="car-img">
            <img
              src={data.carPhoto}
              style={{
                width: "94%",
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
                {data.Brand}
              </span>
              <strong>{data.carName}</strong>
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
            <div className="car-full-details-preview">
              <div className="seating">
                <span className="font-color-car">Seating</span>
                <span>
                  {" "}
                  {data.seating} &nbsp; <img src={seat} alt="" />
                </span>
              </div>
              <div className="seating">
                <span className="font-color-car">Color</span>
                <span>
                  {data.carColor}&nbsp;
                  <ColorLens style={{ color: "green" }} />{" "}
                </span>
              </div>
              <div className="seating">
                <span className="font-color-car">Type</span>
                <span>
                  {data.fuel}&nbsp;
                  <img src={fuel} alt="" />{" "}
                </span>
              </div>
              <div className="seating">
                <span className="font-color-car">Transmission</span>
                <span>
                  {data.transmission}&nbsp;
                  <img src={transmission} alt="" />{" "}
                </span>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="personal-details-preview">
          <div className="map">
            <span style={{ fontWeight: "bold" }}>Find our location </span>
            {loading &&
            <div class="loader">
            <label className="labeltext">Please wait redirecting...</label>
            <div class="loading"></div>
          </div>
          }
            <img src={carlocation} width={"99%"} height={120} alt="" />
          </div>
          <div className="preview-person-details">
            {/* <div>
              <h6>Your Details:</h6>
              <div className="preview-name-container">
                <div>
                  <div className="reservation-gray-color">NAME :</div>
                  <span>
                    <TextField
                      id="outlined-basic"
                      value={singinData != null ? dataformatted.name : ""}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          width: "21.2vw",
                          height: "7vh",
                          background: "rgb(232, 241, 250)",
                        },
                      }}
                    />
                  </span>
                </div>
                <div>
                  <div className="reservation-gray-color">ADDRESS :</div>
                  <span>
                    <TextField
                      id="outlined-basic"
                      value={singinData != null ? dataformatted.address : ""}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          width: "21.2vw",
                          height: "7vh",
                          background: "rgb(232, 241, 250)",
                        },
                      }}
                    />
                  </span>
                </div>
              </div>
              <br />
              <div className="preview-name-container">
                <div>
                  <div className="reservation-gray-color">EMAIL :</div>
                  <span>
                    <TextField
                      id="outlined-basic"
                      value={singinData != null ? dataformatted.email : ""}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          width: "21.2vw",
                          height: "7vh",
                          background: "rgb(232, 241, 250)",
                        },
                      }}
                    />
                  </span>
                </div>
                <div>
                  <div className="reservation-gray-color">PHONE NUMBER :</div>
                  <span>
                    <TextField
                      id="outlined-basic"
                      value={
                        singinData != null ? dataformatted.phonenumber : ""
                      }
                      variant="outlined"
                      InputProps={{
                        sx: {
                          width: "21.2vw",
                          height: "7vh",
                          background: "rgb(232, 241, 250)",
                        },
                      }}
                    />
                  </span>
                </div>
              </div>
            </div> */}
            <span style={{ fontWeight: "bold" }}>Benefits with DriveEase</span>
            <div className="assistane-privacy">
            <div className="car-assistance">
              <span style={{color:"black"}}>24x7 Road Side Assistance</span> 
           <p>Rest assured, we provide 24x7 roadside assistance with every booking. Your safety is paramount, and our assistance is always at your service.</p> 
            </div>
            <div className="car-privacy">
              <span style={{color:"black"}}>100% Privacy</span> <br />
           <p> Unlock an all new experience with self drive! You enjoy an extra space with no external or unknown driver in your car, stop where you want and change your route without any fuss.</p> 
            </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="price-summary-preview">
        <strong>Reservation Summary</strong>
        <div className="b-dates">
          <div className="pickandDrop">
            {/* <div>
              <span className="reservation-gray-color">Pick-Up</span>
              <br />
              <span className="reservation-font-color">
                {formattedDatepickUp}
              </span>
              <br />
              <span className="reservation-gray-color">Drop-Off</span>
              <br />
              <span className="reservation-font-color">
                {formattedDatedropOf}
              </span>
            </div> */}
            <div className="rentformatted">
                            <span className="reservation-gray-color">Pick-Up: </span>  <br />
                            <span className="reservation-font-color">{formattedDatepickUp ? formattedDatepickUp.substring(0, 22) : ""}</span>
                        </div>
                        <div>
                            <span className="reservation-gray-color">Drop-Off: </span> <br />
                            <span className="reservation-font-color">{formattedDatedropOf ? formattedDatedropOf.substring(0, 22) : ""}</span>
                        </div>
          </div>
          <br />
          <div>
            <span>Total no.of {data.priceType == "hourly" ? "hours:" : "days:"} </span>
            <span className="reservation-font-color">
              {data.priceType == "hourly" ? amountTimePeriod : `${amountTimePeriod}days,${hours}hours`} <CalendarToday style={{ width: "1.5vw" }} />
            </span>
          </div>
          <div className="pickandDrop">
            <div>
              <span className="reservation-gray-color">Brand: </span>
              <span className="reservation-font-color">{data.Brand}</span>
            </div>
            <div>
              <span className="reservation-gray-color">Name: </span>
              <span className="reservation-font-color">{data.carName}</span>
            </div>
          </div>
        </div>
        <div className="booking-price"> 
          <span style={{ fontWeight: "bold" }}>Your price summary</span>
          <div className="price-details">
            <span className="reservation-gray-color">Car price:</span>
            <span>
              <CurrencyRupeeIcon style={{ width: "1.3vw" }} />
              {data.carFinalPrice}
            </span>
          </div>
          <div className="price-details">
            <span className="reservation-gray-color">Extra(Maintainance fee):</span>
            <span>
              <CurrencyRupeeIcon style={{ width: "1.3vw" }} />
              99
            </span>
          </div>
          <div className="price-details">
            <span className="reservation-gray-color">GST(18%):</span>
            <span>
              <CurrencyRupeeIcon style={{ width: "1.3vw" }} />
              {Math.round(data.carFinalPrice*18/100)}
            </span>
          </div>
          <hr />
          <div className="price-details">
            <span style={{ color: "#76ff03", fontWeight: "bold" }}>
              Total Price:
            </span>
            <span style={{ color: "#76ff03", fontWeight: "bold" }}>
              <CurrencyRupeeIcon style={{ width: "1.6vw", color: "#76ff03" }} />
              {data.carFinalPriceTax}
            </span>
          </div>
          <button className="request-tobook" onClick={navigateTopayments}>
            {singinData != null ? <RazorPayTest setLoading={setLoading}/> : <span style={{color: "ghostwhite"}}>Proceed to pay</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PreviewPage;
