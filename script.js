function calcularLHopital() {
    let fx = document.getElementById("fx").value;
    let gx = document.getElementById("gx").value;
    let x0 = parseFloat(document.getElementById("x0").value);

    try {
        let fVal = math.evaluate(fx, {x: x0});
        let gVal = math.evaluate(gx, {x: x0});

        if (fVal === 0 && gVal === 0) {
            let fDer = math.derivative(fx, "x").toString();
            let gDer = math.derivative(gx, "x").toString();
            let fDerVal = math.evaluate(fDer, {x: x0});
            let gDerVal = math.evaluate(gDer, {x: x0});
            let resultado = fDerVal / gDerVal;

            document.getElementById("resultado-lhopital").innerHTML =
                `<b>Forma 0/0 detectada.</b><br>
                 f'(x) = ${fDer} <br>
                 g'(x) = ${gDer} <br>
                 Límite = ${resultado}`;
        } else {
            let limite = fVal / gVal;
            document.getElementById("resultado-lhopital").innerHTML =
                `No es indeterminada. Resultado directo = ${limite}`;
        }
    } catch (error) {
        document.getElementById("resultado-lhopital").innerHTML =
            "Error en la expresión. Revisa la sintaxis.";
    }
}

// Derivadas generales
function calcularDerivada() {
    let f = document.getElementById("f-deriv").value;

    try {
        let deriv = math.derivative(f, "x").toString();
        document.getElementById("resultado-derivada").innerHTML =
            `f'(x) = ${deriv}`;
    } catch (error) {
        document.getElementById("resultado-derivada").innerHTML =
            "Error en la expresión. Revisa la sintaxis.";
    }
}
