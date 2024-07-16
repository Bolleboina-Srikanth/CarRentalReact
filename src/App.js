import logo from './logo.svg';
import './App.css';

import Router from './Components/Router/Routing';
import CarDetails from './Components/UserSection/CarDetails';
import BookingSummary from './Components/UserSection/BookingSummary';
import PreviewPage from './Components/UserSection/Previewpage';
import UserNavbar from './Components/UserSection/Navbar/userNavbar';
import Payments from './Components/UserSection/Payments/Payments';
import DateValidationDisablePast from './date';
import RazorPayTest from './Components/UserSection/Payments/RazorpayTest';



function App() {
  return (
    <div className="App">
        {/* <RazorPayTest/> */}
        <Router/>
       
    </div>
  );
}


export default App;
