import React, { useState } from "react";
import ApiContext from "./ApiContext";

const ApiContextProvider = ({ children }) => {

  const [WeatherReport, setWeatherReport] = useState({
    current: {},
    location: {},
    forecast: {
      forecastday:[],
    },
    alerts: {},
  });

  async function searchedLocation(searchingCity){
   try {
     let apiResponce = await fetch(
       `https://api.weatherapi.com/v1/forecast.json?key=ddb2c3102a954812b3f132205242601&q=${searchingCity}&days=7&aqi=yes&alerts=yes`
     );

     if (!apiResponce.ok) {
       alert("this city is not present")
     }

     let data = await apiResponce.json();
     return data;
     
   } catch {
     console.log("catch");
   }
  }

  return (
    <ApiContext.Provider
      value={{
        searchedLocation,
        WeatherReport,
        setWeatherReport,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
