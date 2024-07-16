import React, { useContext, useEffect } from "react";
import "../AdminSection/CarsList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import deleteX from "../Images/deleteX.svg";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from 'axios';
import {
  AddCar,
  DeleteCarApi,
  GetAllCars,
  UpdateCarApi,
} from "../Services/CarServices";
import { UserContext } from "../UserSection/Context/UserContext";
import { Skeleton } from "@mui/material";

const CarsList = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [editChanges, setEditChanges] = useState(false);
  const[selectedRow, setSelectedRow] = useState(null);
  const[loading, setLoading]= useState(true);

  const [cardata, setCardata] = useState({
    carId: 0,
    carBrand: "",
    carName: "",
    carNumber: "",
    transmission: "",
    fuel: "",
    carColor: "",
    seating: "",
    carStatus: "",
    priceperHour: "",
    priceperDay: "",
    place: "",
    district: "",
    state: "",
    carPhoto: null,
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const states = ["Telangana", "AndhraPradesh"];
  const citiesBystate = {
    Telangana: ["Warangal", "Hyderabad"],
    AndhraPradesh: ["Tirupati", "Vizag"],
  };
  const PlaceByDistrict = {
    Warangal: ["HanamKonda", "Kazipet"],
    Hyderabad: ["HitechCity", "Uppal"],
    Tirupati: ["Srikalahasti", "Venkatagiri"],
    Vizag: ["Tadepalli", "BenzCircle"],
  };
  const cities = citiesBystate[cardata.state] || [];
  const places = PlaceByDistrict[cardata.district] || [];

  const handleChange = (e) => {
    setSelectedState(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      state: e.target.value,
      district: "",
      place: ""
    }));
  };

  const handleCity = (e) => {
    setSelectedCity(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      district: e.target.value,
    place: ""

    }));
  };
  const [place, setPlace] = useState(cardata.place);
  const handleplace = (e) => {
    setPlace(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      place: e.target.value,
    }));
  };
  const [transmission, setTransmission] = React.useState("");
  const handletransmission = (event) => {
    setTransmission(event.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      transmission: event.target.value,
    }));
  };

  const [cartype, setCartupe] = useState("");
  const handlecartype = (e) => {
    setCartupe(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      fuel: e.target.value,
    }));
  };

  const [carseating, setSeating] = useState("");
  const handlecarseating = (e) => {
    setSeating(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      seating: e.target.value,
    }));
  };

  const [carstatus, setcarstatus] = useState("");
  const handleStatus = (e) => {
    setcarstatus(e.target.value);
    setCardata((prevdata) => ({
      ...prevdata,
      carStatus: e.target.value,
    }));
  };

  let name, value;
  const handleInput = (e) => {
    if (e.target.name == "carBrand" || e.target.name == "carName") {
      name = e.target.name;
      value = e.target.value.replace(/[0-9@!^|&\/\\#,+()$~%.'":*?<>{}]/g, "");
      setCardata({ ...cardata, [name]: value });
    }
    if (e.target.name == "carName") {
      name = e.target.name;
      value = e.target.value.replace(/[@!^|&\/\\#,+()$~%.'":*?<>{}]/g, "");
      setCardata({ ...cardata, [name]: value });
    }

    if (e.target.name == "carColor") {
      name = e.target.name;
      value = e.target.value.replace(/[0-9]/g, "");
      setCardata({ ...cardata, [name]: value });
    }

    if (e.target.name == "priceperHour" || e.target.name == "priceperDay") {
      name = e.target.name;
      const HourP = e.target.value.replace(/[A-Za-z]/g, "");
      value = parseFloat(HourP);
      setCardata({ ...cardata, [name]: value });
    }
    if (e.target.name == "carNumber") {
      name = e.target.name;
      value = e.target.value;
      setCardata({ ...cardata, [name]: value });
    }
  };

  const handleUpload = (e) => {
    setCardata((prevdata) => ({
      ...prevdata,
      carPhoto: e.target.files[0],
    }));
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "carBrand":
        setError(() => ({
          ...error,
          brandError: false,
          brandHelperText: "",
        }));
        break;
      case "carName":
        setError(() => ({
          ...error,
          carNameError: false,
          carNameHelperText: "",
        }));
        break;

      case "carColor":
        setError(() => ({
          ...error,
          carColorError: false,
          carColorHelperText: "",
        }));
        break;

      case "carNumber":
        setError(() => ({
          ...error,
          carNumberError: false,
          carNumberHelperText: "",
        }));
        break;
        case "transmission":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
          transmissionError: false,
          transmissionHelperText: "",
        }))};
        break;
        case "fuel":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
          cartypeError: false,
          cartypeHelperText: "",
        }))};
        break;
        case "seating":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
           carseatingError: false,
          carseatingHelperText: "",
        }))};
        break;
        case "carStatus":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
           carStatusError: false,
           carseatingHelperText : "",
        }))};
        break;
        case "state":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
           stateError: false,
           stateHelperText : "",
        }))};
        break;
        case "district":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
           cityError: false,
           cityHelperText : "",
        }))};
        break;
        case "place":
          if(e.target.value !== "")
          {
        setError((prevdata) => ({
          ...prevdata,
           placeError: false,
           placeHelperText : "",
        }))};
        break;

        case "carphoto":
          if(e.target.value !== null)
          {
            console.log("kjhukggy");
        setError((prevdata) => ({
          ...prevdata,
           carPhotoError: false,
           carPhotoHelperText : "",
        }))};
        break;

    }
  };

  const [error, setError] = useState({
    stateError: false,
    stateHelperText: "",
  });
  //---------------------------------------------------
    const isBrandEmpty = cardata.carBrand == "";
    const isNameEmpty = cardata.carName == "";
    const iscarNumberEmpty = cardata.carNumber == "";
    const isTrasmissionEmpty = cardata.transmission == "";
    const iscarColorEmpty = cardata.carColor == "";
    const iscarTypeEmpty = cardata.fuel == "";
    const iscarseatingEmpty = cardata.seating == "";
    const ispriceHourEmpty = cardata.priceperHour == "";
    const ispriceDayEmpty = cardata.priceperDay == "";
    const iscarStatusEmpty = cardata.carStatus == "";
    const isCarPhotoEmpty = cardata.carPhoto == null;
    const isStateEmpty = selectedState == "";
    const isCityEmpty = selectedCity == "";
    const isPlaceEmpty = place == "";

  const handleCar = () => {

    setError((prevdata) => ({
      ...prevdata,
      brandError: isBrandEmpty,
      brandHelperText: !isBrandEmpty ? "" : "Car brand field required",

      carNameError: isNameEmpty,
      carNameHelperText: !isNameEmpty ? "" : "Car name field required",

      carNumberError: iscarNumberEmpty,
      carNumberHelperText: !iscarNumberEmpty ? "" : "Car number field required",

      transmissionError: isTrasmissionEmpty,
      transmissionHelperText: !isTrasmissionEmpty
        ? ""
        : "please select transmission type",

      cartypeError: iscarTypeEmpty,
      cartypeHelperText: iscarTypeEmpty && "please select fuel type",

      carseatingError: iscarseatingEmpty,
      carseatingHelperText: !iscarseatingEmpty
        ? ""
        : "please select car seating",

      carPriceError: ispriceHourEmpty,
      carPriceHelperText: !ispriceHourEmpty ? "" : "Car price field required",

      carStatusError: iscarStatusEmpty,
      carStatusHelperText: !iscarStatusEmpty ? "" : "please select car status",

      carColorError: iscarColorEmpty,
      carColorHelperText: !iscarColorEmpty ? "" : "Car color field required",

      carPriceError: ispriceDayEmpty,
      carPriceDayHelperText: !ispriceDayEmpty ? "" : "Car color field required",

      carPriceDayError: ispriceDayEmpty,
      carPriceDayHelperText: !ispriceDayEmpty ? "" : "Car price field required",

      stateError: isStateEmpty,
      stateHelperText: !isStateEmpty ? " " : "please select state",

      cityError: isCityEmpty,
      cityHelperText: !isCityEmpty ? " " : "please select district",

      placeError: isPlaceEmpty,
      placeHelperText: !isPlaceEmpty ? " " : "please select place",
       carPhotoError: isCarPhotoEmpty,
       carPhotoHelperText : !isCarPhotoEmpty ? "" : "please upload car photo"
    }));

    const formData = new FormData();
    for (let key in cardata) {
      formData.append(key, cardata[key]);
    }
    if (
      isBrandEmpty != true &&
      isNameEmpty !== true &&
      isTrasmissionEmpty !== true &&
      iscarNumberEmpty !== true &&
      iscarColorEmpty !== true &&
      iscarStatusEmpty !== true &&
      iscarTypeEmpty !== true &&
      iscarseatingEmpty !== true &&
      isCarPhotoEmpty !== true &&
      ispriceHourEmpty !== true &&
      ispriceDayEmpty !== true &&
      isStateEmpty != true &&
      isPlaceEmpty != true &&
      isCityEmpty != true
    ) {
      const AddingCars = async () => {
        try {
          let response = await AddCar(formData);
          alert(response.data.message);
        } catch (error) {
          console.log(error);
        }
      };
      AddingCars();
    }
  };


  const handleCarEdit = async () => {
    setError((prevdata) => ({
      ...prevdata,
      brandError: isBrandEmpty,
      brandHelperText: !isBrandEmpty ? "" : "Car brand field required",

      carNameError: isNameEmpty,
      carNameHelperText: !isNameEmpty ? "" : "Car name field required",

      carNumberError: iscarNumberEmpty,
      carNumberHelperText: !iscarNumberEmpty ? "" : "Car number field required",

      transmissionError: isTrasmissionEmpty,
      transmissionHelperText: !isTrasmissionEmpty
        ? ""
        : "please select transmission type",

      cartypeError: iscarTypeEmpty,
      cartypeHelperText: iscarTypeEmpty && "please select fuel type",

      carseatingError: iscarseatingEmpty,
      carseatingHelperText: !iscarseatingEmpty
        ? ""
        : "please select car seating",

      carPriceError: ispriceHourEmpty,
      carPriceHelperText: !ispriceHourEmpty ? "" : "Car price field required",

      carStatusError: iscarStatusEmpty,
      carStatusHelperText: !iscarStatusEmpty ? "" : "please select car status",

      carColorError: iscarColorEmpty,
      carColorHelperText: !iscarColorEmpty ? "" : "Car color field required",

      carPriceError: ispriceDayEmpty,
      carPriceDayHelperText: !ispriceDayEmpty ? "" : "Car color field required",

      carPriceDayError: ispriceDayEmpty,
      carPriceDayHelperText: !ispriceDayEmpty ? "" : "Car price field required",

      stateError: isStateEmpty,
      stateHelperText: !isStateEmpty ? " " : "please select state",

      cityError: isCityEmpty,
      cityHelperText: !isCityEmpty ? " " : "please select district",

      placeError: isPlaceEmpty,
      placeHelperText: !isPlaceEmpty ? " " : "please select place",
       carPhotoError: isCarPhotoEmpty,
       carPhotoHelperText : !isCarPhotoEmpty ? "" : "please upload car photo"
    }));
    const formData = new FormData();
    for (let key in cardata) {
      formData.append(key, cardata[key]);
    }

    try {
      if (
        isBrandEmpty != true &&
        isNameEmpty !== true &&
        isTrasmissionEmpty !== true &&
        iscarNumberEmpty !== true &&
        iscarColorEmpty !== true &&
        iscarStatusEmpty !== true &&
        iscarTypeEmpty !== true &&
        iscarseatingEmpty !== true &&
        // isCarPhotoEmpty !== true &&
        ispriceHourEmpty !== true &&
        ispriceDayEmpty !== true &&
        isStateEmpty != true &&
        isPlaceEmpty != true &&
        isCityEmpty != true
      ) {
      let response = await UpdateCarApi(formData);
      alert(response.data.message);
      setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------------------------------------

  const modalClose = () => {
    setShow(false);
    setError((prevdata) => ({
      ...prevdata,
      brandError: false,
      brandHelperText: "",

      carNameError: false,
      carNameHelperText: "",

      carNumberError: false,
      carNumberHelperText: "",

      transmissionError: false,
      transmissionHelperText: "",

      cartypeError: false,
      cartypeHelperText: "",

      carseatingError: false,
      carseatingHelperText: "",

      carPriceError: false,
      carPriceHelperText: "",

      carStatusError: false,
      carStatusHelperText: "",

      carColorError: false,
      carColorHelperText: "",

      carPriceError: false,
      carPriceDayHelperText: "",

      carPriceDayError: false,
      carPriceDayHelperText: "",

      stateError: false,
      stateHelperText: "",

      cityError: false,
      cityHelperText: "",

      placeError: false,
      placeHelperText: "",

       carPhotoError: "",
       carPhotoHelperText : ""
    }));
  }


  const modalShow = () => {
    setEditChanges(false);
    setShow(true);
    setCardata(() => ({
      carId: 0,
      carBrand: "",
      carName: "",
      carNumber: "",
      transmission: "",
      fuel: "",
      carColor: "",
      seating: "",
      carStatus: "",
      priceperHour: "",
      priceperDay: "",
      carPhoto: null,
      place: "",
      district: "",
      state: "",

    }));
  };

  const handleEditModel = (cars) => {
    setSelectedRow(cars.carID)
    setCardata(cars);
    setSelectedState(cars.state);
    setSelectedCity(cars.district);
    setPlace(cars.place);
    setShow(true);
    setEditChanges(true);
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(cardata.carPhoto);
        const blob = await response.blob();
        setCardata((prevdata) => ({
          ...prevdata,
          carPhoto: new File([blob], "car.jpg"),
        }));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
    fetchImage();
  }, []);


 

  //-----------------------------------------------------------
  const [deleteCarModal, setDeleteCarModal] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState(null);
  //----------------------------------------------------------
  const handleDeleteCar = (cars) => {
    setSelectedRow(cars.carID)
    setDeleteCarModal(true);
    setDeleteCarId(cars.carID);
  };

  const DeleteCar = async () => {
    try {
      let response = await DeleteCarApi(deleteCarId);
      console.log(response);
      alert(response.data.message);
      setDeleteCarModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  //----------------------------------------------------
  const [viewCars, setViewCars] = useState(false);
  const [viewCar, setViewCar] = useState([]);
  const handleviewCar = (cars) => {
    setSelectedRow(cars.carID)
    setViewCars(true);
    setViewCar(cars);
  };
  //---------------------------------------------------------
  const [getCars, setGetCars] = useState([]);
  useEffect(() => {
    const myCars = async () => {
      try {
        let response = await GetAllCars();
        setGetCars(response.data.data);
        setLoading(false)
        localStorage.setItem("totalCars", getCars.length);
      } catch (error) {
        console.log(error);
      }
    };
    myCars();
  }, [getCars]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentpage(1);
  };

  const filteredData = getCars.filter((data) =>
    Object.values(data).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setCurrentpage(value);
  };

  return (
    <div className="carsList-p-c">
      <div className="App p-2 launch-modal">
        <Button variant="primary" onClick={modalShow}>
          Add Cars
        </Button>
        <Modal show={show} onHide={modalClose}>
          <Modal.Header closeButton>
            {editChanges ? (
              <Modal.Title style={{ color: "black" }}>Update Car</Modal.Title>
            ) : (
              <Modal.Title style={{ color: "black" }}>Add Car</Modal.Title>
            )}
          </Modal.Header>

          <Modal.Body>
            <div className="car-form-c">
              <div className="car-form-input">
                <TextField
                  id="name-input"
                  variant="outlined"
                  placeholder="Car Brand"
                  size="small"
                  sx={{ width: "49%" }}
                  inputProps={{
                    sx: {maxLength:20, height: "3vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="carBrand"
                  value={cardata.carBrand}
                  error={error.brandError}
                  helperText={error.brandHelperText}
                  onBlur={handleBlur}
                />
                <TextField
                  id="name-input"
                  placeholder="Car Name"
                  size="small"
                  sx={{ width: "49%", height: "px"}}
                  inputProps={{
                    sx: {maxLength:20, height: "3vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="carName"
                  value={cardata.carName}
                  error={error.carNameError}
                  helperText={error.carNameHelperText}
                  onBlur={handleBlur}
                />
              </div>
              <div className="car-form-input">
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="transmission"
                    value={cardata.transmission}
                    onChange={handletransmission}
                    error={error.transmissionError}
                    helperText={error.transmissionHelperText}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-Transmission-</em>
                    </MenuItem>
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Automatic">Automatic</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.transmissionHelperText}
                  </FormHelperText>
                </FormControl>

                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6.3vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    placeholder="jgkuuy"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="fuel"
                    value={cardata.fuel}
                    onChange={handlecartype}
                    error={error.cartypeError}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-Fuel-</em>
                    </MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="Ev">Ev</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.cartypeHelperText}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="car-form-input">
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6.5vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    placeholder="jgkuuy"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="seating"
                    value={cardata.seating}
                    onChange={handlecarseating}
                    error={error.carseatingError}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-Seating-</em>
                    </MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.carseatingHelperText}
                  </FormHelperText>
                </FormControl>
                <TextField
                  id="name-input"
                  placeholder="Car color"
                  size="small"
                  sx={{ width: "49%" }}
                  inputProps={{
                    sx: {maxLength:10, height: "3.4vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="carColor"
                  value={cardata.carColor}
                  error={error.carColorError}
                  helperText={error.carColorHelperText}
                  onBlur={handleBlur}
                />
              </div>
              <div className="car-form-input">
                <TextField
                  id="size-small"
                  placeholder="Price/per hour"
                  size="small"
                  sx={{ width: "49%" }}
                  InputProps={{
                    sx: { height: "6vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="priceperHour"
                  value={cardata.priceperHour}
                  error={error.carPriceError}
                  helperText={error.carPriceHelperText}
                  onBlur={handleBlur}
                />
                <TextField
                  id="size-small"
                  variant="outlined"
                  placeholder="Price/per day"
                  size="small"
                  sx={{ width: "49%" }}
                  InputProps={{
                    sx: { height: "6vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="priceperDay"
                  value={cardata.priceperDay}
                  error={error.carPriceDayError}
                  helperText={error.carPriceDayHelperText}
                  onBlur={handleBlur}
                />
              </div>
              <div className="car-form-input">
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="carStatus"
                    value={cardata.carStatus}
                    onChange={handleStatus}
                    error={error.carStatusError}
                    helperText={error.carStatusHelperText}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-Status-</em>
                    </MenuItem>
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="NotAvailable">Not Available</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.carStatusHelperText}
                  </FormHelperText>
                </FormControl>

                <TextField
                  id="size-small"
                  placeholder="Car number"
                  size="small"
                  sx={{maxLength:4, width: "49%", height: "px" }}
                  inputProps={{ 
                    sx: { height: "3vh", background: "rgb(232, 241, 250)" },
                  }}
                  onChange={handleInput}
                  name="carNumber"
                  value={cardata.carNumber}
                  error={error.carNumberError}
                  helperText={error.carNumberHelperText}
                  onBlur={handleBlur}
                />
              </div>
              <div className="car-form-input">
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6.5vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="state"
                    value={cardata.state}
                    onChange={handleChange}
                    error={error.stateError}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-State-</em>
                    </MenuItem>
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.stateHelperText}
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6.5vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="district"
                    value={cardata.district}
                    onChange={handleCity}
                    error={error.cityError}
                    helperText={error.cityHelperText}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-district-</em>
                    </MenuItem>
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.cityHelperText}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="car-form-input">
                <FormControl sx={{ width: "49%" }}>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{
                      height: "6.5vh",
                      textAlign: "left",
                      background: "rgb(232, 241, 250)",
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    name="place"
                    value={cardata.place}
                    error={error.placeError}
                    helperText={error.placeHelperText}
                    onChange={handleplace}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em style={{ color: "gray" }}>-place-</em>
                    </MenuItem>
                    {places.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {error.placeHelperText}
                  </FormHelperText>
                </FormControl>
                <div className="upload-img">
                  <FormControl>
                  <input type="file" id="upload-file"  onChange={handleUpload}  onBlur={handleBlur}/>
                  <FormHelperText style={{ color: "red" }}>
                    {error.carPhotoHelperText}
                  </FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="#ffeb3b"
              style={{ backgroundColor: "#ffeb3b" }}
              onClick={modalClose}
            >
              Close
            </Button>
            {editChanges ? (
              <Button variant="primary" onClick={handleCarEdit}>
                Save changes
              </Button>
            ) : (
              <Button variant="primary" onClick={handleCar}>
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal centered show={deleteCarModal} onHide={modalClose}>
          <Modal.Body>
            <div className="delete-modal">
              <img src={deleteX} alt="" width={"13%"} />
              <div style={{ fontSize: "2vw" }}>
                Are you sure you want to delete?
              </div>
              <br />
              <div className="d-btn">
                <button
                  className="c-btn"
                  onClick={() => setDeleteCarModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="c-btn"
                  style={{ backgroundColor: "red" }}
                  onClick={DeleteCar}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal centered show={viewCars}>
          <Modal.Body closeButton className="v">
            <div className="viewcar">
              <table
                style={{ width: "80%", marginLeft: "6vw", border: '0' }}
                className="view"
              >
                <tr className="view-table">
                  <td style={{ fontWeight: "bold", width: "50%" }}>carID:</td>
                  <td>{viewCar.carID}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Brand:</td>
                  <td>{viewCar.carBrand}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>CarName:</td>
                  <td>{viewCar.carName}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>CarNumber:</td>
                  <td>{viewCar.carNumber}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Transmission:</td>
                  <td>{viewCar.transmission}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Fuel:</td>
                  <td>{viewCar.fuel}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Status:</td>
                  <td>{viewCar.carStatus}</td>
                </tr>

                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Seating:</td>
                  <td>{viewCar.seating}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Color:</td>
                  <td>{viewCar.carColor}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>PriceperHour:</td>
                  <td>{viewCar.priceperHour}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>PriceperDay:</td>
                  <td>{viewCar.priceperDay}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Place:</td>
                  <td>{viewCar.place}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>District:</td>
                  <td>{viewCar.district}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>State:</td>
                  <td>{viewCar.state}</td>
                </tr>
                <tr className="view-table">
                  <td style={{ fontWeight: "bold" }}>Image:</td>
                  <td>
                    <img src={viewCar.carPhoto} width={"35%"} alt="" />
                  </td>
                </tr>
                <tr className="view-table">
                  <td>
                    <button
                      style={{ backgroundColor: "#ffeb3b" }}
                      className="viewclose"
                      onClick={() => setViewCars(false)}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="table-parent">
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
                <th>CarId</th>
                <th>Car Brand</th>
                <th>Car Name</th>
                <th>Car Photo</th>
                <th>Transmission</th>
                <th>Fuel</th>
                <th>Car Status</th>
                <th>Actions</th>
              </tr>
            </thead>
           
           {currentRows == "" ?<tr>
                <td colSpan={9}>
                 <span className="norecords-css">No Records Found </span> 
                </td>
              </tr>: ""}
           { currentRows.map((data) => (
              <tr style={{backgroundColor: selectedRow === data.carID ? "#ececec" : "" }}>
                {/* e9e9eb */}
                <td>{data.carID}</td>
                <td>{data.carBrand}</td>
                <td>{data.carName}</td>
                <td>
                  <img src={data.carPhoto} alt="" width={100} />
                </td>
                <td>{data.carNumber}</td>
                <td>{data.transmission}</td>
                <td>
                  <span
                    className={
                      data.carStatus == "Available"
                        ? "status-style"
                        : "status-style-n"
                    }
                  >
                    {data.carStatus}{" "}
                  </span>{" "}
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="viewIcon"
                      onClick={() => handleviewCar(data)}
                    >
                      <VisibilityIcon />
                    </button>
                    <button
                      className="edit"
                      onClick={() => handleEditModel(data) }
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteCar(data)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            }
          {/* )} */}
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
    </div>
  );
};

export default CarsList;
