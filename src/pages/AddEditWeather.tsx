import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

/* Components */
import LoadData from "../components/status/LoadData";
import ErrorData from "../components/status/ErrorData";

/* Models TS */
import { TemperatureUnit } from "../models/TemperatureUnit";

/* Constants */
import { options, currentDate } from "../data/constant";

/* Style */
import "./AddEditWeather.css";

const AddEditWeather: React.FC = () => {
  const nav = useNavigate();

  /* Set state */
  const { id } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string>(currentDate);
  const [temperature, setTemperature] = useState<number | string>("");
  const [unit, setUnit] = useState<TemperatureUnit | string>("K");

  /* Error message */
  const [errorLoading, setErrorLoading] = useState<string>("");
  const [errorUpload, seterrorUpload] = useState<string>("");

  const [errorTemperature, setErrorTemperature] = useState<string>("");
  const [errorUnit, setErrorUnit] = useState<string>("");
  const [errorCity, setErrorCity] = useState<string>("");
  const [errorDate, setErrorDate] = useState<string>("");

  /* Handle Form */
  const handleTemperature = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTemperature(e.target.value);
  const handleUnit = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setUnit(e.target.value);
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCity(e.target.value);
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setDate(e.target.value);

  /* Load data if edit weather */
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/reports/${id}`)
        .then(({ data, status }) => {
          if (status !== 200) {
            setErrorLoading("Error when getting data");
            setIsLoading(false);

            return;
          }

          setErrorLoading("");

          const { city, date, temperature, unit } = data;

          setCity(city);
          setDate(date);
          setTemperature(temperature);
          setUnit(unit);
        })
        .catch((response) => {
          setErrorLoading(response.message);
        });
    }

    setIsLoading(false);
  }, [id]);

  /* Add or Edit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Validation */
    if (temperature === "") {
      setErrorTemperature("Temperature can't be empty");
      return;
    }
    setErrorTemperature("");

    if (unit !== "K" && unit !== "C" && unit !== "F") {
      setErrorUnit("Unit can only be K, F or C");
      return;
    }
    setErrorUnit("");

    if (city.length === 0) {
      setErrorCity("City name can't be empty");
      return;
    }
    setErrorCity("");

    const dateTime = new Date(date);
    const firstDay = new Date(dateTime.getFullYear(), dateTime.getMonth(), 1);
    const lastDay = new Date(dateTime.getFullYear(), dateTime.getMonth(), 0);

    if (date === "") {
      setErrorDate("Date can't be empty");
      return;
    }
    if (firstDay >= dateTime || lastDay >= dateTime) {
      setErrorDate("Incorrect date. Please check date.");
      return;
    }
    setErrorDate("");

    /* Add Update Data to API */
    if (id) {
      await axios
        .put(`http://localhost:8000/api/reports/${id}`, {
          temperature,
          unit,
          city,
          date,
        })
        .then(({ data, status }) => {
          if (status !== 200) {
            seterrorUpload("Error when update form");
            return;
          }

          seterrorUpload("");
          nav("/");
        })
        .catch((response) => {
          seterrorUpload("Error when update form");
        });
    } else {
      await axios
        .post(`http://localhost:8000/api/reports`, {
          temperature,
          unit,
          city,
          date,
        })
        .then(({ data, status }) => {
          if (status !== 200) {
            seterrorUpload("Error when create form");
            return;
          }

          seterrorUpload("");
          nav("/");
        })
        .catch((response) => {
          seterrorUpload("");
        });
    }
  };

  return (
    <>
      {isLoading && <LoadData />}
      {errorLoading && <ErrorData message={errorLoading} />}
      {errorUpload && <ErrorData message={errorUpload} />}

      {!errorLoading && (
        <form className="add-edit-weather" onSubmit={handleSubmit}>
          <h1>{id ? "Edit Weather" : "Add New Weather"}</h1>
          <label>
            Temperature<span className="add-edit-weather__required">*</span>
            <input
              type="number"
              className="add-edit-weather__input"
              value={temperature}
              onChange={handleTemperature}
            />
            {errorTemperature.length > 0 && (
              <span className="add-edit-weather__input-error">
                {errorTemperature}
              </span>
            )}
          </label>
          <label>
            Unit<span className="add-edit-weather__required">*</span>
            <select
              id="serviceTime"
              className="add-edit-weather__input"
              value={unit}
              onChange={handleUnit}
            >
              {options.map((option, key) => (
                <option key={key} value={option.unit}>
                  {option.unit}
                </option>
              ))}
            </select>
            {errorUnit.length > 0 && (
              <span className="add-edit-weather__input-error">{errorUnit}</span>
            )}
          </label>
          <label>
            City<span className="add-edit-weather__required">*</span>
            <input
              type="text"
              className="add-edit-weather__input"
              value={city}
              onChange={handleCity}
            />
            {errorCity.length > 0 && (
              <span className="add-edit-weather__input-error">{errorCity}</span>
            )}
          </label>
          <label>
            Date<span className="add-edit-weather__required">*</span>
            <input
              type="date"
              className="add-edit-weather__input"
              value={date}
              onChange={handleDate}
            />
            {errorDate.length > 0 && (
              <span className="add-edit-weather__input-error">{errorDate}</span>
            )}
          </label>
          <input
            className="add-edit-weather__submit"
            type="submit"
            value={id ? "Edit" : "Add New"}
          />
        </form>
      )}
    </>
  );
};

export default AddEditWeather;
