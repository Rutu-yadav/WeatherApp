import React from "react";

function CurrentWeather({ currentWeather, city, country }) {
  return (
    <div className="">
      {city && (
        <h1 className="text-white text-3xl font-bold text-center mb-2">
          {city}
          {country && <span>, {country}</span>}
        </h1>
      )}
      <div className="flex items-center justify-center mt-2">
        <img
          src={`/Images/icons/${currentWeather.weatherIcon}.svg`}
          alt="img"
        />
      </div>
      <div className="flex items-center justify-center mt-4 font-bold text-4xl">
        <h2 className="text-white">
          {currentWeather.temperature}
          <span>°C</span>
        </h2>
      </div>
      <div className="flex items-center justify-around mt-2">
        <div className=" items-center justify-center mt-2">
          <div className="flex text-xl justify-around items-center gap-2">
            <span className="material-symbols-rounded text-white  text-2xl">
              water_drop
            </span>
            <p className="text-white">{currentWeather.humidity}%</p>
          </div>
          <p className="text-white text-base text-center">Humidity</p>
        </div>
        <p className="  text-center pl-6 text-4xl font-bold mt-2 text-white">
          {currentWeather.description}
        </p>

        <div className=" items-center justify-center mt-2">
          <div className="flex text-xl justify-around items-center gap-2">
            <span className="material-symbols-rounded text-white">air</span>
            <p className="text-white ">{currentWeather.wind_kph} </p>
            <span className="text-white">km/h</span>{" "}
          </div>

          <p className="text-white text-base text-center">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
