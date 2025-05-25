import React, { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import { weatherCodes } from "../constant";
import NoResultSection from "./NoResultSection";

const Weather = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [noresults, setNoResults] = useState(false);
  const scrollContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const filterHourlForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecasts(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    setNoResults(false);
    try {
      const response = await fetch(API_URL);

      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error();
      const humidity = data.current.humidity;
      const wind_kph = data.current.wind_kph;
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );
      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
        humidity,
        wind_kph,
      });

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      setCity(data.location.name);
      setCountry(data.location.country);

      filterHourlForecast(combinedHourlyData);
    } catch {
      setNoResults(true);
    }
  };

  useEffect(() => {
    const defaultCity = "Mumbai";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;

    getWeatherDetails(API_URL);
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-blue-600 to-pink-600 flex items-center justify-center rounded-2xl shadow-2xl px-4 pb-6">
        <div className="w-full">
          <SearchInput
            getWeatherDetails={getWeatherDetails}
            searchInputRef={searchInputRef}
            city={city}
            setCity={setCity}
          />
          {noresults ? (
            <NoResultSection />
          ) : (
            <div>
              <CurrentWeather
                currentWeather={currentWeather}
                city={city}
                country={country}
              />

              <div className="mt-6 border-t-2 border-white pt-2 relative">
                <h3 className="text-white font-bold text-lg mb-2">
                  Hourly Forecast
                </h3>

                {hourlyForecasts.length > 5 && (
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                <div
                  ref={scrollContainerRef}
                  className="hourly-scroll-container overflow-x-auto hide-scrollbar"
                >
                  <div className="flex">
                    {hourlyForecasts.map((hourlyWeather) => (
                      <div
                        key={hourlyWeather.time_epoch}
                        className="min-w-[120px]  "
                      >
                        <HourlyWeather hourlyWeather={hourlyWeather} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
