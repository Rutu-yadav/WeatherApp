import React from "react";
import { weatherCodes } from "../constant";

function HourlyWeather({ hourlyWeather }) {
  const temperature = Math.floor(hourlyWeather.temp_c);
  // const time = hourlyWeather.time.split(" ")[1].substring(0, 5);
  const date = new Date(hourlyWeather.time);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString();
  const time = `${formattedHours}:${minutes} ${ampm}`;

  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.condition.code)
  );
  return (
    <div className="flex flex-col items-center min-w-[100px] px-4 flex-shrink-0 text-center justify-center">
      <ul className="flex  text-center ">
        <li className="text-white font-bold bg-transparent rounded-2xl shadow-xl px-4 py-2">
          <p className="mt-2 text-nowrap text-center">{time}</p>
          <img
            src={`/Images/icons/${weatherIcon}.svg`}
            alt=""
            className="w-10 mt-2 text-center mx-auto"
          />

          <p className="mt-2 text-center">{temperature}°</p>
        </li>
      </ul>
    </div>
  );
}

export default HourlyWeather;
