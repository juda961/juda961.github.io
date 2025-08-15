// --- Función L'Hôpital ---
function calcularLHopital() {
    let fx = document.getElementById("fx").value;
    let gx = document.getElementById("gx").value;
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
                Límite según L'Hôpital = <span class="${isFinite(resultado) ? '' : 'infinito'}">${resultado}</span>
            `;
        } else {
            let limite = fVal / gVal;
            resultadoDiv.innerHTML = `No es forma indeterminada. Resultado directo = <span class="${isFinite(limite) ? '' : 'infinito'}">${limite}</span>`;
        }

        resultadoDiv.style.display = 'block';
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.style.display = 'block';
    }
}

// --- Función Derivadas Generales ---
function calcularDerivada() {
    let fx = document.getElementById("f-deriv").value;
    const resultadoDiv = document.getElementById("resultado-derivada");

    try {
        let derivada = math.derivative(fx, "x").toString();
        resultadoDiv.innerHTML = `<b>Derivada:</b> ${derivada}`;
        resultadoDiv.style.display = 'block';
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.style.display = 'block';
    }
}

// --- Autocompletado dinámico ---
const funcionesMathJS = ["sin(", "cos(", "tan(", "log(", "log2(", "log10(", "exp(", "sqrt(", "^"];

document.querySelectorAll(".autocomplete input").forEach(input => {
    input.parentNode.style.position = "relative";

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

    input.addEventListener("keydown", function(e) {
        let list = this.parentNode.querySelector(".autocomplete-list");
        if (!list) return;

        let items = list.getElementsByTagName("div");
        if (!items) return;

        let current = list.querySelector(".autocomplete-active");

        if (e.key === "ArrowDown") {
            if (current) {
                current.classList.remove("autocomplete-active");
                current = current.nextSibling || items[0];
            } else {
                current = items[0];
            }
            current.classList.add("autocomplete-active");
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            if (current) {
                current.classList.remove("autocomplete-active");
                current = current.previousSibling || items[items.length - 1];
            } else {
                current = items[items.length - 1];
            }
            current.classList.add("autocomplete-active");
            e.preventDefault();
        } else if (e.key === "Enter") {
            if (current) {
                e.preventDefault();
                input.value = current.innerText;
                closeAllLists();
            }
        }
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


