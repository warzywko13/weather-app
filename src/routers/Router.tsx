import React from "react";
import { Routes, Route } from "react-router-dom";

import WeatherList from "../pages/WeatherList/WeatherList";
import AddEditWeather from "../pages/AddEditWeather/AddEditWeather";
import NotFound from "../pages/NotFound/NotFound";

const Router: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path={"/"} element={<WeatherList />} />
        <Route path={"/add"} element={<AddEditWeather />} />
        <Route path={"/edit/:id"} element={<AddEditWeather />} />
        <Route path={"/*"} element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Router;
