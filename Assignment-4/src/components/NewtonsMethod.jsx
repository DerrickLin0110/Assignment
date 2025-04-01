import { useState } from "react";

function NewtonMethod() {
  const [guess, setGuess] = useState("");
  const [approximation, setApproximation] = useState("");

  const newtonMethod = (x) => {
    for (let i = 0; i < 10; i++) {
      x = x - (6 * x ** 4 - 13 * x ** 3 - 18 * x ** 2 + 7 * x + 6) / (24 * x ** 3 - 39 * x ** 2 - 36 * x + 7);
    }
    return x.toFixed(5);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setApproximation(newtonMethod(Number(guess)));
  };

  return (
    <div className="NM">
      <h3>Newton's Method</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor="a">Root Guess:</label>
        <input type="number" id="Root Guess" value={guess} onChange={(e) => setGuess(e.target.value)} required />
        <label htmlFor="result">Root Approximation:</label>
        <input type="text" value={approximation} readOnly id="Root Approximation (Result)" />
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}

export default NewtonMethod;
