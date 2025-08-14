function calcular() {
    let fx = document.getElementById("fx").value;
    let gx = document.getElementById("gx").value;
    let x0 = parseFloat(document.getElementById("x0").value);

    try {
        // Evaluar los límites iniciales
        let fVal = math.evaluate(fx, {x: x0});
        let gVal = math.evaluate(gx, {x: x0});

        if (fVal === 0 && gVal === 0) {
            // Aplicar L'Hôpital
            let fDer = math.derivative(fx, "x").toString();
            let gDer = math.derivative(gx, "x").toString();

            let fDerVal = math.evaluate(fDer, {x: x0});
            let gDerVal = math.evaluate(gDer, {x: x0});

            let resultado = fDerVal / gDerVal;

            document.getElementById("resultado").innerHTML =
                `<b>Forma indeterminada 0/0 detectada.</b><br>
                 f'(x) = ${fDer} <br>
                 g'(x) = ${gDer} <br>
                 Límite según L'Hôpital = ${resultado}`;
        } else {
            let limite = fVal / gVal;
            document.getElementById("resultado").innerHTML =
                `No es forma indeterminada. Resultado directo = ${limite}`;
        }
    } catch (error) {
        document.getElementById("resultado").innerHTML =
            "Error en la expresión. Revisa la sintaxis.";
    }
}
