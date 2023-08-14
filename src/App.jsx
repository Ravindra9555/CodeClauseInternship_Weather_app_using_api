/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  let date = new Date().toLocaleDateString();
  const api = process.env.REACT_APP_API; //api key comming from .env file

  const [data, setdata] = useState(true);
  const [city, setCity] = useState("mumbai");

  //call api with axios

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`
      );
      setdata(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // This will run on page load or reload
    fetchData(city);
  }, []);
  // this function is run on  search button click
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(city);
  };

  return (
    <div className="app ">
      <nav class="navbar container">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img
              className="navbar-brand"
              src="img/weather.png"
              width="20%"
              alt="weather icon"
            />
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              <img
                src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
                alt="Weather data by WeatherAPI.com"
                border="0"
              />
            </a>
          </a>
          <p className=" date mx-auto">
            <span>{date}</span>
          </p>
          <form className="d-flex " role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter Your City Name"
            />
            <button className="btn btn-outline-warning  " type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* this is render after the api call  */}
      {data && data.current && (
        <div className="container main-cont">
          <div className="row aqi">
            <div className="card mb-3 col-4 mx-auto">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="img/w3.png"
                    className="img-fluid rounded-start "
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="wind">
                      Wind &nbsp; <span>{data.current.wind_kph} KmPh</span>{" "}
                    </p>
                    <p className="wind">
                      Humidity &nbsp;<span>{data.current.humidity}</span>{" "}
                    </p>
                    <p className="wind">
                      Visibility &nbsp; <span>{data.current.vis_km} Km</span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
            <div className="card mb-3 col-4 mx-auto">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="img/weat.png"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="wind">
                      Feels Like &nbsp; <span>{data.current.feelslike_c}</span>{" "}
                    </p>
                    <p className="wind">
                      Precipition &nbsp;{" "}
                      <span>{data.current.precip_mm} mm</span>{" "}
                    </p>
                    <p className="current-text">
                      Current Weather &nbsp;
                      <span>{data.current.condition.text}</span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div div className="row current">
            <div className="card mb-3 col-6 mx-auto">
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img
                    src={"https:" + data.current.condition.icon}
                    className="weather-icon "
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="temp-text">
                      Temprature &nbsp; <span>{data.current.temp_c} °C</span>{" "}
                    </p>
                    <p className="city-text">
                      {" "}
                      City &nbsp;<span>{data.location.name}</span>
                    </p>
                    <p className="city-text">
                      Region &nbsp;<span>{data.location.region}</span>
                    </p>
                    <p className="city-text">
                      {" "}
                      Country &nbsp;<span>{data.location.country}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer row">
        <div className="col-sm-6 dev-head">
          <h3 className="dev-name-head">Import Links</h3>
          <p className="dev-name">
            {" "}
            <a className="dev-name" href="https://www.accuweather.com/">
              Accuweather
            </a>
          </p>
          <p className="dev-name">
            <a href="https://aqicn.org/" className="dev-name">
              AQI
            </a>
          </p>
        </div>
        <div className="col-sm-6 dev-head">
          <h3 className="dev-name-head">Developer Contact</h3>
          <p className="dev-name ">Name - Ravindra Kumar </p>
          <p className="dev-name-email">
            Email -{" "}
            <a className="email-a" href="mailto:ravindraietbu@gmail.com">
              {" "}
              ravindraietbu@gmail.com
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
