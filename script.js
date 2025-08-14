// --- L'Hôpital ---
function calcularLHopital() {
    let fx = document.getElementById("fx").value.trim();
    let gx = document.getElementById("gx").value.trim();
    let x0 = parseFloat(document.getElementById("x0").value);
    const resultadoDiv = document.getElementById("resultado-lhopital");

    try {
        let fVal = math.evaluate(fx, {x: x0});
        let gVal = math.evaluate(gx, {x: x0});

        if (fVal === 0 && gVal === 0) {
            let fDer = math.derivative(fx, "x").toString();
            let gDer = math.derivative(gx, "x").toString();

            let fDerVal = math.evaluate(fDer, {x: x0});
            let gDerVal = math.evaluate(gDer, {x: x0});

            let resultado = fDerVal / gDerVal;

            resultadoDiv.innerHTML = `
                <b>Forma indeterminada 0/0 detectada.</b><br>
                f'(x) = ${fDer} <br>
                g'(x) = ${gDer} <br>
                Límite según L'Hôpital = ${resultado}
            `;
        } else {
            let limite = fVal / gVal;
            if (!isFinite(limite)) {
                resultadoDiv.innerHTML = `No es forma indeterminada. Resultado = ∞`;
            } else {
                resultadoDiv.innerHTML = `No es forma indeterminada. Resultado = ${limite}`;
            }
        }

        resultadoDiv.style.display = "block";
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.style.display = "block";
    }
}

// --- Derivadas Generales ---
function calcularDerivada() {
    let fx = document.getElementById("f-deriv").value.trim();
    const resultadoDiv = document.getElementById("resultado-derivada");

    try {
        let derivada = math.derivative(fx, "x").toString();
        resultadoDiv.innerHTML = `<b>Derivada:</b> ${derivada}`;
        resultadoDiv.style.display = "block";
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.style.display = "block";
    }
}

// --- Autocompletado simple ---
const funcionesMathJS = ["sin(", "cos(", "tan(", "log(", "log2(", "log10(", "exp(", "sqrt(", "^"];

document.querySelectorAll(".autocomplete").forEach(input => {
    input.addEventListener("input", function() {
        // No mini IDE invasivo, solo autocomplete básico
    });
});


