import { useState } from "react";

function PolynomialFunction() {
  const [coefficients, setCoefficients] = useState("");
  const [exponents, setExponents] = useState("");
  const [xValue, setXValue] = useState("");
  const [polynomial, setPolynomial] = useState("");
  const [result, setResult] = useState("");

  const evaluatePolynomial = (coefficients, exponents, x) => {
    return coefficients.reduce((sum, coef, index) => sum + coef * x ** exponents[index], 0).toFixed(2);
  };

  const formatPolynomial = (coefficients, exponents) => {
    return coefficients.map((coef, index) => `${coef}x^${exponents[index]}`).join(" + ");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coefArray = coefficients.split(",").map(Number);
    const expArray = exponents.split(",").map(Number);
    setPolynomial(formatPolynomial(coefArray, expArray));
    setResult(evaluatePolynomial(coefArray, expArray, Number(xValue)));
  };

  return (
    <div className="PF">
      <h3>Polynomial Function</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Coefficients" value={coefficients} onChange={(e) => setCoefficients(e.target.value)} required />
        <input type="text" placeholder="Exponents" value={exponents} onChange={(e) => setExponents(e.target.value)} required />
        <input type="number" placeholder="X Value" value={xValue} onChange={(e) => setXValue(e.target.value)} required />
        <button type="submit">Calculate</button>
        <input type="text" value={polynomial} readOnly placeholder="Polynomial Function (Result)" />
        <input type="text" value={result} readOnly placeholder="Polynomial Evaluation (Result)" />
      </form>
    </div>
  );
}

export default PolynomialFunction;
