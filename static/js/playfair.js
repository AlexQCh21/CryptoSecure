function generarTablaPlayfair(clave){
  const tabla = [];
  const letras = [];
  clave = clave.toUpperCase().replace(/J/g, "I");

  for(let char of clave + "ABCDEFGHIKLMNOPQRSTUVWXYZ"){
    if(char >= "A" && char <= "Z" && !letras.includes(char)){
      letras.push(char);
    }
  }

  for(let i = 0; i < 5; i++){
    tabla.push(letras.slice(i * 5, i * 5 + 5));
  }

  return tabla;
}

function renderizarTabla(tabla){
  const tablaHTML = document.getElementById("tabla_playfair");
  tablaHTML.innerHTML = "";

  for (let fila of tabla){
    const tr = document.createElement("tr")
    for(let letra of fila){
      const td = document.createElement("td")
      td.textContent = letra;
      tr.appendChild(td);
    }
    tablaHTML.appendChild(tr);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // CIFRAR
  const btnCifrar = document.getElementById('btn_cifrar');
  const inputTexto = document.getElementById('ta_cifrar');
  const inputClave = document.getElementById('ta_clave');
  const resultadoBox = document.getElementById('resultado_cifrado');

  if (btnCifrar && inputTexto && inputClave && resultadoBox) {
    btnCifrar.addEventListener('click', async function() {
      const texto = inputTexto.value;
      const clave = inputClave.value;
      const tabla = generarTablaPlayfair(clave);
      renderizarTabla(tabla);

      resultadoBox.value = 'Cifrando...';
      if (!texto.trim() || !clave.trim()) {
        resultadoBox.value = 'Por favor ingresa el texto y la clave.';
        return;
      }
      try {
        const response = await fetch('/api/cifrar_playfair', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ texto: texto, clave: clave })
        });
        const data = await response.json();
        if (response.ok) {
          resultadoBox.value = data.resultado;
        } else {
          resultadoBox.value = data.error || 'Error al cifrar';
        }
      } catch (err) {
        resultadoBox.value = 'Error de conexión o del servidor';
      }
    });
  }

  // DESCIFRAR
  const btnDescifrar = document.getElementById('btn_descifrar');
  const inputTextoDescifrar = document.getElementById('ta_descifrar');
  const inputClaveDescifrar = document.getElementById('ta_clave_des');
  const resultadoBoxDescifrar = document.getElementById('resultado_descifrado');

  if (btnDescifrar && inputTextoDescifrar && inputClaveDescifrar && resultadoBoxDescifrar) {
    btnDescifrar.addEventListener('click', async function() {
      const texto = inputTextoDescifrar.value;
      const clave = inputClaveDescifrar.value;
      resultadoBoxDescifrar.value = 'Descifrando...';
      if (!texto.trim() || !clave.trim()) {
        resultadoBoxDescifrar.value = 'Por favor ingresa el texto y la clave.';
        return;
      }
      try {
        const response = await fetch('/api/descifrar_playfair', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ texto: texto, clave: clave })
        });
        const data = await response.json();
        if (response.ok) {
          resultadoBoxDescifrar.value = data.resultado;
        } else {
          resultadoBoxDescifrar.value = data.error || 'Error al descifrar';
        }
      } catch (err) {
        resultadoBoxDescifrar.value = 'Error de conexión o del servidor';
      }
    });
  }
});