import { TemperatureUnit } from "../models/TemperatureUnit";

const UnitConvert = (
  temperature: number,
  unit: TemperatureUnit
): number | boolean => {
  switch (unit) {
    case "F":
      return Math.round((Number(temperature) + 459.67) * (5 / 9) * 100) / 100;
    case "K":
      return temperature;
    case "C":
      return Math.round((Number(temperature) + 273.15) * 100) / 100;
    default:
      return false;
  }
};

export default UnitConvert;
