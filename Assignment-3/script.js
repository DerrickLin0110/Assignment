function calculateHeron(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
    } else {
        return "Invalid sides";
    }
}

document.getElementById("heronsform").addEventListener("submit", function (event) {
    event.preventDefault();

    const a = Number(document.getElementById("sidea").value);
    const b = Number(document.getElementById("sideb").value);
    const c = Number(document.getElementById("sidec").value);


    const result = calculateHeron(a, b, c);

    document.getElementById("area").value = result;
});


function checkAmbiguousCase(angleA, sideA, sideB) {
    const angleARad = (Math.PI / 180) * angleA;
    const h = sideB * Math.sin(angleARad);

    if (sideA < h) return "No Triangle";
    if (sideA === h) return "Right Triangle";
    if (sideA > h && sideA < sideB) return "Two Possible Triangles";
    return "One Triangle";
}

document.getElementById("ambiguousform").addEventListener("submit", function (event) {
    event.preventDefault();

    const angleA = Number(document.getElementById("anglea").value);
    const sideA = Number(document.getElementById("sideaAC").value);
    const sideB = Number(document.getElementById("sidebAC").value);

    const result = checkAmbiguousCase(angleA, sideA, sideB);

    document.getElementById("triangleType").value = result;
});
function newtonMethod(initialGuess) {
    let x = initialGuess;

    function f(x) {
        return 6 * Math.pow(x, 4) - 13 * Math.pow(x, 3) - 18 * Math.pow(x, 2) + 7 * x + 6;
    }

    function fPrime(x) {
        return 24 * Math.pow(x, 3) - 39 * Math.pow(x, 2) - 36 * x + 7;
    }

    for (let i = 0; i < 10; i++) {
        x = x - f(x) / fPrime(x);
    }
    return x.toFixed(5);
}

document.getElementById("newtonform").addEventListener("submit", function (event) {
    event.preventDefault();

    const guess = Number(document.getElementById("rootguess").value);

    const result = newtonMethod(guess);

    document.getElementById("rootapprox").value = result;
});

function evaluatePolynomial(coefficients, exponents, x) {
    if (coefficients.length !== exponents.length) {
        alert("Mismatch between coefficients and exponents.");
        return "Error";
    }

    return coefficients.reduce((sum, coef, index) => sum + coef * Math.pow(x, exponents[index]), 0).toFixed(2);
}

function formatPolynomial(coefficients, exponents) {
    return coefficients.map((coef, index) => `${coef}x^${exponents[index]}`).join(" + ");
}

document.getElementById("polynomialform").addEventListener("submit", function (event) {
    event.preventDefault();

    const coefficients = document.getElementById("coefficients").value.split(",").map(Number);
    const exponents = document.getElementById("exponents").value.split(",").map(Number);
    const x = Number(document.getElementById("xvalue").value);

    const polynomialString = formatPolynomial(coefficients, exponents);
    const result = evaluatePolynomial(coefficients, exponents, x);

    document.getElementById("pf").value = polynomialString;
    document.getElementById("pe").value = result;
});
