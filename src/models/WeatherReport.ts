import { TemperatureUnit } from "./TemperatureUnit";

export interface WeatherReport {
  id: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}
