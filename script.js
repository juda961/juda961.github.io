// --- Autocompletado dinámico avanzado ---
const funcionesBase = ['sin(', 'cos(', 'tan(', 'exp(', 'sqrt(', 'x'];
const logBases = ['log(', 'log2(', 'log10('];
const potencias = ['^2', '^3', '^1/2', '^x'];

function setupAutocomplete(input) {
    let listContainer = document.createElement('div');
    listContainer.classList.add('autocomplete-list');
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(listContainer);

    let currentFocus = -1;

    function generarSugerencias(val) {
        let matches = [];

        // Funciones básicas
        funcionesBase.forEach(f => { if (f.startsWith(val)) matches.push(f); });

        // Logaritmos dinámicos
        if (val.startsWith('log')) logBases.forEach(l => { if (l.startsWith(val)) matches.push(l); });

        // Potencias dinámicas si detecta x^
        if (val.endsWith('^')) potencias.forEach(p => matches.push(val + p));

        return matches;
    }

    input.addEventListener('input', () => {
        let val = input.value;
        listContainer.innerHTML = '';
        currentFocus = -1;
        if (!val) return;

        let matches = generarSugerencias(val);
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

    input.addEventListener('keydown', e => {
        let items = listContainer.querySelectorAll('div');
        if (!items) return;

        if (e.key === 'ArrowDown') {
            currentFocus++;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1) {
                if (items[currentFocus]) {
                    input.value = items[currentFocus].textContent;
                    listContainer.innerHTML = '';
                }
            }
        }
    });

    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(items) {
        items.forEach(item => item.classList.remove('autocomplete-active'));
    }

    input.addEventListener('blur', () => {
        setTimeout(() => listContainer.innerHTML = '', 100);
    });
}

// Aplicar autocompletado a todos los inputs con clase 'autocomplete'
document.querySelectorAll('.autocomplete').forEach(input => setupAutocomplete(input));


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
