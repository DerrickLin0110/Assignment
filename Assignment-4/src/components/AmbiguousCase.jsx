import { useState } from "react";
function AmbiguousCase() {
  const [angleA, setAngleA] = useState("");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [triangleType, setTriangleType] = useState("");

  const checkAmbiguousCase = (angleA, sideA, sideB) => {
    const angleARad = (Math.PI / 180) * angleA;
    const h = sideB * Math.sin(angleARad);
    if (sideA < h) return "No Triangle";
    if (sideA === h) return "Right Triangle";
    if (sideA > h && sideA < sideB) return "Two Possible Triangles";
    return "One Triangle";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTriangleType(checkAmbiguousCase(Number(angleA), Number(sideA), Number(sideB)));
  };

  return (
    <div className="AC">
      <h3>Ambiguous Case</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor="a">Angle A (°):</label>
        <input type="number" id="Angle A (°)" value={angleA} onChange={(e) => setAngleA(e.target.value)} required />
        <label htmlFor="b">Side A:</label>
        <input type="number" id="Side A" value={sideA} onChange={(e) => setSideA(e.target.value)} required />
        <label htmlFor="c">Side B:</label>
        <input type="number" id="Side B" value={sideB} onChange={(e) => setSideB(e.target.value)} required />
        <label htmlFor="result">Triangle:</label>
        <input type="text" value={triangleType} readOnly id="Triangle Type (Result)" />
        <button type="submit">Calculate</button>

      </form>
    </div>
  );
}

export default AmbiguousCase;
