import React, { useEffect, useState } from "react";
import '../MyOrders/MyOrders.css';
import { GetAllOrdersbyuserId } from "../../Services/CarServices";
import seat from '../../Images/carseat.svg';
import fuel from '../../Images/fuel.svg';
import transmission from '../../Images/transmission.svg';
import ColorLens from "@mui/icons-material/ColorLens";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([])
    const result = localStorage.getItem("signInResponse");
    const formattedresult = JSON.parse(result);

    useEffect(() => {
        const fetchOrdersbyId = async () => {
            try {
                let response = await GetAllOrdersbyuserId(formattedresult.userId);
                setOrders(response.data.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchOrdersbyId()
    }, [])
    const getBookingDetails = (Id) => {
        navigate("/bookingsummary", { state: { Id } })
    }

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
    
    return (
        <div className="myorders-p">
            {orders.length === 0?
                <div className="no-orders">
                    NO ORDERS
                </div>
            :
            <>
            {orders.map((allorders) => (
                <div className="or-Container2">
                    <div className="or-photo">
                        <img id="orphoto1" src={allorders.carPhoto} alt="" style={{ width: '18vw', padding: '5px', }} />
                    </div>
                    <div className="or-details">
                        <div className="or-details-Name">
                            <div className="or-details-">
                                <span >{allorders.carBrand}</span><br />
                                <strong >{allorders.carName}</strong>
                                <div className="reviews">
                                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly /><span className="noofreviews">&nbsp;30 Reviews</span>
                                </div>
                            </div>
                            <div className="or-btn">
                                <button id="summ-btn" onClick={() => getBookingDetails(allorders.bookingId)}>OrderSummary</button>
                            </div>
                        </div>


                        <div className="or-details-full">
                            <div className="or-seating">
                                <span className="font-color-car">Seating</span>
                                <span>{allorders.seating} &nbsp; <img src={seat} alt="" /></span>
                            </div>
                            <div className="or-seating">
                                <span className="font-color-car">Colour</span>
                                <span> {allorders.carColor} &nbsp;<ColorLens style={{ color: 'green' }} /> </span>
                            </div>
                            <div className="or-seating">
                                <span className="font-color-car">Type</span>
                                <span>{allorders.fuel}&nbsp;<img src={fuel} alt="" /> </span>
                            </div>
                            <div className="or-seating">
                                <span className="font-color-car">Transmission</span>
                                <span>{allorders.transmission}&nbsp;<img src={transmission} alt="" />  </span>
                            </div>
                            <div className="or-seating">
                                <span className="font-color-car">PickUpDate</span>
                                <span>&nbsp; {formatDate(allorders.rentDate)}</span>
                            </div>
                            <div className="or-seating">
                                <span className="font-color-car">DropoffDate</span>
                                <span>&nbsp; {formatDate(allorders.returnDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </>
        }

        </div>
    );
}
export default MyOrders;