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
        <input type="number" placeholder="Root Guess" value={guess} onChange={(e) => setGuess(e.target.value)} required />
        <button type="submit">Calculate</button>
        <input type="text" value={approximation} readOnly placeholder="Root Approximation (Result)" />
      </form>
    </div>
  );
}

export default NewtonMethod;
