import React, { useState } from "react";

function SearchInput({ getWeatherDetails, searchInputRef, city, setCity }) {
  // const [city, setCity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCity = (e) => {
    e.preventDefault();
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput}&days=2`;

    getWeatherDetails(API_URL);
    setSearchInput("");
  };

  // const handleLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;

  //       getWeatherDetails(API_URL);
  //     },
  //     () => {
  //       alert("Please allow location access");
  //     }
  //   );
  // };
  return (
    <form action="#" className="my-6" onSubmit={handleCity}>
      <div className=" relative flex items-center justify-center">
        <span className="material-symbols-rounded    "></span>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter a City name"
          className="bg-transparent border-2   px-8 py-4 mt-4 rounded-2xl shadow-xl placeholder:text-white placeholder:text-lg text-white text-lg"
        />
        <button className="mt-2">
          {" "}
          <span className="material-symbols-rounded  bg-transparent p-4 mt-2 rounded-full shadow-2xl mx-2 cursor-pointer text-white border-2 border-white">
            search
          </span>
        </button>
      </div>
    </form>
  );
}

export default SearchInput;
