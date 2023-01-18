import React, { useState } from "react";

/* Components */
import ListItem from "../ListItem";

/* Icons */
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

/* Models TS */
import { TableList } from "../../../models/TableList";
import { WeatherReport } from "../../../models/WeatherReport";
import { SortOrder } from "../../../models/SortOrder";

/* Constans */
import { sortTable } from "../../../data/constant";
import { header } from "../../../data/constant";

const List: React.FC<TableList> = ({
  weatherFilterList,
  setWeatherFilterList,
  setIsLoading,
  getWeatherList,
  setErrorLoading,
}) => {
  const [order, setOrder] = useState<SortOrder>(sortTable.asc);
  const [currentColumn, setCurrentColumn] = useState<keyof WeatherReport | "">(
    ""
  );

  /* Sort Data function */
  const sorting = (col: keyof WeatherReport) => {
    if (order === sortTable.asc) {
      const sorted = [...weatherFilterList].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );

      setWeatherFilterList(sorted);
      setCurrentColumn(col);
      setOrder(sortTable.desc);
    }

    if (order === sortTable.desc) {
      const sorted = [...weatherFilterList].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );

      setWeatherFilterList(sorted);
      setCurrentColumn(col);
      setOrder(sortTable.asc);
    }
  };

  /* Create List headers */
  const tableHeader = header.map(({ key, name, filter }) => {
    if (filter) {
      return (
        <th key={key} onClick={() => sorting(key)}>
          {name}
          {currentColumn === key && order === sortTable.desc ? (
            <TiArrowSortedDown />
          ) : (
            <TiArrowSortedUp />
          )}
        </th>
      );
    } else {
      return <th key={key}>{name}</th>;
    }
  });

  /* Create List of items */
  const weatherListItems = weatherFilterList?.map(
    ({ id, temperature, unit, city, date }: WeatherReport) => (
      <ListItem
        key={id}
        id={id}
        temperature={temperature}
        unit={unit}
        city={city}
        date={date}
        setIsLoading={setIsLoading}
        getWeatherList={getWeatherList}
        setErrorLoading={setErrorLoading}
      />
    )
  );

  return (
    <table className="weather-list__table">
      <thead>
        <tr>
          {tableHeader}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{weatherListItems}</tbody>
    </table>
  );
};

export default List;
