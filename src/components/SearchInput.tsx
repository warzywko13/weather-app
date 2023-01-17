import React, { useState, useEffect } from "react";

/* Models TS */
import { TableInputSearch } from "../models/TableInputSearch";

/* Styles */
import "./SearchInput.css";

const SearchInput: React.FC<TableInputSearch> = ({
  weatherList,
  setWeatherFilterList,
}) => {
  const [search, setSearch] = useState<string>("");

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearch(e.target.value);

  /* Search city name From WeatherList */
  useEffect(() => {
    if (search === "") {
      setWeatherFilterList(weatherList);
      return;
    }

    const filterList = weatherList.filter((el) =>
      el.city.toLowerCase().includes(search.toLowerCase())
    );

    setWeatherFilterList(filterList);
  }, [search, weatherList, setWeatherFilterList]);

  return (
    <input
      type="text"
      className="weather-list__input"
      placeholder="City search"
      value={search}
      onChange={inputHandleChange}
    />
  );
};

export default SearchInput;
