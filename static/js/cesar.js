document.addEventListener('DOMContentLoaded', function() {
  const panel = document.querySelector('.cesar-panel');
  if (!panel) return;
  const btnCifrar = panel.querySelector('#btn_cifrar');
  const inputTexto = panel.querySelectorAll('textarea')[0]; // Primer textarea
  const inputDesplazamiento = panel.querySelectorAll('textarea')[1]; // Segundo textarea
  const resultadoBox = panel.querySelectorAll('textarea')[2]; // Tercer textarea

  btnCifrar.addEventListener('click', async function() {
    const texto = inputTexto.value;
    const desplazamiento = inputDesplazamiento.value.trim();
    resultadoBox.value = 'Cifrando...';

    if (!desplazamiento.match(/^-?\d+$/)) {
      resultadoBox.value = 'El desplazamiento debe ser un número entero.';
      return;
    }

    try {
      const response = await fetch('/api/cifrar_cesar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ texto: texto, desplazamiento: parseInt(desplazamiento, 10) })
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

   // Para descifrar
  const btnDescifrar = document.getElementById('btn_descifrar');
  const inputTextoDescifrar = document.getElementById('ta_descifrar');
  const inputDesplazamientoDescifrar = document.getElementById('ta_desplazamiento');
  // El resultado es el siguiente textarea después del botón
  const resultadoBoxDescifrar = btnDescifrar
    ? btnDescifrar.parentElement.querySelectorAll('textarea')[2]
    : null;

  if (btnDescifrar && inputTextoDescifrar && inputDesplazamientoDescifrar && resultadoBoxDescifrar) {
    btnDescifrar.addEventListener('click', async function() {
      const texto = inputTextoDescifrar.value;
      const desplazamiento = inputDesplazamientoDescifrar.value.trim();
      resultadoBoxDescifrar.value = 'Descifrando...';

      if (!desplazamiento.match(/^-?\d+$/)) {
        resultadoBoxDescifrar.value = 'El desplazamiento debe ser un número entero.';
        return;
      }

      try {
        const response = await fetch('/api/descifrar_cesar', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ texto: texto, desplazamiento: parseInt(desplazamiento, 10) })
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