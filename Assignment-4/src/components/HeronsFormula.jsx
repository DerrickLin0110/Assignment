import { useState } from "react";
function HeronCalculator() {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [area, setArea] = useState("");

  const calculateHeron = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
    } else {
      return "Invalid sides";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setArea(calculateHeron(Number(sideA), Number(sideB), Number(sideC)));
  };

  return (
    <div className="HF">
      <h3>Heron's Formula</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="a">Side A:</label>
        <input type="number" id="Side A" value={sideA} onChange={(e) => setSideA(e.target.value)} required />
        <label htmlFor="b">Side B:</label>
        <input type="number" id="Side B" value={sideB} onChange={(e) => setSideB(e.target.value)} required />
        <label htmlFor="c">Side C:</label>
        <input type="number" id="Side C" value={sideC} onChange={(e) => setSideC(e.target.value)} required />
        <label htmlFor="result">Area:</label>
        <input type="text" value={area} readOnly id="Area (Result)" />
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}

export default HeronCalculator;
