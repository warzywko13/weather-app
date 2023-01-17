/* Models TS */
import { TemperatureUnit } from "../models/TemperatureUnit";
import { WeatherReport } from "../models/WeatherReport";
import { SortOrder } from "../models/SortOrder";

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

export const currentDate: string = new Date().toJSON().slice(0, 10);

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

export const sortTable: {
  asc: SortOrder;
  desc: SortOrder;
} = {
  asc: "asc",
  desc: "desc",
};
