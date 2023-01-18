import { WeatherReport } from "./WeatherReport";

export interface WeatherListFunctions extends WeatherReport {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorLoading: React.Dispatch<React.SetStateAction<string>>;
  getWeatherList: () => Promise<void>;
}
