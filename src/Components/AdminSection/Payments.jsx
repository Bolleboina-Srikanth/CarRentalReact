import React, { useEffect, useState } from 'react';
import { GetAllPayemtsApi } from '../Services/CarServices';
import '../AdminSection/payments.css';
import searchicon from '../Images/searchicont.svg';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Payments = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentData, setPaymentData] = useState([]);
    useEffect(() => {
        const fetchPayment = async () => {
            let response = await GetAllPayemtsApi();
            setPaymentData(response.data.data);
        }
        fetchPayment();
    }, [])
    var TotalAmount = 0;
    useEffect(() => {
        paymentData.forEach(element => {
            TotalAmount += element.amount
            localStorage.setItem("totalRevenue", TotalAmount);
        });
    })

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentpage(1);
    }

    const filteredData = paymentData.filter((data) =>
        Object.values(data).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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
        <div className='table-parent'>
            <br />
            <div className='table-card'>
                <div className='table-search'>
                    <div>
                        <label >Show entries: </label> &nbsp;
                        <select className='selectoptions' value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <input type="text" id='searchinput' value={searchTerm} onChange={handleSearch} placeholder='Search...' />
                </div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>PaymentId</th>
                            <th>BookingId</th>
                            <th>CarId</th>
                            <th>UserId</th>
                            <th>Payment Date</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    {currentRows == "" ?<tr>
                <td colSpan={9}>
                 <span className="norecords-css">No Records Found </span> 
                </td>
              </tr>: ""}
                    {currentRows.map((data) => (
                        <tr>
                            <td>{data.paymentId}</td>
                            <td>{data.bookingId}</td>
                            <td>{data.carId}</td>
                            <td>{data.userId}</td>
                            <td>{formatDate(data.paymmentDate)}</td>
                            <td>{data.paymentType}</td>
                            <td>{data.amount}</td>
                        </tr>
                    ))}
                </table>
                <div className='pagination'>
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

export default Payments;


