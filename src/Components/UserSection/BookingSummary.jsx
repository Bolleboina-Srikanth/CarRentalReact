import React, { useContext, useEffect, useRef, useState } from "react";
import '../UserSection/BookingSummary.css';
import tickicon from '../Images/tick.svg';
import CalendarToday from "@mui/icons-material/CalendarToday";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import a from '../Images/car-a.png';
import { UserContext } from "./Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { GetInvoiceByBookingID } from "../Services/CarServices";


function BookingSummary() {
    const { data, updateDate } = useContext(UserContext);
    const navigate = useNavigate();
    const localdata = localStorage.getItem("signInResponse");
    const result = JSON.parse(localdata);
    const [invoicedata, setInvoicedata] = useState({});
    const[hideButtons, setHideButtons] = useState(false);
    const[amountTimePeriod, setAmountTimePeriod] = useState(0);
    const[hours, setHoures] = useState(0);

    const location = useLocation();
    const bookingId = location.state;
    const id = bookingId.Id;
    const options = {
        year: "numeric",
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }
    const newoptions = {
        year: "numeric",
        month: 'long',
        day: 'numeric',
    }
    const formattedDatepickUp = invoicedata.rentDate ? invoicedata.rentDate.toLocaleString('en-IN', options) : "";
    const formattedDatedropOf =  invoicedata.returnDate ? invoicedata.returnDate.toLocaleString('en-IN', options) : "";


    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        // Get the time in 12-hour format
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    
        return `${formattedDate} ${formattedTime}`;
    }
    
    
    
    const myfunction = () => {
        var printButton = document.getElementById("printpagebutton");
        printButton.style.visibility = 'hidden';
        var printButton2 = document.getElementById("printpagebutton2");
        printButton2.style.visibility = 'hidden';
        window.print();
        printButton.style.visibility = 'visible';
        printButton2.style.visibility = 'visible';
    }

    const setFunction = () =>{
        setHideButtons(true);
    }
    useEffect(()=>{
        setHideButtons(false);
    },[])

    const isroleTrue = result.role == "Admin";
    const handleNavigate = () =>{
        if(isroleTrue)
        {
            navigate('/adminheader')
        }
        else{
            navigate('/orders', {state: "orders"});
        }
    }

    useEffect(() => {
        const Invoice = async () => {
            try {
                let response = await GetInvoiceByBookingID(id)
                setInvoicedata(response.data.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        Invoice();
    }, [])

    
      const millisecondsPerHour = 3600000;
      const millisecondsPerDay = 86400000;
      const DifferenceInTime = (new Date(invoicedata.returnDate)-new Date(invoicedata.rentDate));
      const hoursInMS = Math.round(DifferenceInTime/millisecondsPerHour); 
      const diffDays = Math.floor(DifferenceInTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((DifferenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      console.log(hoursInMS);
      
    return (
        <div className="booking-summary-p-c">
            <div className="booking-summary-child-c">
                <div className="b-confirm">
                    <div className="tick">
                        <img src={tickicon} alt="" id="tickicon" />
                    </div>
                    <div className="b-text">
                        <span style={{ fontWeight: 'bold', color: '#414280' }}>Your booking is Confirmed</span>
                        <p style={{ color: 'gray' }}>Thank you for choosing our service.We look forward to serving you, and we hope you have a fantastic experience with our rental.
                            Safe travels!</p>
                    </div>
                </div>
                <div className="b-full-details">
                    <span style={{ fontWeight: 'bold' }}>Booking Details</span>
                    <div className="guest">
                        <div className="namediv">
                            <span className="reservation-gray-color">Name</span><br />
                            <span className="reservation-font-color">{invoicedata.name}</span>
                        </div>
                        <div className="namediv">
                            <span className="reservation-gray-color">Pick-Up</span><br />
                            <span className="reservation-font-color">{formattedDatepickUp ?  formatDate(invoicedata.rentDate) : ""}</span>
                        </div>
                        <div className="namediv">
                            <span className="reservation-gray-color">Drop-Off</span><br />
                            <span className="reservation-font-color">{formattedDatedropOf ?  formatDate(invoicedata.returnDate) : ""}</span>
                        </div>
                    </div>
                    <div className="guest-contact">
                        <div className="namediv">
                            <span className="reservation-gray-color">Booking Id</span><br />
                            <p className="reservation-font-color">{invoicedata.bookingId}</p>
                        </div>
                        <div className="emaildiv">
                            <span className="reservation-gray-color">Email</span><br />
                            <p className="reservation-font-color">{invoicedata.email}</p>
                        </div>
                        <div className="namediv">
                            <span className="reservation-gray-color">Phone</span><br />
                            <span className="reservation-font-color">{invoicedata.phoneNumber}</span>
                        </div>
                    </div>
                    <div className="qr">
                        <div>
                            <img src={a} alt="" width={220} height={120} />
                        </div>
                        <div className="hpy-j">
                            <div className="reservation-gray-color">Happy journey </div>
                            <div className="reservation-font-color">Thanks for booking</div>
                            <div className="reservation-font-color">Visit again.....!</div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="price-summary">
                <strong>Reservation Summary</strong>
                <div className="b-dates">
                    <div className="pickandDrop">
                        <div className="rentformatted">
                            <span className="reservation-gray-color">Pick-Up: </span>  <br />
                            <span className="reservation-font-color">{formattedDatepickUp ?  formatDate(invoicedata.rentDate) : ""}</span>
                        </div>
                        <div>
                            <span className="reservation-gray-color">Drop-Off: </span> <br />
                            <span className="reservation-font-color">{formattedDatedropOf ?  formatDate(invoicedata.returnDate) : ""}</span>
                        </div>
                    </div> <br />
                    <div>
                        <span>Total no.of {hoursInMS < 24 ? "hours:" : "days:"}</span>
                        <span className="reservation-font-color">{hoursInMS < 24 ? hoursInMS : `${diffDays}days,${diffHours}hours`}   &nbsp;<CalendarToday style={{ width: '1.5vw' }} /></span>
                    </div>
                    <div className="pickandDrop">
                        <div>
                            <span className="reservation-gray-color">Brand: </span>
                            <span className="reservation-font-color">{invoicedata.carBrand}</span>
                        </div>
                        <div>
                            <span className="reservation-gray-color">Name: </span>
                            <span className="reservation-font-color">{invoicedata.carName}</span>

                        </div>
                    </div>
                </div>
                <div className="booking-price">
                    <span style={{ fontWeight: 'bold' }}>Your price summary</span>
                    <div className="price-details"><span className="reservation-gray-color">Car price:</span><span><CurrencyRupeeIcon style={{ width: '1.3vw' }} />{Math.round(invoicedata.amount-99-(invoicedata.amount-99)*18/100)}</span></div>
                    <div className="price-details"><span className="reservation-gray-color">Extra(Maintainance):</span><span><CurrencyRupeeIcon style={{ width: '1.3vw' }} />99</span></div>
                    <div className="price-details"><span className="reservation-gray-color">GST(18%):</span><span><CurrencyRupeeIcon style={{ width: '1.3vw' }} />{Math.round((invoicedata.amount-99)*18/100)}</span></div>
                    <hr />
                    <div className="price-details"><span style={{ color: '#76ff03', fontWeight: 'bold' }}>Total Price:</span><span style={{ color: '#76ff03', fontWeight: 'bold' }}><CurrencyRupeeIcon style={{ width: '1.6vw', color: '#76ff03' }}/>{invoicedata.amount}</span></div>
                    <div className="download-p"> 
                        {hideButtons ? "" : <>
                    <button className="download-invoice" id="printpagebutton" onClick={handleNavigate}>Go to {isroleTrue ? "Dashboard" : "MyOrders" }</button> 
                   {/* <button className="download-invoice" id="printpagebutton2" onClick={myfunction}>Download Invoice</button>*/}
                   <button class="button">
                    <span class="button-content" id="printpagebutton2" onClick={myfunction}>Download </span>
                    </button>
                    </> 
                   }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingSummary;