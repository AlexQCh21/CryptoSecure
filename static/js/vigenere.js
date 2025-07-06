document.addEventListener('DOMContentLoaded', function () {
  const panels = document.querySelectorAll('.vigenere-panel');
  if (panels.length < 2) return;

  // Panel Cifrar
  const btnCifrar = document.getElementById('btn_cifrar');
  const inputTextoCifrar = document.getElementById('texto_cifrar');
  const inputClaveCifrar = document.getElementById('clave_cifrar');
  const resultadoCifrar = document.getElementById('resultado_cifrar');

  btnCifrar.addEventListener('click', async function () {
    const texto = inputTextoCifrar.value.trim();
    const clave = inputClaveCifrar.value.trim();

    resultadoCifrar.value = 'Cifrando...';

    if (!clave.match(/^[a-zA-Z]+$/)) {
      resultadoCifrar.value = 'La clave debe contener solo letras.';
      return;
    }

    try {
      const response = await fetch('/api/cifrar_vigenere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto, clave: clave })
      });
      const data = await response.json();
      if (response.ok) {
        resultadoCifrar.value = data.resultado;
      } else {
        resultadoCifrar.value = data.error || 'Error al cifrar';
      }
    } catch (err) {
      resultadoCifrar.value = 'Error de conexión o del servidor';
    }
  });

  // Panel Descifrar
  const btnDescifrar = document.getElementById('btn_descifrar');
  const inputTextoDescifrar = document.getElementById('texto_descifrar');
  const inputClaveDescifrar = document.getElementById('clave_descifrar');
  const resultadoDescifrar = document.getElementById('resultado_descifrar');

  btnDescifrar.addEventListener('click', async function () {
    const texto = inputTextoDescifrar.value.trim();
    const clave = inputClaveDescifrar.value.trim();

    resultadoDescifrar.value = 'Descifrando...';

    if (!clave.match(/^[a-zA-Z]+$/)) {
      resultadoDescifrar.value = 'La clave debe contener solo letras.';
      return;
    }

    try {
      const response = await fetch('/api/descifrar_vigenere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto, clave: clave })
      });
      const data = await response.json();
      if (response.ok) {
        resultadoDescifrar.value = data.resultado;
      } else {
        resultadoDescifrar.value = data.error || 'Error al descifrar';
      }
    } catch (err) {
      resultadoDescifrar.value = 'Error de conexión o del servidor';
    }
  });
});
