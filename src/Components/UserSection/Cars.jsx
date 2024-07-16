import React, { useContext, useEffect, useState } from "react";
import "../UserSection/Cars.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import titleImage from "../Images/carimageforHeader.png";
import title from "../Images/Title.png";
import balenoImage from "../Images/baleno.png.jpg";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useNavigate } from "react-router-dom";
import { AllCars, CarsByPlaceApi, GetAllCars } from "../Services/CarServices";
import { UserContext } from "./Context/UserContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import seat from "../Images/carseat.svg";
import fuel from "../Images/fuel.svg";
import transmission from "../Images/transmission.svg";
import ColorLens from "@mui/icons-material/ColorLens";
import Login from "@mui/icons-material/Login";

function AvailableCars() {
  const { data, updateData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [allCars, setAllCars] = useState([]);
  const [filters, setFilters] = useState({
    availableNow: false,
    selectedTransmission: "",
    seletedSeat: "",
    selectedFuel: "",
  });

  const handleSettransmisson = (value) => {
    setFilters((prevdata) => ({
      ...prevdata,
      selectedTransmission: value,
    }));
    if (filters.selectedTransmission == value) {
      setFilters((prevdata) => ({
        ...prevdata,
        selectedTransmission: "",
      }));
    }
  };
  useEffect(() => {
    setLoading(true);
    const FetchCars = async () => {
      let response = await CarsByPlaceApi(sessionStorage.getItem("place"));
      // let response = await AllCars();
      setAllCars(response.data.data);
      if (response.data.success == "true") {
        setLoading(false);
      }
    };
    FetchCars();
  }, [data.place]);
  const handleAvailableNow = (event) => {
    setFilters((prevdata) => ({
      ...prevdata,
      availableNow: event.target.checked,
    }));
  };
  const handletrasmission = (event) => {
    setFilters({ ...filters, selectedTransmission: event });
  };
  const handleSeating = (event) => {
    setFilters((prevdata) => ({
      ...prevdata,
      seletedSeat: event,
    }));
    if (filters.seletedSeat == event) {
      setFilters((prevdata) => ({
        ...prevdata,
        seletedSeat: "",
      }));
    }
  };
  const handleFuel = (value) => {
    setFilters((prevdata) => ({
      ...prevdata,
      selectedFuel: value,
    }));
    if (filters.selectedFuel == value) {
      setFilters((prevdata) => ({
        ...prevdata,
        selectedFuel: "",
      }));
    }
  };

  const handleColor = (value) => {
    setFilters((prevdata) => ({
      ...prevdata,
      selectedColor: value,
    }));
    if (filters.selectedColor == value) {
      setFilters((prevdata) => ({
        ...prevdata,
        selectedColor: "",
      }));
    }
  };

  const [uniqueCarbrand, setUniquecarbrand] = useState([]);
  const [uniqueCarname, setUniquecarName] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  useEffect(() => {
    const brands = [...new Set(allCars.map((car) => car.carBrand))];
    setUniquecarbrand(brands);
  }, [allCars]);

  useEffect(() => {
    if (selectedBrand) {
      const names = allCars
        .filter((car) => car.carBrand === selectedBrand)
        .map((car) => car.carName)
        .filter((car, index, self) => self.indexOf(car) === index);
      setUniquecarName(names);
    }
  }, [selectedBrand]);

  const handleChangecarBrand = (event) => {
    setSelectedBrand(event.target.value);
    setCarName("");
  };

  const [carName, setCarName] = useState("");
  const handleChangecarName = (e) => {
    setCarName(e.target.value);
  };

  const filteredcars = allCars.filter((cars) => {
    let result = true;
    if (filters.availableNow && cars.carStatus !== "Available") {
      //true                      false
      return false;
    }
    if (filters.selectedTransmission == cars.transmission) {
      return false;
    }
    if (filters.seletedSeat && filters.seletedSeat !== cars.seating) {
      return false;
    }
    if (filters.selectedFuel && filters.selectedFuel !== cars.fuel) {
      return false;
    }
    if (filters.selectedColor && filters.selectedColor != cars.carColor) {
      return false;
    }
    if (selectedBrand && selectedBrand != cars.carBrand) {
      return false;
    }
    if (carName && carName != cars.carName) {
      return false;
    }
    return result;
  });

  const handleReset = () => {
    setFilters(() => ({
      availableNow: false,
      selectedTransmission: "",
      seletedSeat: "",
      selectedFuel: "",
      selectedColor: "",
    }));
  };

  const navigateToDetails = (cars) => {
    sessionStorage.setItem("cardetails", JSON.stringify(cars));
    updateData("Brand", cars.carBrand);
    updateData("carName", cars.carName);
    updateData("carPriceHour", cars.priceperHour);
    updateData("carPriceDay", cars.priceperDay);
    updateData("carColor", cars.carColor);
    updateData("carID", cars.carID);
    updateData("carPhoto", cars.carPhoto);
    updateData("fuel", cars.fuel);
    updateData("seating", cars.seating);
    updateData("transmission", cars.transmission);
    navigate("/cardetails");
  };

  return (
    <div className="Container">
      <div className="body">
        <div className="body1">
          <div className="filters">
            <div className="filters1">
              <div className="filter-reset">
                <div className="filter">Filters</div>
                <div className="reset" onClick={handleReset}>
                  Reset
                </div>
              </div>
              <div className="AvailableNow">
                <div style={{ fontWeight: "bold", fontSize: "small" }}>
                  Available Now only
                </div>
                <div className="icon">
                  <Switch
                    checked={filters.availableNow}
                    onChange={handleAvailableNow}
                  />
                </div>
              </div>
              <div className="Car-Brand-Name">
                <div className="car-brand-name">
                  <Select
                    sx={{ width: "100%" }}
                    id="s"
                    size="small"
                    value={selectedBrand}
                    onChange={handleChangecarBrand}
                    displayEmpty
                  >
                    <MenuItem value="">Car Brand</MenuItem>
                    {uniqueCarbrand.map((brand, index) => (
                      <MenuItem key={index} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="car-brand-name">
                  <Select
                    sx={{ width: "100%" }}
                    size="small"
                    value={carName}
                    onChange={handleChangecarName}
                    displayEmpty
                  >
                    <MenuItem value="">Car Name</MenuItem>
                    {uniqueCarname.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="Transmission">
                <div className="transmission-name">Tramsmission</div>
                <div className="transmission-type">
                  <div className="checkbox">
                    <div>
                      <Checkbox
                        size="small"
                        checked={filters.selectedTransmission === "Manual"}
                        onChange={() => handleSettransmisson("Manual")}
                      />
                    </div>
                    <div>Automatic</div>
                  </div>
                  <div className="checkbox">
                    <div>
                      <Checkbox
                        size="small"
                        checked={filters.selectedTransmission === "Automatic"}
                        onChange={() => handleSettransmisson("Automatic")}
                      />
                    </div>
                    <div>Manual</div>
                  </div>
                </div>
              </div>
              <div className="Seating">
                <div className="seating-name">Seating</div>
                <div className="no-of-seats">
                  <div className="checkbox">
                    <div>
                      <Checkbox
                        size="small"
                        checked={filters.seletedSeat == "7"}
                        onChange={() => handleSeating("7")}
                      />
                    </div>
                    <div>7 Seater</div>
                  </div>
                  <div className="checkbox">
                    <div>
                      <Checkbox
                        size="small"
                        checked={filters.seletedSeat == "5"}
                        onChange={() => handleSeating("5")}
                      />
                    </div>
                    <div>5 Seater</div>
                  </div>
                </div>
              </div>
              <div className="Fuel">
                <div className="fuel-name">Fuel</div>
                <div className="fuel-type">
                  <div className="fuel-de-pt-ev-hy">
                    <div className="checkbox">
                      <div>
                        <Checkbox
                          size="small"
                          checked={filters.selectedFuel == "Diesel"}
                          onChange={() => handleFuel("Diesel")}
                        />
                      </div>
                      <div>Diesel</div>
                    </div>
                    <div className="checkbox">
                      <div>
                        <Checkbox
                          size="small"
                          checked={filters.selectedFuel == "Petrol"}
                          onChange={() => handleFuel("Petrol")}
                        />
                      </div>
                      <div>Petrol</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Color">
                <div className="color-text">Color</div>
                <div>
                  <div className="color-name">
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "Green"}
                        onClick={() => handleColor("Green")}
                      />
                      Green
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "White"}
                        onClick={() => handleColor("White")}
                      />
                      White
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "Black"}
                        onClick={() => handleColor("Black")}
                      />
                      Black
                    </div>
                  </div>
                  <div className="color-name1">
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "Red"}
                        onClick={() => handleColor("Red")}
                      />
                      Red
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "Blue"}
                        onClick={() => handleColor("Blue")}
                      />
                      Blue
                    </div>
                    <div className="checkbox">
                      <Checkbox
                        size="smaller"
                        checked={filters.selectedColor == "Silver"}
                        onClick={() => handleColor("Silver")}
                      />
                      Silver
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cars">
            {loading && 
                 <div class="spinner">
                <span>L</span>
                <span>O</span>
               <span>A</span>
               <span>D</span>
               <span>I</span>
               <span>N</span>
               <span>G</span>
              </div>}
            {filteredcars == "" && (
              <span className="nocars">No Cars are Available</span>
            )}
            {filteredcars.map((cars) => (
              <div className="Car">
                <div className="car1">
                  <div className="carImage">
                    <img
                      src={cars.carPhoto}
                      width="70%"
                      //  height="100px"
                      alt="baleno image"
                    />
                  </div>
                  <div className="Cardetails">
                    <div className="car-company-name-available">
                      <div className="car-company-name">
                        <div className="carCompany">{cars.carBrand}</div>
                        <div className="carName">{cars.carName}</div>
                      </div>
                    </div>

                    <div className="cardet">
                      <div className="cardet1">
                        <div className="fueltype">
                          <div className="fuel-icon">
                            <img src={fuel} alt="" width={15} />
                          </div>
                          <div className="fuelname">{cars.fuel}</div>
                        </div>
                        <div className="manual">
                          <img src={transmission} alt="" width={15} />
                          {cars.transmission}
                        </div>
                        <div className="car-seat">
                          <div className="seat-icon">
                            <img src={seat} alt="" width={15} />
                          </div>
                          <div className="seatname">{cars.seating}Seater </div>
                        </div>
                        <div className="car-seat">
                          <div className="seat-icon">
                            <ColorLens
                              style={{ color: "green", width: "15px" }}
                            />
                          </div>
                          <div className="seatname">{cars.carColor}</div>
                        </div>
                      </div>
                    </div>
                    <div className="book-price">
                      {cars.carStatus == "Available" ? (
                        <div
                          className="book"
                          onClick={() => navigateToDetails(cars)}
                        >
                          Book Now
                        </div>
                      ) : (
                        <div className="not-available">
                          <del>Not Available </del>{" "}
                        </div>
                      )}
                      <div className="price">
                        {cars.priceperHour}
                        <sub>/hr</sub>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AvailableCars;
