// --- Función L'Hôpital ---
function calcularLHopital() {
    const fx = document.getElementById("fx").value;
    const gx = document.getElementById("gx").value;
    const x0 = parseFloat(document.getElementById("x0").value);
    const resultadoDiv = document.getElementById("resultado-lhopital");

    // Limpiar contenido previo
    resultadoDiv.innerHTML = "";
    resultadoDiv.classList.remove("mostrar");

    try {
        const fVal = math.evaluate(fx, {x: x0});
        const gVal = math.evaluate(gx, {x: x0});

        if (fVal === 0 && gVal === 0) {
            const fDer = math.derivative(fx, "x").toString();
            const gDer = math.derivative(gx, "x").toString();

            const fDerVal = math.evaluate(fDer, {x: x0});
            const gDerVal = math.evaluate(gDer, {x: x0});

            const resultado = fDerVal / gDerVal;

            resultadoDiv.innerHTML = `
                <b>Forma indeterminada 0/0 detectada.</b><br>
                f'(x) = ${fDer} <br>
                g'(x) = ${gDer} <br>
                Límite según L'Hôpital = ${resultado}
            `;
        } else {
            const limite = fVal / gVal;
            resultadoDiv.innerHTML = `No es forma indeterminada. Resultado directo = ${limite}`;
        }

        resultadoDiv.classList.add("mostrar");
        MathJax.typesetPromise();
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.classList.add("mostrar");
    }
}

// --- Función Derivadas Generales ---
function calcularDerivada() {
    const fx = document.getElementById("f-deriv").value;
    const resultadoDiv = document.getElementById("resultado-derivada");

    // Limpiar contenido previo
    resultadoDiv.innerHTML = "";
    resultadoDiv.classList.remove("mostrar");

    try {
        const derivada = math.derivative(fx, "x").toString();
        resultadoDiv.innerHTML = `<b>Derivada:</b> ${derivada}`;
        resultadoDiv.classList.add("mostrar");
        MathJax.typesetPromise();
    } catch (error) {
        resultadoDiv.innerHTML = "Error en la expresión. Revisa la sintaxis.";
        resultadoDiv.classList.add("mostrar");
    }
}

// --- Autocompletado dinámico ---
const funcionesMathJS = ["sin(", "cos(", "tan(", "log(", "log2(", "log10(", "exp(", "sqrt(", "^"];

document.querySelectorAll(".autocomplete").forEach(input => {
    input.parentNode.style.position = "relative"; // Para posicionar dropdown

    input.addEventListener("input", function() {
        closeAllLists();
        if (!this.value) return false;

        const val = this.value.toLowerCase();
        const list = document.createElement("div");
        list.setAttribute("class", "autocomplete-list");
        this.parentNode.appendChild(list);

        funcionesMathJS.forEach(func => {
            if (func.toLowerCase().startsWith(val)) {
                const item = document.createElement("div");
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
        const list = this.parentNode.querySelector(".autocomplete-list");
        if (!list) return;

        const items = list.getElementsByTagName("div");
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

// --- Función para cerrar listas de autocompletado ---
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

