// --- Sugerencias para autocompletado ---
const funciones = ['sin(', 'cos(', 'tan(', 'log(', 'log10(', 'sqrt(', 'exp(', 'x'];

function setupAutocomplete(input, suggestions) {
    let listContainer = document.createElement('div');
    listContainer.classList.add('autocomplete-list');
    input.parentNode.appendChild(listContainer);

    input.addEventListener('input', () => {
        let val = input.value;
        listContainer.innerHTML = '';
        if (!val) return;

        // Filtrar sugerencias que comiencen con lo que escribes
        let matches = suggestions.filter(s => s.startsWith(val));
        matches.forEach(match => {
            let item = document.createElement('div');
            item.textContent = match;
            item.addEventListener('click', () => {
                input.value = match;
                listContainer.innerHTML = '';
            });
            listContainer.appendChild(item);
        });
    });

    // Cerrar lista al perder foco
    input.addEventListener('blur', () => {
        setTimeout(() => listContainer.innerHTML = '', 100);
    });
}

// Aplicar autocompletado a todos los inputs con clase 'autocomplete'
document.querySelectorAll('.autocomplete').forEach(input => setupAutocomplete(input, funciones));


// --- Límite con L'Hôpital ---
function calcularLHopital() {
    let fx = document.getElementById("fx").value;
    let gx = document.getElementById("gx").value;
    let x0 = parseFloat(document.getElementById("x0").value);
    let resDiv = document.getElementById("resultado-lhopital");

    try {
        let fVal = math.evaluate(fx, {x: x0});
        let gVal = math.evaluate(gx, {x: x0});

        if (fVal === 0 && gVal === 0) {
            let fDer = math.derivative(fx, "x").toString();
            let gDer = math.derivative(gx, "x").toString();
            let fDerVal = math.evaluate(fDer, {x: x0});
            let gDerVal = math.evaluate(gDer, {x: x0});
            let resultado = fDerVal / gDerVal;

            resDiv.innerHTML = `\\[
                \\text{Forma 0/0 detectada: } \\\\
                f'(x) = ${fDer}, \\\\
                g'(x) = ${gDer}, \\\\
                \\lim_{x \\to ${x0}} \\frac{f(x)}{g(x)} = ${resultado}
            \\]`;
        } else {
            resDiv.innerHTML = `\\[
                \\text{No es indeterminada. Resultado directo: } ${fVal} / ${gVal} = ${fVal / gVal}
            \\]`;
        }

        MathJax.typesetPromise([resDiv]);
        resDiv.classList.add("mostrar");
    } catch (error) {
        resDiv.innerHTML = "\\[\\text{Error en la expresión. Revisa la sintaxis.}\\]";
        MathJax.typesetPromise([resDiv]);
        resDiv.classList.add("mostrar");
    }
}


// --- Derivadas generales ---
function calcularDerivada() {
    let f = document.getElementById("f-deriv").value;
    let resDiv = document.getElementById("resultado-derivada");

    try {
        let deriv = math.derivative(f, "x").toString();
        resDiv.innerHTML = `\\[
            f(x) = ${f}, \\\\
            f'(x) = ${deriv}
        \\]`;
        MathJax.typesetPromise([resDiv]);
        resDiv.classList.add("mostrar");
    } catch (error) {
        resDiv.innerHTML = "\\[\\text{Error en la expresión. Revisa la sintaxis.}\\]";
        MathJax.typesetPromise([resDiv]);
        resDiv.classList.add("mostrar");
    }
}


