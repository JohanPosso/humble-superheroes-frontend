// src/App.js
import React from "react";
import SuperheroList from "./components/SuperheroList";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const App = () => {
  return (
    <div className="p-m-4">
      <h1 className="text-center">Humble Superheroes</h1>
      <SuperheroList />
    </div>
  );
};

export default App;
