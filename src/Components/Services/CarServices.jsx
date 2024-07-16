import axios from 'axios';



export const AddCar = async (obj) => {
    let response = await axios.post("https://localhost:44324/AddCar",
        obj,
    );
    return response;
}

export const GetAllCars = async () => {
    let response = await axios.get("https://localhost:44324/GetAllCars");
    return response;
}
export const AllCars = async () => {
    let response = await axios.get("https://localhost:44324/GetAllCars");
    return response;
}

export const UpdateCarApi = async (obj) => {
    let response = await axios.put("https://localhost:44324/UpdateCar",
        obj
    );
    return response;
}

export const DeleteCarApi = async (Id) => {
    let response = await axios.delete(`https://localhost:44324/DeleteCar?carId=${Id}`);
    return response;
}

export const CarsByPlaceApi = async (place) => {
    let response = await axios.get(`https://localhost:44324/CarByPlace?place=${place}`);
    return response;
}

export const BookingApi = async (obj) => {
    let response = await axios.put(
        `https://localhost:44324/Bookings?carId=${obj.carId}&carBrand=${obj.carBrand}&carName=${obj.carName}&customerId=${obj.customerId}&name=${obj.name}&email=${obj.email}&phoneNumber=${obj.phoneNumber}&rentDate=${obj.rentDate}&returnDate=${obj.returnDate}`
        // "https://localhost:44324/api/Car/Bookings",obj
    );
    return response;
}

export const GetAllBookings = async () => {
    let response = await axios.get("https://localhost:44324/GetAllBookings");
    return response;
}

export const PaymentApi = async (obj) => {
    let response = await axios.post(
        `https://localhost:44324/Payments?BookingId=${obj.BookingId}&CarId=${obj.CarId}&UserId=${obj.UserId}&paymentType=${obj.paymentType}&paymmentDate=${obj.paymmentDate}&Amount=${obj.Amount}`
    );
    return response;
}


export const GetAllPayemtsApi = async () => {
    let response = await axios.get("https://localhost:44324/GetAllPayments");
    return response;
}

export const ReportApi = async (id) => {
    let response = await axios.post(
        `https://localhost:44324/CarReport?carId=${id}`
    )
    return response
}

export const GetAllReportsApi = async () => {
    let response = await axios.get("https://localhost:44324/GetAllReports");
    return response;
}

export const GetInvoiceByBookingID = async (id) => {
    let response = await axios.get(`https://localhost:44324/GetBookingID?booking=${id}`)
    return response;
}

export const AddOrderApi = async (obj) => {
    // const token = localStorage.getItem("token");
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     }
    // }
    let response = await axios.post(
        `https://localhost:44324/AddOrder?BookingId=${obj.BookingId}&UserID=${obj.UserID}&Name=${obj.Name}&PhoneNumber=${obj.PhoneNumber}&Email=${obj.Email}
        &CarPhoto=${obj.CarPhoto}&CarBrand=${obj.CarBrand}&CarName=${obj.CarName}&Transmission=${obj.Transmission}&Fuel=${obj.Fuel}&CarColor=${obj.CarColor}
        &Seating=${obj.Seating}&BookingTime=${obj.BookingTime}&Amount=${obj.Amount}&RentDate=${obj.RentDate}&ReturnDate=${obj.ReturnDate}`
        );
    return response;
}

export const GetAllOrdersbyuserId = async (id) =>{
    let response = await axios.get(`https://localhost:44324/GetAllOrders?userid=${id}`)
    return response;
}


export const CreateOrderId = async (amount) =>{
    let response = await axios.post(`https://localhost:44324/CreateOrderId?amount=${amount}`)
    return response;
}

export const GeneratingReport = async (obj) =>{
    let response = await axios.post(`https://localhost:44324/NewReport?startDate=${obj.startDate}&endDate=${obj.endDate}`)
    return response;
}

