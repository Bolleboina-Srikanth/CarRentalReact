import React, { useEffect, useState } from "react";
import "../AdminSection/dashBoard.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { GeneratingReport, GetAllBookings, GetAllReportsApi } from "../Services/CarServices";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchDatesModel from "./SearchDateModal";
import CountUp from "react-countup";

function AdminDashboard() {
  const [currentPage, setCurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
  const fdate = firstDayOfMonth.toISOString().substring(0, 10);
  const [filterDates, setFilterDates] = useState({
    // startDate: new Date().toISOString().slice(0, 15),
    // endDate: new Date().toISOString().slice(0, 15)
    startDate: firstDayOfMonth,
    endDate: new Date().toISOString().slice(0, 15)
  });

  const revenue = Math.round(localStorage.getItem("totalRevenue"));

  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const myfunction = async () => {
      try {
        // let response = await GetAllReportsApi();
        let response= await GeneratingReport(filterDates);
        // let response = await GetAllBookings();
        setReportData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    myfunction();
  }, [][filterDates]);
  const filteredDateByMonth = (data, filterDates) => {
    return data.filter((report) => {
      return (
        filterDates.startDate >= report.fromDate &&
        filterDates.startDate.substring(0, 10) <=
          report.endDate.substring(0, 10) 
      );
    });
  };
  const filteredData = filteredDateByMonth(reportData, filterDates);//1 2 1 4 2 2
  filteredData.sort((a,b) => //1 2
  b.noOfBookings - a.noOfBookings
);

const filtereddata =  reportData.sort((a, b)=>
  b.noOfbookings - a.noOfbookings
)



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentpage(1);
  };

  const filteredreturnData = filtereddata.filter((data) =>
    Object.values(data).some((value) =>
      value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredreturnData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setCurrentpage(value);
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
    <>
      <div className="dashboard-p-c">
        <h4 id="dashboard-text-align">DashBoard</h4>
        <div class="report-icons">
          <div class="rupee">
            <div className="rupee-icon" style={{ backgroundColor: "#ff9100" }}>
              <PeopleAltIcon style={{ fontSize: "45" }} />{" "}
            </div>
            <div className="report-data">
              <span>Total Customers</span>
              <strong>
                {" "}
                <PeopleAltIcon style={{ width: "1.5vw" }} />{" "}
                <CountUp end={localStorage.getItem("totalCustomers")} duration={5}/>
                 {/* {localStorage.getItem("totalCustomers")} */}
              </strong>
            </div>
          </div>

          <div class="rupee">
            <div className="rupee-icon" style={{ backgroundColor: "#35baf6" }}>
              {" "}
              <CurrencyRupeeIcon style={{ fontSize: "45" }} />
            </div>
            <div className="report-data">
              <span>Total Revenue</span>
              <strong> &#8377;
                 {/* {revenue} */}
                 <CountUp end={revenue} duration={5}/>
                 </strong>
            </div>
          </div>

          <div class="total-bookings">
            <div className="bag-icon" style={{ backgroundColor: "#d500f9" }}>
              <ShoppingBagIcon style={{ fontSize: "45" }} />
            </div>
            <div className="report-data">
              <span sx={{ color: "text.secondary" }}>Total Bookings</span>
              <strong>
                {" "}
                <ShoppingBagIcon style={{ fontSize: "14" }} />{" "}
                <CountUp end={localStorage.getItem("totalBookings")} duration={5}/>
              </strong>
            </div>
          </div>
          <div class="total-cars">
            <div className="car-icon" style={{ backgroundColor: "#ffea00" }}>
              <CarIcon style={{ fontSize: "45" }} />
            </div>
            <div className="report-data">
              <span>Total Cars</span>
              <strong>
                {" "}
                <CarIcon style={{ fontSize: "14" }} />{" "}
                <CountUp end={localStorage.getItem("totalCars")} duration={5}/>
              </strong>
            </div>
          </div>
        </div>{" "}
        <br />
        <div className="report-table-container">
          <div className="table-card-r">
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
              <div>
                <SearchDatesModel setFilterDates={setFilterDates} />
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
                  <th>CarId</th>
                  <th>Brand</th>
                  <th>Car Name</th>
                  <th>From Date</th>
                  {/* <th> Last Booked</th> */}
                  <th>End Date</th>
                  <th>No of booking</th>
                </tr>
              </thead>
               
              {currentRows == "" ?<tr>
                <td colSpan={9}>
                 <span className="norecords-css">No Records Found </span> 
                </td>
              </tr>: ""}
              {currentRows.map((data) => (
                <tr>
                  <td>{data.carid}</td>
                  <td>{data.carbrand}</td>
                  <td>{data.carname}({data.carcolor},{data.transmission})</td>
                  <td>{formatDate(data.fromDate)}</td>
                  <td>{formatDate(data.endDate)}</td>
                  {/* <td>{data.endDate.substring(0, 10)}</td> */}
                  <td>{data.noOfbookings}</td>
                </tr>
              ))}
            </table>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filtereddata.length / rowsPerPage)}
                  page={currentPage}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;


