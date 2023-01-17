import React from "react";

/* Components */
import Navbar from "./components/Navbar";
import Router from "./routers/Router";

/* Style */
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
};

export default App;
