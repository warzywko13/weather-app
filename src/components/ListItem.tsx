import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* Utils */
import UnitConvert from "../utils/UnitConvert";

/* Models TS */
import { WeatherListFunctions } from "../models/WeatherListFunctions";

/* Icons */
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

/* Styles */
import "./ListItem.css";

const ListItem: React.FC<WeatherListFunctions> = ({
  id,
  temperature,
  unit,
  date,
  city,
  setIsLoading,
  getWeatherList,
}) => {
  const nav = useNavigate();

  const handleDelete = async (): Promise<void> => {
    if (window.confirm("This record was deleted. Continue?")) {
      await axios
        .delete(`http://localhost:8000/api/reports/${id}`)
        .then(({ data, status }) => {
          if (status === 200) {
            console.log(data);
            setIsLoading(false);
            getWeatherList();
          } else {
            console.log(data);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  const handleEdit = (): void => {
    nav(`/edit/${id}`);
  };

  return (
    <tr>
      <td>{UnitConvert(temperature, unit)}</td>
      <td>{"K"}</td>
      <td>{city}</td>
      <td>{date}</td>
      <td>
        <button
          onClick={handleEdit}
          className="weather-list__table-btn btn-edit"
        >
          <AiOutlineEdit />
        </button>
      </td>
      <td>
        <button
          onClick={handleDelete}
          className="weather-list__table-btn btn-remove"
        >
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
