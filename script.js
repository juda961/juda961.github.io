document.addEventListener("DOMContentLoaded", () => {

    // --- Función L'Hôpital ---
    function calcularLHopital() {
        const fx = document.getElementById("fx").value;
        const gx = document.getElementById("gx").value;
        const x0 = parseFloat(document.getElementById("x0").value);
        const resultadoDiv = document.getElementById("resultado-lhopital");
        resultadoDiv.classList.remove("infinito");

        try {
            let fVal = math.evaluate(fx, {x: x0});
            let gVal = math.evaluate(gx, {x: x0});

            let resultadoText = "";

            if (fVal === 0 && gVal === 0) {
                let fDer = math.derivative(fx, "x").toString();
                let gDer = math.derivative(gx, "x").toString();
                let fDerVal = math.evaluate(fDer, {x: x0});
                let gDerVal = math.evaluate(gDer, {x: x0});
                let resultado = fDerVal / gDerVal;

                let fraccion = math.fraction(resultado).toString();

                resultadoText = `
                    <b>Forma indeterminada 0/0 detectada.</b><br>
                    f'(x) = ${fDer} <br>
                    g'(x) = ${gDer} <br>
                    Límite según L'Hôpital = ${resultado} (${fraccion})
                `;
            } else if (!isFinite(fVal / gVal)) {
                let signo = fVal / gVal > 0 ? "+∞" : "-∞";
                resultadoDiv.classList.add("infinito");
                resultadoText = `Resultado = ${signo}`;
            } else {
                let limite = fVal / gVal;
                let fraccion = math.fraction(limite).toString();
                resultadoText = `Resultado = ${limite} (${fraccion})`;
            }

            resultadoDiv.innerHTML = resultadoText;
            resultadoDiv.style.display = "block";

        } catch (error) {
            resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
            resultadoDiv.style.display = "block";
        }
    }

    // --- Función Derivadas Generales ---
    function calcularDerivada() {
        const fx = document.getElementById("f-deriv").value;
        const resultadoDiv = document.getElementById("resultado-derivada");
        resultadoDiv.classList.remove("infinito");

        try {
            let derivada = math.derivative(fx, "x").toString();
            let valorDecimal = math.evaluate(derivada, {x:1});
            let fraccion = math.fraction(valorDecimal).toString();

            resultadoDiv.innerHTML = `<b>Derivada:</b> ${derivada} (${fraccion})`;
            resultadoDiv.style.display = "block";
        } catch (error) {
            resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
            resultadoDiv.style.display = "block";
        }
    }

    // --- Autocompletado dinámico ---
    const funcionesMathJS = ["sin(", "cos(", "tan(", "log(", "log2(", "log10(", "exp(", "sqrt(", "^"];
    document.querySelectorAll(".autocomplete input").forEach(input => {
        input.addEventListener("input", function() {
            closeAllLists();
            if (!this.value) return false;
            let val = this.value.toLowerCase();
            let list = document.createElement("div");
            list.setAttribute("class", "autocomplete-list");
            this.parentNode.appendChild(list);

            funcionesMathJS.forEach(func => {
                if (func.toLowerCase().startsWith(val)) {
                    let item = document.createElement("div");
                    item.innerHTML = "<strong>" + func.substr(0, val.length) + "</strong>" + func.substr(val.length);
                    item.addEventListener("click", () => {
                        input.value = func;
                        closeAllLists();
                        input.focus();
                    });
                    list.appendChild(item);
                }
            });
        });
    });

    function closeAllLists(elmnt) {
        document.querySelectorAll(".autocomplete-list").forEach(list => {
            if (elmnt != list && elmnt != list.previousSibling) {
                list.parentNode.removeChild(list);
            }
        });
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });

    // --- Botones ---
    document.getElementById("btn-lhopital").addEventListener("click", calcularLHopital);
    document.getElementById("btn-deriv").addEventListener("click", calcularDerivada);
});



