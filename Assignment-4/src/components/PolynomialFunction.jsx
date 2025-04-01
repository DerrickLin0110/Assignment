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
      <label htmlFor="a">Coffenicents:</label>
        <input type="text" id="Coefficients" value={coefficients} onChange={(e) => setCoefficients(e.target.value)} required />
        <label htmlFor="b">Exponents:</label>
        <input type="text" id="Exponents" value={exponents} onChange={(e) => setExponents(e.target.value)} required />
        <label htmlFor="c">X Value</label>
        <input type="number" id="X Value" value={xValue} onChange={(e) => setXValue(e.target.value)} required />
        <label htmlFor="result">Polynomial Function:</label>
        <input type="text" value={polynomial} readOnly id="Polynomial Function (Result)" />
        <label htmlFor="result">Polynomial Evaluation:</label>
        <input type="text" value={result} readOnly id="Polynomial Evaluation (Result)" />
        <button type="submit">Calculate</button>

      </form>
    </div>
  );
}

export default PolynomialFunction;
