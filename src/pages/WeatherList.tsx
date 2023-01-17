import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Components */
import List from "../components/List";
import SearchInput from "../components/SearchInput";
import LoadData from "../components/status/LoadData";
import ErrorData from "../components/status/ErrorData";

/* TS Models */
import { WeatherReport } from "../models/WeatherReport";

/* Styles */
import "./WeatherList.css";

const WeatherList: React.FC = () => {
  const navigate = useNavigate();

  const [weatherList, setWeatherList] = useState<WeatherReport[]>([]);
  const [weatherFilterList, setWeatherFilterList] =
    useState<WeatherReport[]>(weatherList);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<string>("");

  /* Get list from API */
  const getWeatherList = async () => {
    await axios("http://localhost:8000/api/reports")
      .then(({ status, data }) => {
        if (status !== 200) {
          setIsLoading(false);
          setErrorLoading("Error when getting data");

          return;
        }

        setErrorLoading("");
        setIsLoading(false);
        setWeatherList(data);
      })
      .catch((response) => {
        setIsLoading(false);
        setErrorLoading(response.message);
      });
  };

  /* Run Get WeatherList on start Page*/
  useEffect(() => {
    getWeatherList();
  }, []);

  /* If weatherList change update FilterList */
  useEffect(() => {
    setWeatherFilterList(weatherList);
  }, [weatherList]);

  return (
    <>
      {isLoading && <LoadData />}
      {errorLoading && <ErrorData message={errorLoading} />}
      {!errorLoading && !isLoading && (
        <div className="weather-list">
          <button
            className="weather-list__btn btn-add"
            onClick={() => navigate("/add")}
          >
            Add New
          </button>

          <div className="weather-list__container">
            <SearchInput
              weatherList={weatherList}
              setWeatherFilterList={setWeatherFilterList}
            />
            <List
              weatherList={weatherFilterList}
              setWeatherList={setWeatherFilterList}
              setIsLoading={setIsLoading}
              getWeatherList={getWeatherList}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherList;
