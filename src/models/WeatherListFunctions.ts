import { WeatherReport } from "./WeatherReport";

export interface WeatherListFunctions extends WeatherReport {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getWeatherList: () => Promise<void>;
}
