// document.addEventListener('DOMContentLoaded', function() {
//   const btnCifrar = document.getElementById('btn-cifrar');
//   btnCifrar.addEventListener('click', async function() {
//     const texto = document.getElementById('textocifrar').value;
//     const clave = document.getElementById('clavecifrar').value;
//     const resultadoBox = document.getElementById('resultadocifrar');

//     // Validación rápida del lado del cliente
//     if (clave.length !== 8) {
//       resultadoBox.value = 'La clave debe tener exactamente 8 caracteres';
//       return;
//     }
//     resultadoBox.value = 'Cifrando...';

//     try {
//       const response = await fetch('/api/cifrar_des', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ texto: texto, clave: clave })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         resultadoBox.value = data.resultado;
//       } else {
//         resultadoBox.value = data.error || 'Error al cifrar';
//       }
//     } catch (err) {
//       resultadoBox.value = 'Error de conexión o del servidor';
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  // Cifrar
  const btnCifrar = document.getElementById('btn-cifrar');
  if (btnCifrar) {
    btnCifrar.addEventListener('click', async function() {
      const texto = document.getElementById('textocifrar').value;
      const clave = document.getElementById('clavecifrar').value;
      const resultadoBox = document.getElementById('resultadocifrar');
      if (clave.length !== 8) {
        resultadoBox.value = 'La clave debe tener exactamente 8 caracteres';
        return;
      }
      resultadoBox.value = 'Cifrando...';
      try {
        const response = await fetch('/api/cifrar_des', {
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

  // Descifrar
  const btnDescifrar = document.getElementById('btn_descifrar')
  // Mejor usa id="btn-descifrar" en tu botón Descifrar para evitar confusiones
  if (btnDescifrar) {
    btnDescifrar.addEventListener('click', async function() {
      const texto = document.getElementById('textodescifrar').value;
      const clave = document.getElementById('clavedescifrar').value;
      const resultadoBox = document.getElementById('resultadodescifrar');
      if (clave.length !== 8) {
        resultadoBox.value = 'La clave debe tener exactamente 8 caracteres';
        return;
      }
      resultadoBox.value = 'Descifrando...';
      try {
        const response = await fetch('/api/descifrar_des', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ texto: texto, clave: clave })
        });
        const data = await response.json();
        if (response.ok) {
          resultadoBox.value = data.resultado;
        } else {
          resultadoBox.value = data.error || 'Error al descifrar';
        }
      } catch (err) {
        resultadoBox.value = 'Error de conexión o del servidor';
      }
    });
  }
});