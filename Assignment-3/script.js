document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("heronsform").addEventListener("submit", function (event) {
        event.preventDefault();
        const a = document.getElementById("sidea").value;
        const b = document.getElementById("sideb").value;
        const c = document.getElementById("sidec").value;

        if (a + b > c && a + c > b && b + c > a) {
            const s = (a + b + c) / 2;
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            document.getElementById("area").value = area.toFixed(2);
        } else {
            document.getElementById("area").value = "Invalid triangle sides.";
        }
    });

    document.getElementById("ambiguousform").addEventListener("submit", function (event) {
        event.preventDefault();
        const angleA = document.getElementById("anglea").value;
        const sideA = document.getElementById("sideaAC").value;
        const sideB = document.getElementById("sidebAC").value;

        const angleARad = (Math.PI / 180) * angleA;
        const h = sideB * Math.sin(angleARad);

        let result = "No Triangle";
        if (sideA < h) {
            result = "No Triangle";
        } else if (sideA === h) {
            result = "Right Triangle";
        } else if (sideA > h && sideA < sideB) {
            result = "Two Possible Triangles";
        } else {
            result = "One Triangle";
        }
        document.getElementById("triangleType").value = result;
    });

    document.getElementById("newtonform").addEventListener("submit", function (event) {
        event.preventDefault();
        let x = parseFloat(document.getElementById("rootguess").value);

        function f(x) {
            return x * x - 4;
        }

        function fPrime(x) {
            return 2 * x;
        }

        for (let i = 0; i < 10; i++) {
            x = x - f(x) / fPrime(x);
        }
        document.getElementById("rootapprox").value = x.toFixed(4);
    });

    document.getElementById("polynomialform").addEventListener("submit", function (event) {
        event.preventDefault();
        const coefficients = document.getElementById("coefficients").value.split(",").map(Number);
        const exponents = document.getElementById("exponents").value.split(",").map(Number);
        const x = document.getElementById("xvalue").value;

        if (coefficients.length !== exponents.length) {
            alert("Mismatch between coefficients and exponents.");
            return;
        }

        const polynomialStr = coefficients.map((coef, index) => `${coef}x^${exponents[index]}`).join(" + ");
        document.getElementById("pf").value = polynomialStr;

        const result = coefficients.reduce((sum, coef, index) => sum + coef * Math.pow(x, exponents[index]), 0);
        document.getElementById("pe").value = result.toFixed(2);
    });
});
