import { WeatherReport } from "./WeatherReport";

export interface TableList {
  weatherList: WeatherReport[];
  setWeatherList: React.Dispatch<React.SetStateAction<WeatherReport[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getWeatherList: () => Promise<void>;
}
