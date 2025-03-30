import React from "react";

import HeronCalculator from "./components/HeronCalculator";
import AmbiguousCase from "./components/AmbiguousCase";
import NewtonMethod from "./components/NewtonMethod";
import PolynomialFunction from "./components/PolynomialFunction";
import "./App.css";

function App() {
  return (
    <div className="container">
      <HeronCalculator />
      <AmbiguousCase />
      <NewtonMethod />
      <PolynomialFunction />
    </div>
  );
}

export default App;
