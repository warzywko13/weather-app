/* Models TS */
import { TemperatureUnit } from "../models/TemperatureUnit";
import { WeatherReport } from "../models/WeatherReport";
import { SortOrder } from "../models/SortOrder";

/* Termperature Unit */
export const options: { unit: TemperatureUnit }[] = [
  {
    unit: "K",
  },
  {
    unit: "F",
  },
  {
    unit: "C",
  },
];

/* Current date */
export const currentDate: string = new Date().toJSON().slice(0, 10);

/* Header column WeatherList */
export const header: {
  key: keyof WeatherReport;
  name: string;
  filter: boolean;
}[] = [
  { key: "temperature", name: "Temperature", filter: true },
  { key: "unit", name: "Unit", filter: false },
  { key: "city", name: "City", filter: true },
  { key: "date", name: "Date", filter: true },
];

/* Sort table sort values */
export const sortTable: {
  asc: SortOrder;
  desc: SortOrder;
} = {
  asc: "asc",
  desc: "desc",
};
