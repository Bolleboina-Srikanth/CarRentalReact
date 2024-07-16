import React, { useContext, useEffect, useState } from "react";
import "../AdminSection/CarsList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../AdminSection/BookingDetails.css";
import { GetAllBookings, PaymentApi } from "../Services/CarServices";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [booking, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const myfunction = async () => {
      try {
        let response = await GetAllBookings();
        setBookings(response.data.data);
        localStorage.setItem("totalBookings", booking.length);
      } catch (error) {
        console.log(error);
      }
    };
    myfunction();
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentpage(1);
  };
  const filteredData = booking.filter((data) =>
    Object.values(data).some(
      (value) =>
        value
          ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          : false
      //     data.bookingId ? data.bookingId.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.carId ?  data.carId.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.customerId ? data.customerId.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.name ? data.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.email ? data.email.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.rentDate ? data.rentDate.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.returnDate ? data.returnDate.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      //    data.phoneNumber ? data.phoneNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setCurrentpage(value);
  };

  const handleInvoice = (Id) => {
    navigate(`/bookingsummary`, { state: { Id } });
  };

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
    <div className="table-parent">
      <br />
      <div className="table-card-b">
        <div className="table-search">
          <div>
            <label>Show entries: </label> &nbsp;
            <select
              className="selectoptions"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <input
            type="text"
            id="searchinput"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>BookingId</th>
              <th>CarId</th>
              <th>CustomerId</th>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Rent Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {currentRows == "" ? (
            <tr>
              <td colSpan={9}>
                <span className="norecords-css">No Records Found </span>
              </td>
            </tr>
          ) : (
            ""
          )}
          {currentRows.map((data) => (
            <tr>
              <td>{data.bookingId}</td>
              <td>{data.carId}</td>
              <td>{data.customerId}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phoneNumber}</td>
              <td>{formatDate(data.rentDate)}</td>
              <td>{formatDate(data.returnDate)}</td>
              <td>
                <div className="actions">
                  <button
                    className="d-invoice"
                    onClick={() => handleInvoice(data.bookingId)}
                  >
                    Download Invoice
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
