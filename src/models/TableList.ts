import { WeatherReport } from "./WeatherReport";

export interface TableList {
  weatherFilterList: WeatherReport[];
  setWeatherFilterList: React.Dispatch<React.SetStateAction<WeatherReport[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getWeatherList: () => Promise<void>;
  setErrorLoading: React.Dispatch<React.SetStateAction<string>>;
}
