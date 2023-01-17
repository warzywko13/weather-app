import { WeatherReport } from "../models/WeatherReport";

export interface TableInputSearch {
  weatherList: WeatherReport[];
  setWeatherFilterList: React.Dispatch<React.SetStateAction<WeatherReport[]>>;
}
